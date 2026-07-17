import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardPath } from '../utils/helpers';
import Layout from '../components/Layout';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) navigate(getDashboardPath(user.role), { replace: true });
  }, [user, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.success) {
      navigate(getDashboardPath(result.user.role));
    } else {
      setError(result.error);
    }
  }

  function quickLogin(role) {
    const creds = {
      admin: { email: 'admin@resolvehub.com', password: 'admin123' },
      agent: { email: 'agent@resolvehub.com', password: 'agent123' },
      user: { email: 'user@resolvehub.com', password: 'user123' },
    };
    setEmail(creds[role].email);
    setPassword(creds[role].password);
  }

  return (
    <Layout noFooter>
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome back</h1>
            <p>Sign in to manage your complaints</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full">Sign In</button>
          </form>

          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>

          <div className="demo-logins">
            <p>Demo accounts:</p>
            <div className="demo-btns">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => quickLogin('user')}>User</button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => quickLogin('agent')}>Agent</button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => quickLogin('admin')}>Admin</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
