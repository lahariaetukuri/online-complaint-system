import { useState } from 'react';
import { Inbox, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Layout from '../components/Layout';
import ComplaintCard from '../components/ComplaintCard';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import { getUsers } from '../data/storage';

export default function AgentDashboard() {
  const { user } = useAuth();
  const { complaints } = useComplaints();
  const [filter, setFilter] = useState('all');
  const users = getUsers();

  const assigned = complaints.filter((c) => c.agentId === user.id);
  const filtered = assigned.filter((c) => {
    if (filter === 'active') return !['Resolved', 'Closed'].includes(c.status);
    if (filter === 'resolved') return ['Resolved', 'Closed'].includes(c.status);
    return true;
  });

  const stats = {
    total: assigned.length,
    active: assigned.filter((c) => !['Resolved', 'Closed'].includes(c.status)).length,
    critical: assigned.filter((c) => c.priority === 'Critical' && !['Resolved', 'Closed'].includes(c.status)).length,
    resolved: assigned.filter((c) => ['Resolved', 'Closed'].includes(c.status)).length,
  };

  function getUserName(userId) {
    return users.find((u) => u.id === userId)?.name || 'Unknown';
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="dash-header">
          <div>
            <h1>Agent Dashboard</h1>
            <p>{user.name} — {user.department}. Manage your assigned complaints.</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <Inbox size={22} />
            <div><strong>{stats.total}</strong><span>Assigned</span></div>
          </div>
          <div className="stat-card">
            <Clock size={22} />
            <div><strong>{stats.active}</strong><span>Active</span></div>
          </div>
          <div className="stat-card">
            <AlertTriangle size={22} />
            <div><strong>{stats.critical}</strong><span>Critical</span></div>
          </div>
          <div className="stat-card">
            <CheckCircle size={22} />
            <div><strong>{stats.resolved}</strong><span>Resolved</span></div>
          </div>
        </div>

        <div className="filter-bar">
          {['all', 'active', 'resolved'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="complaint-list">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <Inbox size={40} />
              <h3>No complaints in this view</h3>
            </div>
          ) : (
            filtered
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .map((c) => (
                <ComplaintCard key={c.id} complaint={c} showUser userName={getUserName(c.userId)} />
              ))
          )}
        </div>
      </div>
    </Layout>
  );
}
