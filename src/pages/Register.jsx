import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

export default function Register() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    const result = register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  }

  return (
    <Layout noFooter>
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create your account</h1>
            <p>Register to file and track complaints securely</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone (optional)</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="confirm">Confirm</label>
                <input id="confirm" name="confirm" type="password" value={form.confirm} onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full">Create Account</button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
