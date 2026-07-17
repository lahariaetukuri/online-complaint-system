import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import { getUsers } from '../data/storage';
import { STATUSES } from '../data/seed';
import { formatDateTime, getDashboardPath } from '../utils/helpers';

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { complaints, updateStatus, assignAgent, addMessage } = useComplaints();
  const [message, setMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');

  const complaint = complaints.find((c) => c.id === id);
  const users = getUsers();
  const agents = users.filter((u) => u.role === 'agent');
  const complainant = users.find((u) => u.id === complaint?.userId);
  const agent = users.find((u) => u.id === complaint?.agentId);

  const canAccess = complaint
    ? user.role === 'admin' || complaint.userId === user.id || complaint.agentId === user.id
    : true;

  useEffect(() => {
    if (complaint && !canAccess) navigate(getDashboardPath(user.role), { replace: true });
  }, [complaint, canAccess, navigate, user.role]);

  if (!complaint) {
    return (
      <Layout>
        <div className="page-container narrow">
          <div className="empty-state">
            <h3>Complaint not found</h3>
            <Link to="/dashboard" className="btn btn-primary btn-sm">Back to Dashboard</Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!canAccess) return null;

  const isAgentOrAdmin = user.role === 'agent' || user.role === 'admin';
  const canMessage = complaint.agentId && !['Closed'].includes(complaint.status);

  function handleSendMessage(e) {
    e.preventDefault();
    if (!message.trim()) return;
    addMessage(complaint.id, message.trim(), user.id);
    setMessage('');
  }

  function handleAssign() {
    if (selectedAgent) assignAgent(complaint.id, selectedAgent);
  }

  function getSenderName(userId) {
    const u = users.find((x) => x.id === userId);
    return u ? u.name : 'Unknown';
  }

  return (
    <Layout>
      <div className="page-container">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className="detail-header">
          <div>
            <span className="complaint-id">{complaint.id}</span>
            <h1>{complaint.title}</h1>
            <div className="badge-group" style={{ marginTop: '0.75rem' }}>
              <PriorityBadge priority={complaint.priority} />
              <StatusBadge status={complaint.status} />
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-main">
            <div className="card">
              <h3>Description</h3>
              <p className="detail-desc">{complaint.description}</p>
            </div>

            <div className="card">
              <h3>Messages</h3>
              <div className="message-list">
                {complaint.messages.length === 0 ? (
                  <p className="text-muted">No messages yet.</p>
                ) : (
                  complaint.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`message ${m.userId === user.id ? 'own' : ''}`}
                    >
                      <div className="message-header">
                        <strong>{getSenderName(m.userId)}</strong>
                        <span>{formatDateTime(m.createdAt)}</span>
                      </div>
                      <p>{m.text}</p>
                    </div>
                  ))
                )}
              </div>
              {canMessage && (
                <form onSubmit={handleSendMessage} className="message-form">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="card">
              <h3>Details</h3>
              <dl className="detail-dl">
                <dt>Category</dt><dd>{complaint.category}</dd>
                <dt>Submitted</dt><dd>{formatDateTime(complaint.createdAt)}</dd>
                <dt>Last Updated</dt><dd>{formatDateTime(complaint.updatedAt)}</dd>
                <dt>Complainant</dt><dd>{complainant?.name || '—'}</dd>
                <dt>Assigned Agent</dt><dd>{agent?.name || 'Not assigned'}</dd>
              </dl>
            </div>

            {user.role === 'admin' && !complaint.agentId && (
              <div className="card">
                <h3>Assign Agent</h3>
                <select value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}>
                  <option value="">Select agent...</option>
                  {agents.map((a) => (
                    <option key={a.id} value={a.id}>{a.name} — {a.department}</option>
                  ))}
                </select>
                <button
                  className="btn btn-primary btn-full"
                  style={{ marginTop: '0.75rem' }}
                  onClick={handleAssign}
                  disabled={!selectedAgent}
                >
                  Assign
                </button>
              </div>
            )}

            {isAgentOrAdmin && complaint.agentId && (
              <div className="card">
                <h3>Update Status</h3>
                <select
                  value={complaint.status}
                  onChange={(e) => updateStatus(complaint.id, e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
