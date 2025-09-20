import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { Loader, BellOff } from 'lucide-react';
import NotificationItem from './NotificationItem';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const { notifications, loading, unreadCount, markAllAsRead } = useNotifications();

  return (
    <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border border-slate-200 z-50 flex flex-col max-h-[70vh]">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Notifications</h3>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-sm text-primary hover:underline font-semibold"
          >
            Mark all as read
          </button>
        )}
      </div>
      <div className="flex-grow overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center p-16">
            <Loader className="animate-spin text-primary" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-slate-500 p-8">
            <BellOff className="mx-auto h-12 w-12 text-slate-300 mb-2" />
            <p>You have no notifications.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification}
                onClose={onClose}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
