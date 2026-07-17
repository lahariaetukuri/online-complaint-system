export const CATEGORIES = [
  'Billing & Payments',
  'Technical Support',
  'Service Quality',
  'Product Defect',
  'Delivery Issues',
  'Account & Access',
  'Other',
];

export const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

export const STATUSES = [
  'Submitted',
  'Under Review',
  'Assigned',
  'In Progress',
  'Awaiting Response',
  'Resolved',
  'Closed',
];

export const SEED_USERS = [
  {
    id: 'admin-1',
    name: 'Sarah Mitchell',
    email: 'admin@resolvehub.com',
    password: 'admin123',
    role: 'admin',
    department: 'Administration',
  },
  {
    id: 'agent-1',
    name: 'James Carter',
    email: 'agent@resolvehub.com',
    password: 'agent123',
    role: 'agent',
    department: 'Technical Support',
  },
  {
    id: 'agent-2',
    name: 'Priya Sharma',
    email: 'priya@resolvehub.com',
    password: 'agent123',
    role: 'agent',
    department: 'Customer Service',
  },
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'user@resolvehub.com',
    password: 'user123',
    role: 'user',
    phone: '+1 555-0100',
  },
];

export const SEED_COMPLAINTS = [
  {
    id: 'CMP-2026-001',
    title: 'Double charged on monthly subscription',
    description:
      'I was charged twice for my premium subscription on March 15th. My bank statement shows two identical charges of $29.99. I need a refund for the duplicate charge.',
    category: 'Billing & Payments',
    priority: 'High',
    status: 'In Progress',
    userId: 'user-1',
    agentId: 'agent-1',
    createdAt: '2026-03-10T09:30:00Z',
    updatedAt: '2026-03-12T14:20:00Z',
    messages: [
      {
        id: 'msg-1',
        userId: 'user-1',
        text: 'I noticed the duplicate charge yesterday. Please help resolve this quickly.',
        createdAt: '2026-03-10T09:35:00Z',
      },
      {
        id: 'msg-2',
        userId: 'agent-1',
        text: 'Thank you for reporting this. I have escalated this to our billing team and initiated a refund review.',
        createdAt: '2026-03-11T10:00:00Z',
      },
    ],
  },
  {
    id: 'CMP-2026-002',
    title: 'Unable to access account after password reset',
    description:
      'After resetting my password via email link, I keep getting "invalid credentials" when trying to log in. I have tried multiple browsers.',
    category: 'Account & Access',
    priority: 'Critical',
    status: 'Assigned',
    userId: 'user-1',
    agentId: 'agent-2',
    createdAt: '2026-03-14T16:45:00Z',
    updatedAt: '2026-03-14T17:00:00Z',
    messages: [],
  },
];
