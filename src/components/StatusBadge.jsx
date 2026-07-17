export default function StatusBadge({ status }) {
  const cls = {
    Submitted: 'status-submitted',
    'Under Review': 'status-review',
    Assigned: 'status-assigned',
    'In Progress': 'status-progress',
    'Awaiting Response': 'status-awaiting',
    Resolved: 'status-resolved',
    Closed: 'status-closed',
  }[status] || 'status-submitted';

  return <span className={`badge ${cls}`}>{status}</span>;
}
