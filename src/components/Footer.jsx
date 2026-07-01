import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <Shield size={20} />
            <span>ResolveHub</span>
          </div>
          <p>Streamlined complaint registration and resolution for individuals and organizations.</p>
        </div>
        <div>
          <h4>Platform</h4>
          <Link to="/register">Register</Link>
          <Link to="/track">Track Complaint</Link>
          <Link to="/login">Sign In</Link>
        </div>
        <div>
          <h4>Support</h4>
          <a href="mailto:support@resolvehub.com">support@resolvehub.com</a>
          <a href="tel:+15550100">+1 (555) 010-0100</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} ResolveHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
