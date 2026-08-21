import React from 'react';
import {
  Boxes,
  ClipboardList,
  ArrowLeftRight,
  ShoppingBag,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  CheckCircle2,
} from 'lucide-react';
import logoImg from '../assets/logo.png';

interface LandingPageProps {
  onGoToLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoToLogin }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header / Navbar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logoImg} alt="Operra Logo" style={{ width: '40px', height: '40px', borderRadius: '0.5rem', objectFit: 'cover' }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.4rem', color: '#ffffff', leadingHeight: '1' }}>Operra</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: '0.8px' }}>MODERN OPERATIONS ERP</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={onGoToLogin} className="btn btn-primary" style={{ padding: '0.6rem 1.4rem', borderRadius: '0.5rem', fontWeight: 600 }}>
            Sign In to ERP <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem 3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '2rem', backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          <Zap size={16} /> Case Study Submission — Production-Ready ERP Platform
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Modern Operations Management.<br />One Unified Platform.
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '750px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Operra connects inventory tracking, work order shortage checks, multi-location stock transfers, and customer order reservations with strict ACID transactional integrity and Role-Based Access Control.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={onGoToLogin} className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem', borderRadius: '0.6rem', fontWeight: 700 }}>
            Launch Live Demo App <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Interactive Workflow Visualizer */}
      <section style={{ maxWidth: '1100px', margin: '2rem auto 5rem', padding: '0 1.5rem' }}>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center', color: '#38bdf8' }}>
            🔄 End-to-End Operational Lifecycle
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.25rem', backgroundColor: '#0f172a', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: '#38bdf8', marginBottom: '0.75rem' }}><Boxes size={28} /></div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>1. Inventory</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>Multi-warehouse batch tracking (`Physical - Reserved = Available`).</p>
            </div>
            <div style={{ padding: '1.25rem', backgroundColor: '#0f172a', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: '#eab308', marginBottom: '0.75rem' }}><ClipboardList size={28} /></div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>2. Work Orders</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>Auto-calculates material shortages against location inventory.</p>
            </div>
            <div style={{ padding: '1.25rem', backgroundColor: '#0f172a', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: '#a855f7', marginBottom: '0.75rem' }}><ArrowLeftRight size={28} /></div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>3. Stock Transfers</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>Idempotent transfer flow (`REQUESTED → DISPATCHED → RECEIVED`).</p>
            </div>
            <div style={{ padding: '1.25rem', backgroundColor: '#0f172a', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: '#22c55e', marginBottom: '0.75rem' }}><ShoppingBag size={28} /></div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>4. Customer Orders</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>Atomically reserves available stock & prevents over-booking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 6rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem' }}>
          Core Architectural Highlights
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div style={{ padding: '2rem', backgroundColor: '#1e293b', borderRadius: '0.85rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <ShieldCheck size={32} style={{ color: '#38bdf8', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Role-Based Access Control</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Strict backend middleware authorization restricting Admin, Operations, and Sales permissions across all API endpoints.
            </p>
          </div>
          <div style={{ padding: '2rem', backgroundColor: '#1e293b', borderRadius: '0.85rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Database size={32} style={{ color: '#22c55e', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>ACID Concurrency Protection</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Prisma transactions over Supabase PostgreSQL prevent double-receipt of transfers and concurrent stock over-reservations.
            </p>
          </div>
          <div style={{ padding: '2rem', backgroundColor: '#1e293b', borderRadius: '0.85rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <CheckCircle2 size={32} style={{ color: '#eab308', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Automated Test Coverage</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Includes Jest & Supertest integration suite verifying all 5 mandatory business rules and edge cases with 100% pass rate.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '2rem 3rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        <p>Operra Operations ERP © 2026. Built with React, TypeScript, Express, Prisma & PostgreSQL.</p>
      </footer>
    </div>
  );
};
