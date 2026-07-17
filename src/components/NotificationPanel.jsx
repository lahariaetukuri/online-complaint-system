import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import { timeAgo } from '../utils/helpers';

export default function NotificationPanel({ onClose }) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useComplaints();
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div className="notif-panel" ref={ref}>
      <div className="notif-header">
        <h4>Notifications</h4>
        {notifications.some((n) => !n.read) && (
          <button className="text-btn" onClick={markAllNotificationsRead}>Mark all read</button>
        )}
      </div>
      <div className="notif-list">
        {notifications.length === 0 ? (
          <p className="notif-empty">No notifications yet</p>
        ) : (
          notifications.slice(0, 8).map((n) => (
            <Link
              key={n.id}
              to={n.complaintId ? `/complaints/${n.complaintId}` : '#'}
              className={`notif-item ${n.read ? '' : 'unread'}`}
              onClick={() => {
                markNotificationRead(n.id);
                onClose();
              }}
            >
              <strong>{n.title}</strong>
              <p>{n.message}</p>
              <span>{timeAgo(n.createdAt)}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
