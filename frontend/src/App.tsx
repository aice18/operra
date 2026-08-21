import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';
import { Inventory } from './pages/Inventory';
import { WorkOrders } from './pages/WorkOrders';
import { InternalTransfers } from './pages/InternalTransfers';
import { CustomerOrders } from './pages/CustomerOrders';
import {
  Package,
  ClipboardList,
  ArrowLeftRight,
  ShoppingBag,
  LogOut,
  UserCheck,
  Globe,
  LayoutDashboard,
  Zap,
} from 'lucide-react';

import logoImg from './assets/logo.png';

export const App: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'work-orders' | 'transfers' | 'orders'>(
    'overview'
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', color: '#94a3b8' }}>
        Loading ERP System...
      </div>
    );
  }

  if (showLanding && !user) {
    return <LandingPage onGoToLogin={() => setShowLanding(false)} />;
  }

  if (!user) {
    return <Login onBackToHome={() => setShowLanding(true)} />;
  }

  const roleBadgeClass =
    user.role === 'ADMIN'
      ? 'badge-admin'
      : user.role === 'OPERATIONS'
      ? 'badge-ops'
      : 'badge-sales';

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src={logoImg} alt="Operra Logo" style={{ width: '36px', height: '36px', borderRadius: '0.4rem', objectFit: 'cover' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#ffffff' }}>Operra</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 600, letterSpacing: '0.5px' }}>MODERN OPERATIONS</span>
          </div>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} /> Overview Flow
          </button>
          <button
            className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={18} /> Inventory
          </button>
          <button
            className={`nav-item ${activeTab === 'work-orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('work-orders')}
          >
            <ClipboardList size={18} /> Work Orders
          </button>
          <button
            className={`nav-item ${activeTab === 'transfers' ? 'active' : ''}`}
            onClick={() => setActiveTab('transfers')}
          >
            <ArrowLeftRight size={18} /> Internal Transfers
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={18} /> Customer Orders
          </button>
        </nav>

        {/* Home & User Info */}
        <div className="user-profile">
          <button
            className="btn btn-secondary"
            onClick={() => setShowLanding(true)}
            style={{ width: '100%', marginBottom: '1rem', justifyContent: 'center', padding: '0.5rem', fontSize: '0.8rem' }}
          >
            <Globe size={14} /> Product Page
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <UserCheck size={18} className="text-muted" />
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className={`badge ${roleBadgeClass}`} style={{ marginTop: '0.2rem' }}>
                {user.role}
              </span>
            </div>
          </div>
          <button className="btn-logout" onClick={logout}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Screen Content */}
      <main className="main-content">
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Operational Hub & Guided Flow</h2>
              <p style={{ color: 'var(--text-muted)' }}>Welcome to Operra. Use these shortcut modules to execute key ERP operations step-by-step.</p>
            </div>

            {/* Step-by-Step Flow Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div className="card" style={{ borderLeft: '4px solid #38bdf8', cursor: 'pointer' }} onClick={() => setActiveTab('inventory')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <Package size={28} style={{ color: '#38bdf8' }} />
                  <span className="badge badge-admin">Step 1</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>1. Inventory Management</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Inspect real-time stock across warehouses (`Physical - Reserved = Available`).
                </p>
                <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Open Inventory <Zap size={14} />
                </span>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #eab308', cursor: 'pointer' }} onClick={() => setActiveTab('work-orders')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <ClipboardList size={28} style={{ color: '#eab308' }} />
                  <span className="badge badge-ops">Step 2</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>2. Work Orders & Stock Check</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Create production work orders and automatically compute material shortages.
                </p>
                <span style={{ color: '#eab308', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Open Work Orders <Zap size={14} />
                </span>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #a855f7', cursor: 'pointer' }} onClick={() => setActiveTab('transfers')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <ArrowLeftRight size={28} style={{ color: '#a855f7' }} />
                  <span className="badge badge-ops">Step 3</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>3. Internal Stock Transfers</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Fulfill shortages by dispatching and receiving stock between locations.
                </p>
                <span style={{ color: '#a855f7', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Open Transfers <Zap size={14} />
                </span>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #22c55e', cursor: 'pointer' }} onClick={() => setActiveTab('orders')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <ShoppingBag size={28} style={{ color: '#22c55e' }} />
                  <span className="badge badge-sales">Step 4</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>4. Customer Reservations</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Create sales orders and safely reserve available inventory.
                </p>
                <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Open Customer Orders <Zap size={14} />
                </span>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'inventory' && <Inventory />}
        {activeTab === 'work-orders' && <WorkOrders />}
        {activeTab === 'transfers' && <InternalTransfers />}
        {activeTab === 'orders' && <CustomerOrders />}
      </main>
    </div>
  );
};

export default App;
