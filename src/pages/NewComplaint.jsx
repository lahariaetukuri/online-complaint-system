import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useComplaints } from '../context/ComplaintContext';
import { CATEGORIES, PRIORITIES } from '../data/seed';

export default function NewComplaint() {
  const { createComplaint } = useComplaints();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    priority: 'Medium',
  });
  const [success, setSuccess] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const complaint = createComplaint(form);
    setSuccess(complaint.id);
    setTimeout(() => navigate(`/complaints/${complaint.id}`), 2000);
  }

  return (
    <Layout>
      <div className="page-container narrow">
        <div className="page-header">
          <h1>File a New Complaint</h1>
          <p>Provide details about your issue. Our team will review and assign an agent promptly.</p>
        </div>

        {success ? (
          <div className="alert alert-success">
            Complaint <strong>{success}</strong> submitted successfully! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="complaint-form card">
            <div className="form-group">
              <label htmlFor="title">Complaint Title</label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Brief summary of your issue"
                required
                minLength={5}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Detailed Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your issue in detail. Include dates, reference numbers, and any relevant context."
                required
                minLength={20}
                rows={6}
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Submit Complaint</button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}
