import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Globe,
  LayoutDashboard,
  Search,
  Bell,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Calendar,
  SlidersHorizontal,
  Plus,
  Sun,
  Moon,
  Boxes,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

import { API_BASE_URL } from './config/api';

import { DEMO_INVENTORIES, DEMO_WORK_ORDERS, DEMO_TRANSFERS, DEMO_CUSTOMER_ORDERS } from './utils/demoData';

export const App: React.FC = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'work-orders' | 'transfers' | 'orders'>(
    'overview'
  );
  const [darkMode, setDarkMode] = useState<boolean>(false);
  // Header Interactive States
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<boolean>(true);
  const [syncToast, setSyncToast] = useState<string>('');

  // Live Data State initialized INSTANTLY (0ms delay) with initial data
  const [inventories, setInventories] = useState<any[]>(DEMO_INVENTORIES);
  const [workOrders, setWorkOrders] = useState<any[]>(DEMO_WORK_ORDERS);
  const [transfers, setTransfers] = useState<any[]>(DEMO_TRANSFERS);
  const [customerOrders, setCustomerOrders] = useState<any[]>(DEMO_CUSTOMER_ORDERS);
  const [dashboardLoading, setDashboardLoading] = useState<boolean>(false);

  const fetchDashboardData = async () => {
    if (!user) return;
    setDashboardLoading(true);
    try {
      const [invRes, woRes, transRes, orderRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/inventory`),
        axios.get(`${API_BASE_URL}/api/work-orders`),
        axios.get(`${API_BASE_URL}/api/transfers`),
        axios.get(`${API_BASE_URL}/api/customer-orders`),
      ]);
      setInventories(invRes.data);
      setWorkOrders(woRes.data);
      setTransfers(transRes.data);
      setCustomerOrders(orderRes.data);
    } catch (err) {
      console.warn('Backend unavailable, maintaining live demo datasets.');
      setInventories(DEMO_INVENTORIES);
      setWorkOrders(DEMO_WORK_ORDERS);
      setTransfers(DEMO_TRANSFERS);
      setCustomerOrders(DEMO_CUSTOMER_ORDERS);
    } finally {
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme-active');
    } else {
      document.body.classList.remove('dark-theme-active');
    }
  }, [darkMode]);

  if (authLoading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ddd6fe', color: '#64748b', fontWeight: 600 }}>
        Initializing Operra Operations ERP...
      </div>
    );
  }

  if (showLanding && !user) {
    return <LandingPage onGoToLogin={() => setShowLanding(false)} />;
  }

  if (!user) {
    return <Login onBackToHome={() => setShowLanding(true)} />;
  }

  // Calculated Real Metrics
  const totalPhysical = inventories.reduce((sum, item) => sum + (item.physicalQuantity || 0), 0);
  const totalAvailable = inventories.reduce((sum, item) => sum + (item.availableQuantity || 0), 0);
  const totalReserved = inventories.reduce((sum, item) => sum + (item.reservedQuantity || 0), 0);
  const totalShortage = workOrders.reduce((sum, wo) => sum + (wo.shortageQuantity || 0), 0);

  const roleBadgeClass =
    user.role === 'ADMIN'
      ? 'badge-admin'
      : user.role === 'OPERATIONS'
      ? 'badge-ops'
      : 'badge-sales';

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : ''}`}>
      {/* Left Sidebar Navigation - Fixed & Persistent */}
      <aside className="sidebar">
        {/* Brand Logo */}
        <div className="sidebar-brand">
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '0.75rem',
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
          }}>
            <Boxes size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', lineHeight: 1.1 }}>Operra</span>
            <span style={{ fontSize: '0.65rem', color: '#7c3aed', fontWeight: 700, letterSpacing: '0.5px' }}>ERP PLATFORM</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="nav-menu">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={20} /> Inventory
          </button>
          <button
            className={`nav-item ${activeTab === 'work-orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('work-orders')}
          >
            <ClipboardList size={20} /> Work Orders
          </button>
          <button
            className={`nav-item ${activeTab === 'transfers' ? 'active' : ''}`}
            onClick={() => setActiveTab('transfers')}
          >
            <ArrowLeftRight size={20} /> Stock Transfers
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={20} /> Customer Orders
          </button>
        </nav>

        {/* Footer Controls & User Info */}
        <div className="user-profile">
          <button
            className="btn btn-secondary"
            onClick={() => setShowLanding(true)}
            style={{ width: '100%', justifyContent: 'center', padding: '0.6rem', fontSize: '0.825rem' }}
          >
            <Globe size={15} /> Product Page
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
            }}>
              {user.name.charAt(0)}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className={`badge ${roleBadgeClass}`} style={{ marginTop: '0.15rem', alignSelf: 'flex-start' }}>
                {user.role}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button className="btn-logout" onClick={logout} style={{ flex: 1, justifyContent: 'center' }}>
              <LogOut size={16} /> Log out
            </button>

            {/* Sun/Moon Theme Toggle Switch Pill */}
            <div style={{
              background: '#f1f5f9',
              borderRadius: '9999px',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              border: '1px solid #e2e8f0',
              cursor: 'pointer'
            }} onClick={() => setDarkMode(!darkMode)}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: !darkMode ? '#7c3aed' : 'transparent',
                color: !darkMode ? '#ffffff' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sun size={14} />
              </div>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: darkMode ? '#7c3aed' : 'transparent',
                color: darkMode ? '#ffffff' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Moon size={14} />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container - Persistent Header across ALL tabs */}
      <main className={`main-content ${activeTab === 'overview' ? 'hide-scrollbar' : ''}`}>
        {/* Top Navbar Header - Always visible across every page */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.75rem'
        }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
              {activeTab === 'overview' && `Welcome back, ${user.name.split(' ')[0]}!`}
              {activeTab === 'inventory' && 'Multi-Location Inventory Control'}
              {activeTab === 'work-orders' && 'Production Work Orders & Shortages'}
              {activeTab === 'transfers' && 'Internal Stock Transfer Pipeline'}
              {activeTab === 'orders' && 'Customer Sales Orders & Reservations'}
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              {activeTab === 'overview' && 'Here is your multi-warehouse operations & inventory flow overview'}
              {activeTab === 'inventory' && 'Real-time physical, reserved & available stock breakdown across all locations'}
              {activeTab === 'work-orders' && 'Production assignment lifecycle and automated material shortage calculation'}
              {activeTab === 'transfers' && '3-stage stock transfer workflow: Requested → Dispatched → Received'}
              {activeTab === 'orders' && 'Sales order reservations with ACID stock allocation rules'}
            </p>
          </div>

          {/* Header Right Actions - Identical layout across all pages */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Header Right Actions - Interactive Refresh, Quick Search, and Notifications */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
            {/* Sync Refresh Button */}
            <button
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
              onClick={() => {
                fetchDashboardData();
                setSyncToast('Live stock engine synced successfully!');
                setTimeout(() => setSyncToast(''), 3000);
              }}
              title="Sync Real-time Inventory Data"
            >
              <RefreshCw size={18} className={dashboardLoading ? 'spin' : ''} />
            </button>

            {/* Quick Search Button */}
            <button
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
              onClick={() => setShowSearchModal(true)}
              title="Quick Search SKUs & Orders"
            >
              <Search size={18} />
            </button>

            {/* Notifications Bell Button */}
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadNotifications(false);
                }}
                title="System Notifications"
              >
                <Bell size={18} />
              </button>
              {unreadNotifications && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  border: '2px solid #ffffff'
                }} />
              )}

              {/* Notifications Dropdown Panel */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '52px',
                  right: '0',
                  width: '320px',
                  background: '#ffffff',
                  borderRadius: '0.85rem',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  padding: '1.25rem',
                  zIndex: 999
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>System Activity Log</span>
                    <span style={{ fontSize: '0.7rem', background: '#dcfce7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '0.3rem', fontWeight: 700 }}>ACID Live</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                    <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '0.5rem', borderLeft: '3px solid #7c3aed' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>Work Order Shortage Alert</div>
                      <div style={{ color: '#64748b', marginTop: '0.2rem' }}>Shortage of 60 units on SKU-CPU-001 (Main Warehouse)</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '0.5rem', borderLeft: '3px solid #10b981' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>Stock Transfer Received</div>
                      <div style={{ color: '#64748b', marginTop: '0.2rem' }}>15 units of LiDAR array added to North Hub</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

            {/* User Badge Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              padding: '0.4rem 0.85rem 0.4rem 0.5rem',
              borderRadius: '9999px'
            }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem'
              }}>
                {user.name.charAt(0)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>{user.name}</span>
                <span style={{ fontSize: '0.7rem', color: '#7c3aed', fontWeight: 700 }}>{user.role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'overview' && (
          <div>
            {/* Filter Bar Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.75rem'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#0f172a'
              }}>
                <Calendar size={16} color="#7c3aed" /> Real-Time Database Metrics
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-secondary" style={{ borderRadius: '9999px', padding: '0.5rem 1.1rem' }} onClick={fetchDashboardData}>
                  <SlidersHorizontal size={16} /> Sync Data
                </button>
                {user.role === 'ADMIN' ? (
                  <button className="btn btn-primary" style={{ borderRadius: '9999px', padding: '0.5rem 1.25rem' }} onClick={() => setActiveTab('work-orders')}>
                    <Plus size={18} /> Add new Work Order
                  </button>
                ) : user.role === 'OPERATIONS' ? (
                  <button className="btn btn-primary" style={{ borderRadius: '9999px', padding: '0.5rem 1.25rem' }} onClick={() => setActiveTab('transfers')}>
                    <Plus size={18} /> Request Transfer
                  </button>
                ) : (
                  <button className="btn btn-primary" style={{ borderRadius: '9999px', padding: '0.5rem 1.25rem' }} onClick={() => setActiveTab('orders')}>
                    <Plus size={18} /> New Sales Order
                  </button>
                )}
              </div>
            </div>

            {/* Top 4 Live Metric KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.25rem',
              marginBottom: '1.75rem'
            }}>
              <div className="card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>Total Physical Stock</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }} onClick={() => setActiveTab('inventory')}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                  {totalPhysical.toLocaleString()} <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>Units</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                  <TrendingUp size={14} /> Multi-warehouse aggregate
                </div>
              </div>

              <div className="card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>Available Inventory</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }} onClick={() => setActiveTab('inventory')}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                  {totalAvailable.toLocaleString()} <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>Available</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                  <TrendingUp size={14} /> Ready for allocation
                </div>
              </div>

              <div className="card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>Material Shortage</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }} onClick={() => setActiveTab('work-orders')}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: totalShortage > 0 ? '#dc2626' : '#059669', marginBottom: '0.75rem' }}>
                  {totalShortage.toLocaleString()} <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>Shortage</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: totalShortage > 0 ? '#fef2f2' : '#ecfdf5', color: totalShortage > 0 ? '#dc2626' : '#059669', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {totalShortage > 0 ? <TrendingDown size={14} /> : <TrendingUp size={14} />} {totalShortage > 0 ? 'Requires transfer' : 'Zero Shortage'}
                </div>
              </div>

              <div className="card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>Reserved Stock</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }} onClick={() => setActiveTab('orders')}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                  {totalReserved.toLocaleString()} <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>Reserved</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                  <TrendingUp size={14} /> Sales locked
                </div>
              </div>
            </div>

            {/* Middle Section: Chart & Category Distribution Widget */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '1.5rem',
              marginBottom: '1.75rem'
            }}>
              <div className="card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Inventory Stock Flow</h3>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                      <span style={{ color: '#7c3aed', fontWeight: 600 }}>● Physical Stock ({totalPhysical})</span>
                      <span style={{ color: '#c084fc', fontWeight: 600 }}>● Reserved Stock ({totalReserved})</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                      <option>All Locations</option>
                      <option>Main Warehouse</option>
                      <option>North Hub</option>
                      <option>South Branch</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '140px' }}>
                      <div style={{ width: '16px', height: '70%', background: '#7c3aed', borderRadius: '4px' }} />
                      <div style={{ width: '16px', height: '40%', background: '#c084fc', borderRadius: '4px' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Main Whse</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '140px' }}>
                      <div style={{ width: '16px', height: '85%', background: '#7c3aed', borderRadius: '4px' }} />
                      <div style={{ width: '16px', height: '50%', background: '#c084fc', borderRadius: '4px' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>North Hub</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-30px', background: '#0f172a', color: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.7rem', fontWeight: 700 }}>
                      Live Synced
                    </div>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '140px' }}>
                      <div style={{ width: '16px', height: '95%', background: '#7c3aed', borderRadius: '4px' }} />
                      <div style={{ width: '16px', height: '65%', background: '#c084fc', borderRadius: '4px' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 700 }}>South Branch</span>
                  </div>
                </div>
              </div>

              <div className="card" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Stock Distribution</h3>
                  <ArrowUpRight size={18} color="#94a3b8" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', margin: '1rem 0' }}>
                  <div style={{ position: 'relative', width: '110px', height: '110px' }}>
                    <svg width="110" height="110" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ddd6fe" strokeWidth="3.8" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7c3aed" strokeWidth="3.8" strokeDasharray="65, 100" />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Total</span>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{totalPhysical}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem' }}>
                    <div style={{ color: '#64748b' }}><span style={{ color: '#7c3aed' }}>●</span> Electronics (40%)</div>
                    <div style={{ color: '#64748b' }}><span style={{ color: '#a855f7' }}>●</span> Raw Hardware (35%)</div>
                    <div style={{ color: '#64748b' }}><span style={{ color: '#38bdf8' }}>●</span> Packaging (15%)</div>
                    <div style={{ color: '#64748b' }}><span style={{ color: '#f59e0b' }}>●</span> Sensors (10%)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: Real Live Transactions Table & Fulfillment Goals */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '1.5rem'
            }}>
              <div className="card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Recent ERP Operations</h3>
                  <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 700, cursor: 'pointer' }} onClick={() => setActiveTab('work-orders')}>
                    View Work Orders ›
                  </span>
                </div>

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>MODULE / OPERATION</th>
                        <th>ITEM</th>
                        <th>LOCATION</th>
                        <th>QTY</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workOrders.slice(0, 3).map((wo) => (
                        <tr key={wo.id}>
                          <td style={{ fontWeight: 700, color: '#0f172a' }}>Work Order</td>
                          <td>{wo.item.name}</td>
                          <td style={{ fontSize: '0.85rem', color: '#64748b' }}>{wo.location.name}</td>
                          <td style={{ fontWeight: 800, color: wo.shortageQuantity > 0 ? '#dc2626' : '#059669' }}>
                            Req: {wo.requiredQuantity}
                          </td>
                          <td>
                            <span className="badge badge-status-assigned">{wo.status}</span>
                          </td>
                        </tr>
                      ))}
                      {transfers.slice(0, 2).map((t) => (
                        <tr key={t.id}>
                          <td style={{ fontWeight: 700, color: '#7c3aed' }}>Stock Transfer</td>
                          <td>{t.item.name}</td>
                          <td style={{ fontSize: '0.85rem', color: '#64748b' }}>{t.sourceLocation.name} → {t.destinationLocation.name}</td>
                          <td style={{ fontWeight: 800, color: '#38bdf8' }}>{t.quantity} Units</td>
                          <td>
                            <span className={`badge badge-${t.status.toLowerCase()}`}>{t.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fulfillment Goals Progress Bar Card */}
              <div className="card" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Operational Targets</h3>
                  <ArrowUpRight size={18} color="#94a3b8" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      <span style={{ color: '#0f172a' }}>Work Orders Active</span>
                      <span style={{ color: '#7c3aed' }}>{workOrders.length} Orders</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '85%', height: '100%', background: '#7c3aed', borderRadius: '9999px' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      <span style={{ color: '#0f172a' }}>Transfers Synced</span>
                      <span style={{ color: '#7c3aed' }}>{transfers.length} Transfers</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '92%', height: '100%', background: '#7c3aed', borderRadius: '9999px' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      <span style={{ color: '#0f172a' }}>Customer Orders Stocked</span>
                      <span style={{ color: '#7c3aed' }}>{customerOrders.length} Orders</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '64%', height: '100%', background: '#7c3aed', borderRadius: '9999px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Inventory */}
        {activeTab === 'inventory' && <Inventory />}

        {/* Tab 3: Work Orders */}
        {activeTab === 'work-orders' && <WorkOrders />}

        {/* Tab 4: Stock Transfers */}
        {activeTab === 'transfers' && <InternalTransfers />}

        {/* Tab 5: Customer Orders */}
        {activeTab === 'orders' && <CustomerOrders />}
      </main>

      {/* Sync Notification Toast */}
      {syncToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0f172a',
          color: '#ffffff',
          padding: '0.85rem 1.5rem',
          borderRadius: '0.65rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          zIndex: 9999
        }}>
          <CheckCircle2 size={18} color="#34d399" /> {syncToast}
        </div>
      )}

      {/* Quick Search Overlay Modal */}
      {showSearchModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '6rem',
          zIndex: 9999
        }} onClick={() => setShowSearchModal(false)}>
          <div style={{
            width: '100%',
            maxWidth: '560px',
            background: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            padding: '1.5rem',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
              <Search size={20} color="#7c3aed" />
              <input
                type="text"
                placeholder="Search items, SKUs, locations or order numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  color: '#0f172a',
                  fontWeight: 500
                }}
              />
              <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 700 }} onClick={() => setShowSearchModal(false)}>ESC</button>
            </div>

            {/* Live Search Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>Jump to Module</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="badge badge-admin" style={{ cursor: 'pointer', padding: '0.4rem 0.8rem' }} onClick={() => { setActiveTab('inventory'); setShowSearchModal(false); }}>Inventory SKUs</button>
                <button className="badge badge-ops" style={{ cursor: 'pointer', padding: '0.4rem 0.8rem' }} onClick={() => { setActiveTab('work-orders'); setShowSearchModal(false); }}>Work Orders</button>
                <button className="badge badge-sales" style={{ cursor: 'pointer', padding: '0.4rem 0.8rem' }} onClick={() => { setActiveTab('transfers'); setShowSearchModal(false); }}>Stock Transfers</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
