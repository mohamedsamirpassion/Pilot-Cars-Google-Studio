import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Truck, LogOut, UserCircle, LayoutDashboard, Bell } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Truck size={32} />
          <span>Pilot Cars & Permits</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/blog" className="text-slate-700 hover:text-primary transition-colors font-medium">
            Blog
          </Link>
          {user ? (
            <>
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setIsNotificationOpen(prev => !prev)}
                  className="relative text-slate-600 hover:text-primary p-2 rounded-full hover:bg-slate-100"
                  aria-label="View notifications"
                >
                  <Bell size={22} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {isNotificationOpen && <NotificationDropdown onClose={() => setIsNotificationOpen(false)} />}
              </div>

              <span className="text-slate-600 hidden sm:block">Welcome, {user.name}!</span>
              <Link to="/dashboard" className="flex items-center gap-2 text-slate-700 hover:text-primary transition-colors font-medium">
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-secondary hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-700 hover:text-primary transition-colors font-medium">
                Login
              </Link>
              <Link to="/register" className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
