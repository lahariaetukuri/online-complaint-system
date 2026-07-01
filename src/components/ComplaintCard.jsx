import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { formatDate } from '../utils/helpers';
import { ChevronRight } from 'lucide-react';

export default function ComplaintCard({ complaint, showUser = false, userName }) {
  return (
    <Link to={`/complaints/${complaint.id}`} className="complaint-card">
      <div className="complaint-card-top">
        <span className="complaint-id">{complaint.id}</span>
        <div className="badge-group">
          <PriorityBadge priority={complaint.priority} />
          <StatusBadge status={complaint.status} />
        </div>
      </div>
      <h3>{complaint.title}</h3>
      <p className="complaint-desc">{complaint.description}</p>
      <div className="complaint-card-meta">
        <span>{complaint.category}</span>
        {showUser && userName && <span>By {userName}</span>}
        <span>{formatDate(complaint.createdAt)}</span>
      </div>
      <ChevronRight size={18} className="card-arrow" />
    </Link>
  );
}
