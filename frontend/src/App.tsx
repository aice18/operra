import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
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
  Server,
  UserCheck,
} from 'lucide-react';

export const App: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'inventory' | 'work-orders' | 'transfers' | 'orders'>(
    'inventory'
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', color: '#94a3b8' }}>
        Loading ERP System...
      </div>
    );
  }

  if (!user) {
    return <Login />;
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
          <Server size={24} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#ffffff' }}>Operra</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 600, letterSpacing: '0.5px' }}>MODERN OPERATIONS</span>
          </div>
        </div>

        <nav className="nav-menu">
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

        {/* Logged User Info */}
        <div className="user-profile">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
        {activeTab === 'inventory' && <Inventory />}
        {activeTab === 'work-orders' && <WorkOrders />}
        {activeTab === 'transfers' && <InternalTransfers />}
        {activeTab === 'orders' && <CustomerOrders />}
      </main>
    </div>
  );
};

export default App;
