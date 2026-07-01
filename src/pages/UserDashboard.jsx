import { Link } from 'react-router-dom';
import { Plus, FileText, CheckCircle, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import ComplaintCard from '../components/ComplaintCard';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';

export default function UserDashboard() {
  const { user } = useAuth();
  const { complaints } = useComplaints();
  const myComplaints = complaints.filter((c) => c.userId === user.id);

  const stats = {
    total: myComplaints.length,
    active: myComplaints.filter((c) => !['Resolved', 'Closed'].includes(c.status)).length,
    resolved: myComplaints.filter((c) => ['Resolved', 'Closed'].includes(c.status)).length,
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="dash-header">
          <div>
            <h1>My Complaints</h1>
            <p>Welcome back, {user.name}. Track and manage your submitted complaints.</p>
          </div>
          <Link to="/complaints/new" className="btn btn-primary">
            <Plus size={18} /> File New Complaint
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <FileText size={22} />
            <div><strong>{stats.total}</strong><span>Total Complaints</span></div>
          </div>
          <div className="stat-card">
            <Clock size={22} />
            <div><strong>{stats.active}</strong><span>Active</span></div>
          </div>
          <div className="stat-card">
            <CheckCircle size={22} />
            <div><strong>{stats.resolved}</strong><span>Resolved</span></div>
          </div>
        </div>

        <div className="section-block">
          <h2>Recent Complaints</h2>
          {myComplaints.length === 0 ? (
            <div className="empty-state">
              <FileText size={40} />
              <h3>No complaints yet</h3>
              <p>File your first complaint to get started.</p>
              <Link to="/complaints/new" className="btn btn-primary btn-sm">File Complaint</Link>
            </div>
          ) : (
            <div className="complaint-list">
              {myComplaints
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .map((c) => (
                  <ComplaintCard key={c.id} complaint={c} />
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
