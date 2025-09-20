import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../types';
import { useNotifications } from '../context/NotificationContext';

interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
}

const timeSince = (dateString: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    if (seconds < 5) return "just now";
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
};


const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose }) => {
  const { markAsRead } = useNotifications();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
    onClose();
  };

  return (
    <button 
      onClick={handleClick}
      className={`w-full text-left p-3 transition-colors ${
        notification.isRead 
          ? 'bg-white hover:bg-slate-50' 
          : 'bg-primary-50 hover:bg-primary-100'
      }`}
    >
      <div className="flex items-start gap-3">
        {!notification.isRead && (
          <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" aria-label="Unread"></div>
        )}
        <div className={`flex-grow ${notification.isRead ? 'pl-5' : ''}`}>
          <p className="text-sm text-slate-700">{notification.message}</p>
          <p className="text-xs text-slate-400 mt-1">{timeSince(notification.timestamp)}</p>
        </div>
      </div>
    </button>
  );
};

export default NotificationItem;
