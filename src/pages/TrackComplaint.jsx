import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Layout from '../components/Layout';
import { getComplaints } from '../data/storage';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { formatDateTime } from '../utils/helpers';

export default function TrackComplaint() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    setError('');
    setResult(null);
    const id = query.trim().toUpperCase();
    if (!id) return;
    const complaint = getComplaints().find((c) => c.id === id);
    if (!complaint) {
      setError('No complaint found with that ID. Please check and try again.');
      return;
    }
    setResult(complaint);
  }

  return (
    <Layout>
      <div className="page-container narrow">
        <div className="page-header">
          <h1>Track Your Complaint</h1>
          <p>Enter your complaint ID to view current status and progress.</p>
        </div>

        <form onSubmit={handleSearch} className="track-form">
          <div className="track-input-wrap">
            <Search size={20} />
            <input
              type="text"
              placeholder="e.g. CMP-2026-001"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Track</button>
        </form>

        {error && <div className="alert alert-error">{error}</div>}

        {result && (
          <div className="track-result">
            <div className="track-result-header">
              <div>
                <span className="complaint-id">{result.id}</span>
                <h2>{result.title}</h2>
              </div>
              <div className="badge-group">
                <PriorityBadge priority={result.priority} />
                <StatusBadge status={result.status} />
              </div>
            </div>
            <p>{result.description}</p>
            <div className="track-meta">
              <div><label>Category</label><span>{result.category}</span></div>
              <div><label>Submitted</label><span>{formatDateTime(result.createdAt)}</span></div>
              <div><label>Last Updated</label><span>{formatDateTime(result.updatedAt)}</span></div>
            </div>
            <div className="status-timeline">
              {['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved'].map((step, i) => {
                const statusOrder = ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Awaiting Response', 'Resolved', 'Closed'];
                const currentIdx = statusOrder.indexOf(result.status);
                const stepIdx = statusOrder.indexOf(step === 'Resolved' && result.status === 'Closed' ? 'Resolved' : step);
                const done = currentIdx >= stepIdx;
                return (
                  <div key={step} className={`timeline-step ${done ? 'done' : ''}`}>
                    <div className="timeline-dot" />
                    <span>{step}</span>
                  </div>
                );
              })}
            </div>
            <Link to={`/complaints/${result.id}`} className="btn btn-outline btn-sm">
              View Full Details
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
