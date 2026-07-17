import { useState } from 'react';
import { FileText, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import ComplaintCard from '../components/ComplaintCard';
import { useComplaints } from '../context/ComplaintContext';
import { getUsers } from '../data/storage';

export default function AdminDashboard() {
  const { complaints } = useComplaints();
  const [filter, setFilter] = useState('all');
  const users = getUsers();
  const agents = users.filter((u) => u.role === 'agent');

  const stats = {
    total: complaints.length,
    unassigned: complaints.filter((c) => !c.agentId).length,
    active: complaints.filter((c) => !['Resolved', 'Closed'].includes(c.status)).length,
    resolved: complaints.filter((c) => ['Resolved', 'Closed'].includes(c.status)).length,
    agents: agents.length,
  };

  const filtered = complaints.filter((c) => {
    if (filter === 'unassigned') return !c.agentId;
    if (filter === 'active') return !['Resolved', 'Closed'].includes(c.status);
    if (filter === 'resolved') return ['Resolved', 'Closed'].includes(c.status);
    return true;
  });

  function getUserName(userId) {
    return users.find((u) => u.id === userId)?.name || 'Unknown';
  }

  const categoryCounts = complaints.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <Layout>
      <div className="page-container">
        <div className="dash-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Overview of all complaints, assignments, and system activity.</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <FileText size={22} />
            <div><strong>{stats.total}</strong><span>Total Complaints</span></div>
          </div>
          <div className="stat-card">
            <AlertCircle size={22} />
            <div><strong>{stats.unassigned}</strong><span>Unassigned</span></div>
          </div>
          <div className="stat-card">
            <Clock size={22} />
            <div><strong>{stats.active}</strong><span>Active</span></div>
          </div>
          <div className="stat-card">
            <CheckCircle size={22} />
            <div><strong>{stats.resolved}</strong><span>Resolved</span></div>
          </div>
          <div className="stat-card">
            <Users size={22} />
            <div><strong>{stats.agents}</strong><span>Agents</span></div>
          </div>
        </div>

        <div className="admin-grid">
          <div className="card">
            <h3>Complaints by Category</h3>
            <div className="category-bars">
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <div key={cat} className="category-bar">
                  <div className="category-bar-label">
                    <span>{cat}</span>
                    <span>{count}</span>
                  </div>
                  <div className="category-bar-track">
                    <div
                      className="category-bar-fill"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Support Agents</h3>
            <ul className="agent-list">
              {agents.map((a) => {
                const count = complaints.filter((c) => c.agentId === a.id && !['Resolved', 'Closed'].includes(c.status)).length;
                return (
                  <li key={a.id}>
                    <div>
                      <strong>{a.name}</strong>
                      <span>{a.department}</span>
                    </div>
                    <span className="agent-count">{count} active</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="filter-bar">
          {['all', 'unassigned', 'active', 'resolved'].map((f) => (
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
          {filtered
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((c) => (
              <ComplaintCard key={c.id} complaint={c} showUser userName={getUserName(c.userId)} />
            ))}
        </div>
      </div>
    </Layout>
  );
}
