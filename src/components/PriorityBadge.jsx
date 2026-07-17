export default function PriorityBadge({ priority }) {
  const cls = {
    Low: 'priority-low',
    Medium: 'priority-medium',
    High: 'priority-high',
    Critical: 'priority-critical',
  }[priority] || 'priority-medium';

  return <span className={`badge ${cls}`}>{priority}</span>;
}
