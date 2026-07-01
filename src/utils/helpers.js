export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function getStatusColor(status) {
  const map = {
    Submitted: 'status-submitted',
    'Under Review': 'status-review',
    Assigned: 'status-assigned',
    'In Progress': 'status-progress',
    'Awaiting Response': 'status-awaiting',
    Resolved: 'status-resolved',
    Closed: 'status-closed',
  };
  return map[status] || 'status-submitted';
}

export function getPriorityColor(priority) {
  const map = {
    Low: 'priority-low',
    Medium: 'priority-medium',
    High: 'priority-high',
    Critical: 'priority-critical',
  };
  return map[priority] || 'priority-medium';
}

export function getDashboardPath(role) {
  if (role === 'admin') return '/admin';
  if (role === 'agent') return '/agent';
  return '/dashboard';
}
