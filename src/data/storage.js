import { SEED_USERS, SEED_COMPLAINTS } from './seed';

const KEYS = {
  users: 'resolvehub_users',
  complaints: 'resolvehub_complaints',
  notifications: 'resolvehub_notifications',
  initialized: 'resolvehub_initialized',
};

function read(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function initializeStorage() {
  if (localStorage.getItem(KEYS.initialized)) return;
  write(KEYS.users, SEED_USERS);
  write(KEYS.complaints, SEED_COMPLAINTS);
  write(KEYS.notifications, []);
  localStorage.setItem(KEYS.initialized, 'true');
}

export function getUsers() {
  return read(KEYS.users, []);
}

export function saveUsers(users) {
  write(KEYS.users, users);
}

export function getComplaints() {
  return read(KEYS.complaints, []);
}

export function saveComplaints(complaints) {
  write(KEYS.complaints, complaints);
}

export function getNotifications() {
  return read(KEYS.notifications, []);
}

export function saveNotifications(notifications) {
  write(KEYS.notifications, notifications);
}

export function generateComplaintId() {
  const year = new Date().getFullYear();
  const complaints = getComplaints();
  const num = String(complaints.length + 1).padStart(3, '0');
  return `CMP-${year}-${num}`;
}

export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
