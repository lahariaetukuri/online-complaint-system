import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initializeStorage, getUsers, saveUsers } from '../data/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    const stored = localStorage.getItem('resolvehub_session');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('resolvehub_session');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((email, password) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { success: false, error: 'Invalid email or password' };
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('resolvehub_session', JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  }, []);

  const register = useCallback((data) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists' };
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'user',
      phone: data.phone || '',
    };
    saveUsers([...users, newUser]);
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('resolvehub_session', JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('resolvehub_session');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
