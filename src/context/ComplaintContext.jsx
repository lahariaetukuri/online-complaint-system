import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getComplaints,
  saveComplaints,
  getNotifications,
  saveNotifications,
  generateComplaintId,
  generateId,
  getUsers,
} from '../data/storage';
import { useAuth } from './AuthContext';

const ComplaintContext = createContext(null);

export function ComplaintProvider({ children }) {
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  const refresh = useCallback(() => {
    setComplaints(getComplaints());
    setNotifications(getNotifications());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addNotification = useCallback((notif) => {
    const all = getNotifications();
    const updated = [{ ...notif, id: generateId('notif'), read: false, createdAt: new Date().toISOString() }, ...all];
    saveNotifications(updated);
    setNotifications(updated);
  }, []);

  const markNotificationRead = useCallback((id) => {
    const updated = getNotifications().map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
    setNotifications(updated);
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    const updated = getNotifications().map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
    setNotifications(updated);
  }, []);

  const createComplaint = useCallback(
    (data) => {
      const complaint = {
        id: generateComplaintId(),
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        status: 'Submitted',
        userId: user.id,
        agentId: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
      };
      const all = [...getComplaints(), complaint];
      saveComplaints(all);
      setComplaints(all);

      const agents = getUsers().filter((u) => u.role === 'agent');
      agents.forEach((agent) => {
        addNotification({
          userId: agent.id,
          title: 'New complaint submitted',
          message: `"${complaint.title}" requires review and assignment.`,
          complaintId: complaint.id,
        });
      });

      return complaint;
    },
    [user, addNotification]
  );

  const updateComplaint = useCallback(
    (id, updates) => {
      const all = getComplaints().map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      );
      saveComplaints(all);
      setComplaints(all);
      return all.find((c) => c.id === id);
    },
    []
  );

  const assignAgent = useCallback(
    (complaintId, agentId) => {
      const complaint = updateComplaint(complaintId, {
        agentId,
        status: 'Assigned',
      });
      if (complaint) {
        addNotification({
          userId: agentId,
          title: 'Complaint assigned to you',
          message: `You have been assigned: "${complaint.title}"`,
          complaintId,
        });
        addNotification({
          userId: complaint.userId,
          title: 'Agent assigned',
          message: `An agent has been assigned to your complaint "${complaint.title}".`,
          complaintId,
        });
      }
    },
    [updateComplaint, addNotification]
  );

  const updateStatus = useCallback(
    (complaintId, status) => {
      const complaint = updateComplaint(complaintId, { status });
      if (complaint) {
        addNotification({
          userId: complaint.userId,
          title: 'Status updated',
          message: `Your complaint "${complaint.title}" is now: ${status}`,
          complaintId,
        });
      }
    },
    [updateComplaint, addNotification]
  );

  const addMessage = useCallback(
    (complaintId, text, senderId) => {
      const all = getComplaints();
      const idx = all.findIndex((c) => c.id === complaintId);
      if (idx === -1) return;
      const msg = {
        id: generateId('msg'),
        userId: senderId,
        text,
        createdAt: new Date().toISOString(),
      };
      const complaint = {
        ...all[idx],
        messages: [...all[idx].messages, msg],
        updatedAt: new Date().toISOString(),
      };
      all[idx] = complaint;
      saveComplaints(all);
      setComplaints(all);

      const recipient =
        senderId === complaint.userId ? complaint.agentId : complaint.userId;
      if (recipient) {
        addNotification({
          userId: recipient,
          title: 'New message',
          message: `New reply on "${complaint.title}"`,
          complaintId,
        });
      }
    },
    [addNotification]
  );

  const getUserNotifications = useCallback(() => {
    if (!user) return [];
    return notifications.filter((n) => n.userId === user.id);
  }, [notifications, user]);

  const unreadCount = getUserNotifications().filter((n) => !n.read).length;

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        notifications: getUserNotifications(),
        unreadCount,
        refresh,
        createComplaint,
        updateComplaint,
        assignAgent,
        updateStatus,
        addMessage,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaints() {
  const ctx = useContext(ComplaintContext);
  if (!ctx) throw new Error('useComplaints must be used within ComplaintProvider');
  return ctx;
}
