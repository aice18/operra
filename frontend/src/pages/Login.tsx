import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Wrench,
  ShoppingBag,
  ArrowLeft,
  Boxes,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import logoImg from '../assets/logo.png';

interface LoginProps {
  onBackToHome?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onBackToHome }) => {
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
      setError(err.response?.data?.message || 'Login failed. Please check server status.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectPresetUser = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword('password123');
  };

  const getRoleMeta = () => {
    if (email === 'admin@erp.com') {
      return {
        role: 'ADMIN',
        title: 'System Administrator',
        color: '#c084fc',
        bg: 'rgba(192, 132, 252, 0.15)',
        border: 'rgba(192, 132, 252, 0.4)',
        permissions: [
          'Create & assign Work Orders',
          'Manage all multi-location inventories',
          'Authorize Stock Transfers & Overrides',
          'Full access across Admin, Ops & Sales'
        ]
      };
    } else if (email === 'ops@erp.com') {
      return {
        role: 'OPERATIONS USER',
        title: 'Operations Manager',
        color: '#38bdf8',
        bg: 'rgba(56, 189, 248, 0.15)',
        border: 'rgba(56, 189, 248, 0.4)',
        permissions: [
          'Manage physical inventory & batch stock',
          'Dispatch & receive Internal Stock Transfers',
          'Execute Work Order material stock checks',
          'Prevents duplicate receipts & invalid leaks'
        ]
      };
    } else {
      return {
        role: 'SALES USER',
        title: 'Sales Executive',
        color: '#34d399',
        bg: 'rgba(52, 211, 153, 0.15)',
        border: 'rgba(52, 211, 153, 0.4)',
        permissions: [
          'Create Customer Sales Orders',
          'Reserve stock from Available inventory',
          'Protected by ACID DB transaction locks',
          'Prevents over-reservation beyond stock'
        ]
      };
    }
  };

  const currentRole = getRoleMeta();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#090417',
      color: '#f8fafc',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      overflowX: 'hidden'
    }}>
      {/* Background Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '-150px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(9, 4, 23, 0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        right: '-150px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(9, 4, 23, 0) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Main Container Container */}
      <div style={{
        width: '100%',
        maxWidth: '1050px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2.5rem',
        alignItems: 'stretch',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Left Column: Role Selector & Explicit Permissions Explorer */}
        <div style={{
          background: 'rgba(23, 14, 45, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          borderRadius: '1.25rem',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}>
          <div>
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#94a3b8',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginBottom: '1.5rem',
                  transition: 'all 0.2s'
                }}
              >
                <ArrowLeft size={16} /> Back to Product Page
              </button>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src={logoImg} alt="Operra Logo" style={{ width: '40px', height: '40px', borderRadius: '0.6rem', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>Operra ERP</h3>
                <span style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: 700, letterSpacing: '0.5px' }}>ROLE-BASED ACCESS CONTROL</span>
              </div>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Select a pre-configured role account to inspect backend authorization boundaries & privileges:
            </p>

            {/* 3 Role Preset Selector Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {/* Admin Role Card */}
              <div
                onClick={() => selectPresetUser('admin@erp.com')}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '0.75rem',
                  background: email === 'admin@erp.com' ? 'rgba(192, 132, 252, 0.15)' : 'rgba(14, 7, 36, 0.6)',
                  border: `1.5px solid ${email === 'admin@erp.com' ? '#c084fc' : 'rgba(139, 92, 246, 0.2)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(192, 132, 252, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>System Admin</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>admin@erp.com</div>
                  </div>
                </div>
                <span className="badge badge-admin">ADMIN</span>
              </div>

              {/* Operations Role Card */}
              <div
                onClick={() => selectPresetUser('ops@erp.com')}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '0.75rem',
                  background: email === 'ops@erp.com' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(14, 7, 36, 0.6)',
                  border: `1.5px solid ${email === 'ops@erp.com' ? '#38bdf8' : 'rgba(139, 92, 246, 0.2)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                    <Wrench size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>Operations Manager</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>ops@erp.com</div>
                  </div>
                </div>
                <span className="badge badge-ops">OPERATIONS</span>
              </div>

              {/* Sales Role Card */}
              <div
                onClick={() => selectPresetUser('sales@erp.com')}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '0.75rem',
                  background: email === 'sales@erp.com' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(14, 7, 36, 0.6)',
                  border: `1.5px solid ${email === 'sales@erp.com' ? '#34d399' : 'rgba(139, 92, 246, 0.2)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>Sales Executive</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>sales@erp.com</div>
                  </div>
                </div>
                <span className="badge badge-sales">SALES</span>
              </div>
            </div>
          </div>

          {/* Active Selected Role Capabilities Panel */}
          <div style={{
            background: currentRole.bg,
            border: `1px solid ${currentRole.border}`,
            borderRadius: '0.85rem',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Sparkles size={16} color={currentRole.color} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: currentRole.color }}>
                {currentRole.role} CAPABILITIES
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {currentRole.permissions.map((perm, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={15} color={currentRole.color} />
                  <span>{perm}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Premium Form Card */}
        <div style={{
          background: 'rgba(23, 14, 45, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          borderRadius: '1.25rem',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(124, 58, 237, 0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)',
              marginBottom: '1rem'
            }}>
              <Boxes size={30} color="#ffffff" />
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>Sign In to Portal</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Enter account credentials to launch session</p>
          </div>

          {error && <div className="alert-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}>Work Email Address</label>
              <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '2.75rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    backgroundColor: 'rgba(14, 7, 36, 0.9)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#ffffff',
                    borderRadius: '0.6rem',
                    fontSize: '0.95rem'
                  }}
                  placeholder="user@erp.com"
                />
                <Mail size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#a855f7' }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}>Account Password</label>
              <div style={{ position: 'relative', marginTop: '0.35rem' }}>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '2.75rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    backgroundColor: 'rgba(14, 7, 36, 0.9)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    color: '#ffffff',
                    borderRadius: '0.6rem',
                    fontSize: '0.95rem'
                  }}
                  placeholder="••••••••"
                />
                <Lock size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#a855f7' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '0.6rem',
                background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #9333ea 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 6px 25px rgba(124, 58, 237, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {submitting ? 'Authenticating...' : `Sign In as ${currentRole.role}`} <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
