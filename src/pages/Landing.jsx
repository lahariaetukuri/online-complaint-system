import { Link } from 'react-router-dom';
import {
  Shield,
  Bell,
  Route,
  Lock,
  Clock,
  MessageSquare,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Layout from '../components/Layout';

const features = [
  {
    icon: Shield,
    title: 'Secure Registration',
    desc: 'Submit complaints with encrypted data handling and role-based access controls.',
  },
  {
    icon: Clock,
    title: 'Real-Time Tracking',
    desc: 'Monitor complaint status from submission through resolution with live updates.',
  },
  {
    icon: Route,
    title: 'Smart Routing',
    desc: 'Complaints are intelligently routed to the right department and assigned agent.',
  },
  {
    icon: Bell,
    title: 'Auto Notifications',
    desc: 'Get instant alerts on status changes, assignments, and agent responses.',
  },
  {
    icon: MessageSquare,
    title: 'Agent Interaction',
    desc: 'Communicate directly with assigned agents through built-in messaging.',
  },
  {
    icon: BarChart3,
    title: 'Admin Analytics',
    desc: 'Comprehensive dashboards for oversight, assignment, and performance tracking.',
  },
];

const steps = [
  { num: '01', title: 'Register & Sign In', desc: 'Create your account or sign in to access the complaint portal.' },
  { num: '02', title: 'File Your Complaint', desc: 'Describe your issue, select a category, and set priority level.' },
  { num: '03', title: 'Get Assigned', desc: 'Our system routes your complaint to the appropriate support agent.' },
  { num: '04', title: 'Track & Resolve', desc: 'Follow progress in real time and interact until your issue is resolved.' },
];

export default function Landing() {
  return (
    <Layout transparentNav>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-tag">Complaint Management Platform</span>
            <h1>
              Resolve issues <em>faster</em> with centralized complaint management
            </h1>
            <p>
              A secure, user-friendly platform to register complaints, track progress in real time,
              and collaborate with support agents — all in one place.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                File a Complaint <ArrowRight size={18} />
              </Link>
              <Link to="/track" className="btn btn-outline btn-lg">Track Existing</Link>
            </div>
            <div className="hero-stats">
              <div><strong>2,400+</strong><span>Complaints Resolved</span></div>
              <div><strong>98%</strong><span>Satisfaction Rate</span></div>
              <div><strong>4.2h</strong><span>Avg. Response Time</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-header">
                <Lock size={16} />
                <span>Live Dashboard Preview</span>
              </div>
              <div className="hero-card-item active">
                <CheckCircle2 size={16} />
                <div>
                  <strong>CMP-2026-001</strong>
                  <span>Billing issue — In Progress</span>
                </div>
              </div>
              <div className="hero-card-item">
                <Clock size={16} />
                <div>
                  <strong>CMP-2026-002</strong>
                  <span>Account access — Assigned</span>
                </div>
              </div>
              <div className="hero-card-item">
                <Bell size={16} />
                <div>
                  <strong>New notification</strong>
                  <span>Agent replied to your complaint</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2>Everything you need for effective complaint handling</h2>
            <p>Built for users, agents, and administrators with security and efficiency at the core.</p>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon"><f.icon size={22} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How It Works</span>
            <h2>From complaint to resolution in four steps</h2>
          </div>
          <div className="steps-grid">
            {steps.map((s) => (
              <div key={s.num} className="step-card">
                <span className="step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-box">
          <h2>Ready to get your issue resolved?</h2>
          <p>Join thousands of users who trust ResolveHub for fast, transparent complaint management.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-white btn-lg">Create Free Account</Link>
            <Link to="/login" className="btn btn-outline-white btn-lg">Sign In</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
