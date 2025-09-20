
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Truck, LogOut, UserCircle, LayoutDashboard } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Truck size={32} />
          <span>Pilot Cars & Permits</span>
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
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
