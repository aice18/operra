import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@erp.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Check server status.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectPresetUser = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword('password123');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: '1.25rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            <img src={logoImg} alt="Operra Logo" style={{ width: '64px', height: '64px', borderRadius: '0.85rem', objectFit: 'cover' }} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Operra</h2>
          <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Modern Operations, One Platform</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sign in to access inventory & order management</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.5rem' }}
                placeholder="user@erp.com"
              />
              <Mail size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.5rem' }}
                placeholder="••••••••"
              />
              <Lock size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }} disabled={submitting}>
            {submitting ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textAlign: 'center', fontWeight: 600 }}>
            QUICK LOGIN DEMO ACCOUNTS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => selectPresetUser('admin@erp.com')}
              className="badge badge-admin"
              style={{ cursor: 'pointer', textAlign: 'center', padding: '0.5rem' }}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => selectPresetUser('ops@erp.com')}
              className="badge badge-ops"
              style={{ cursor: 'pointer', textAlign: 'center', padding: '0.5rem' }}
            >
              Operations
            </button>
            <button
              type="button"
              onClick={() => selectPresetUser('sales@erp.com')}
              className="badge badge-sales"
              style={{ cursor: 'pointer', textAlign: 'center', padding: '0.5rem' }}
            >
              Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
