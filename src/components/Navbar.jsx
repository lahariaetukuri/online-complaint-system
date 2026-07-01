import { Link } from 'react-router-dom';
import { Bell, LogOut, Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import { getDashboardPath } from '../utils/helpers';
import NotificationPanel from './NotificationPanel';

export default function Navbar({ transparent = false }) {
  const { user, logout } = useAuth();
  const { unreadCount } = useComplaints();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className={`navbar ${transparent ? 'navbar-transparent' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <Shield size={22} />
          <span>ResolveHub</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {!user ? (
            <>
              <a href="/#features" onClick={() => setMenuOpen(false)}>Features</a>
              <a href="/#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
              <Link to="/track" onClick={() => setMenuOpen(false)}>Track Complaint</Link>
              <Link to="/login" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </>
          ) : (
            <>
              <Link to={getDashboardPath(user.role)} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              {user.role === 'user' && (
                <Link to="/complaints/new" onClick={() => setMenuOpen(false)}>File Complaint</Link>
              )}
              <Link to="/track" onClick={() => setMenuOpen(false)}>Track</Link>
              <div className="nav-actions">
                <button
                  className="icon-btn"
                  onClick={() => setNotifOpen(!notifOpen)}
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && <span className="notif-dot">{unreadCount}</span>}
                </button>
                {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
                <span className="user-chip">{user.name}</span>
                <button className="icon-btn" onClick={logout} aria-label="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            </>
          )}
        </nav>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
