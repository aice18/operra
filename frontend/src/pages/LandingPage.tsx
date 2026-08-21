import React from 'react';
import {
  Boxes,
  ClipboardList,
  ArrowLeftRight,
  ShoppingBag,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Database,
  Lock,
  ChevronRight,
  Sparkles,
  Activity,
  Workflow
} from 'lucide-react';

interface LandingPageProps {
  onGoToLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoToLogin }) => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#090417',
      color: '#f8fafc',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Dynamic Background Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '-150px',
        width: '650px',
        height: '650px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, rgba(9, 4, 23, 0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '350px',
        right: '-180px',
        width: '700px',
        height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(9, 4, 23, 0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '1100px',
        left: '-120px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, rgba(9, 4, 23, 0) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Navigation Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.75rem 4rem',
        maxWidth: '1350px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }} onClick={onGoToLogin}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Boxes size={22} color="#ffffff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: '1.45rem', color: '#ffffff', letterSpacing: '-0.5px', lineHeight: 1.1 }}>Operra</span>
            <span style={{ fontSize: '0.65rem', color: '#a855f7', fontWeight: 700, letterSpacing: '1px' }}>OPERATIONS ERP</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#overview" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600 }}>Overview</a>
          <a href="#inventory" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>Inventory</a>
          <a href="#work-orders" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>Work Orders</a>
          <a href="#transfers" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>Stock Transfers</a>
          <a href="#security" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>ACID Safety</a>
        </nav>

        {/* CTA Login Button */}
        <button
          onClick={onGoToLogin}
          style={{
            padding: '0.75rem 1.8rem',
            borderRadius: '0.6rem',
            background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #9333ea 100%)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.5)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}
        >
          Access ERP Portal <ChevronRight size={18} />
        </button>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1350px',
        margin: '0 auto',
        padding: '3.5rem 4rem 4rem',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '4rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Left Column Content */}
        <div>
          {/* Top Pill Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(139, 92, 246, 0.12)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            color: '#c084fc',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={16} /> Enterprise Mini Operations ERP System
          </div>

          <h1 style={{
            fontSize: '3.6rem',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-1px',
            marginBottom: '1.25rem',
            color: '#ffffff'
          }}>
            Streamline Multi-Location<br />
            <span style={{
              background: 'linear-gradient(135deg, #d8b4fe 0%, #c084fc 40%, #e879f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(192, 132, 252, 0.4)'
            }}>
              Operations & Inventory
            </span> Control
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: '#94a3b8',
            marginBottom: '2.5rem',
            maxWidth: '520px',
            lineHeight: 1.65
          }}>
            Seamlessly orchestrate inventory tracking, production work orders, automated shortage calculations, inter-warehouse stock transfers, and ACID-guaranteed customer reservations.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '3rem', alignItems: 'center' }}>
            <button
              onClick={onGoToLogin}
              style={{
                padding: '0.9rem 2.2rem',
                borderRadius: '0.6rem',
                background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #9333ea 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 6px 25px rgba(124, 58, 237, 0.55)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              Launch Operations Hub <ArrowRight size={18} />
            </button>

            <button
              onClick={onGoToLogin}
              style={{
                padding: '0.9rem 2rem',
                borderRadius: '0.6rem',
                background: 'rgba(124, 58, 237, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Workflow size={18} /> Explore Module Flow
            </button>
          </div>

          {/* Supported Role Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Role-Based Access:</span>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <span className="badge badge-admin">Admin</span>
              <span className="badge badge-ops">Operations User</span>
              <span className="badge badge-sales">Sales User</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive ERP Live Flow Dashboard Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
            background: 'rgba(23, 14, 45, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            borderRadius: '1.25rem',
            padding: '1.75rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(124, 58, 237, 0.25)',
            position: 'relative'
          }}>
            {/* Mock Header Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(139, 92, 246, 0.2)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} color="#06b6d4" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>Live Stock Engine</span>
              </div>
              <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 600 }}>
                ACID Verified
              </span>
            </div>

            {/* Metric Display Box: Physical - Reserved = Available */}
            <div style={{
              background: 'rgba(14, 7, 36, 0.9)',
              borderRadius: '0.85rem',
              padding: '1.25rem',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              marginBottom: '1.25rem'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600 }}>
                ITEM: High-Grade Industrial Steel
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
                <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.75rem 0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                  <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>PHYSICAL</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff' }}>100</div>
                </div>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem 0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                  <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 700 }}>RESERVED</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff' }}>30</div>
                </div>
                <div style={{ background: 'rgba(168, 85, 247, 0.15)', padding: '0.75rem 0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
                  <div style={{ fontSize: '0.7rem', color: '#c084fc', fontWeight: 700 }}>AVAILABLE</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#a855f7' }}>70</div>
                </div>
              </div>
            </div>

            {/* Work Order Shortage Widget */}
            <div style={{
              background: 'rgba(14, 7, 36, 0.9)',
              borderRadius: '0.85rem',
              padding: '1.25rem',
              border: '1px solid rgba(139, 92, 246, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Work Order #WO-8041 Shortage</span>
                <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700, background: 'rgba(239,68,68,0.15)', padding: '0.2rem 0.5rem', borderRadius: '0.35rem' }}>Shortage: 40</span>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, #a855f7, #06b6d4)' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                <span>Required Material: 100</span>
                <span>Available at Location: 60</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Core Modules Pipeline */}
      <section style={{
        maxWidth: '1350px',
        margin: '2rem auto 6rem',
        padding: '0 4rem',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Complete ERP Operations Lifecycle
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Built specifically to solve multi-location warehouse tracking, production material shortage logic, and transactional stock safety.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem'
        }}>
          {/* Card 1: Inventory Management */}
          <div style={{
            background: 'rgba(23, 14, 45, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '1rem',
            padding: '2rem 1.5rem',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
              marginBottom: '1.25rem'
            }}>
              <Boxes size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
              1. Inventory Tracking
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
              Real-time calculation of Physical, Reserved, and Available stock across multiple warehouse locations and batches.
            </p>
            <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }} onClick={onGoToLogin}>
              Explore Inventory →
            </span>
          </div>

          {/* Card 2: Work Orders */}
          <div style={{
            background: 'rgba(23, 14, 45, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '1rem',
            padding: '2rem 1.5rem',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
              marginBottom: '1.25rem'
            }}>
              <ClipboardList size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
              2. Work Order Check
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
              Automated material shortage computation (`Shortage = Required - Available`). Assign production tasks efficiently.
            </p>
            <span style={{ color: '#fbbf24', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }} onClick={onGoToLogin}>
              Check Work Orders →
            </span>
          </div>

          {/* Card 3: Internal Stock Transfer */}
          <div style={{
            background: 'rgba(23, 14, 45, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '1rem',
            padding: '2rem 1.5rem',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
              marginBottom: '1.25rem'
            }}>
              <ArrowLeftRight size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
              3. Internal Transfers
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
              Strict 3-stage transfer lifecycle (`Requested → Dispatched → Received`) preventing duplicate receipts and invalid stock leaks.
            </p>
            <span style={{ color: '#c084fc', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }} onClick={onGoToLogin}>
              Manage Transfers →
            </span>
          </div>

          {/* Card 4: Customer Order Reservations */}
          <div style={{
            background: 'rgba(23, 14, 45, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '1rem',
            padding: '2rem 1.5rem',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
              marginBottom: '1.25rem'
            }}>
              <ShoppingBag size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
              4. Sales Reservations
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
              Sales user stock reservation locks preventing over-booking and race conditions via database-level transaction locks.
            </p>
            <span style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }} onClick={onGoToLogin}>
              Reserve Stock →
            </span>
          </div>
        </div>
      </section>

      {/* Section 3: Technical Highlights & ACID Protection */}
      <section style={{
        maxWidth: '1350px',
        margin: '0 auto 6rem',
        padding: '0 4rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Left Column Content */}
        <div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.25,
            color: '#ffffff',
            marginBottom: '1.5rem'
          }}>
            Built for Extreme Precision,<br />
            <span style={{ color: '#a855f7', textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}>
              Zero Data Corruptions
            </span>
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: '#94a3b8',
            lineHeight: 1.65,
            marginBottom: '2rem',
            maxWidth: '500px'
          }}>
            Operra enforces strict business rules at the database transaction boundary. Prevents negative inventory, duplicate transfer receipts, and unauthorized role operations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={20} color="#34d399" />
              <span style={{ fontSize: '0.95rem', color: '#e2e8f0' }}>Atomic Stock Dispatches & Destination Locking</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={20} color="#34d399" />
              <span style={{ fontSize: '0.95rem', color: '#e2e8f0' }}>Backend Role-Based Access Control (Admin, Operations, Sales)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={20} color="#34d399" />
              <span style={{ fontSize: '0.95rem', color: '#e2e8f0' }}>Automated Shortage & Stock Availability Math</span>
            </div>
          </div>

          <button
            onClick={onGoToLogin}
            style={{
              padding: '0.85rem 2rem',
              borderRadius: '0.6rem',
              background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)'
            }}
          >
            Launch Live Platform
          </button>
        </div>

        {/* Right Column: Database Architectural Spec Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div style={{
            background: 'rgba(23, 14, 45, 0.75)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: '1rem',
            padding: '1.5rem'
          }}>
            <Database size={28} color="#38bdf8" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>Prisma & PostgreSQL</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Strict relational schema with transactional consistency.
            </p>
          </div>

          <div style={{
            background: 'rgba(23, 14, 45, 0.75)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: '1rem',
            padding: '1.5rem'
          }}>
            <Lock size={28} color="#c084fc" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>JWT Auth & Roles</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Secure backend route guards for Admin, Operations, and Sales.
            </p>
          </div>

          <div style={{
            background: 'rgba(23, 14, 45, 0.75)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: '1rem',
            padding: '1.5rem'
          }}>
            <BarChart3 size={28} color="#fbbf24" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>Material Analytics</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Instant visibility into material shortages across orders.
            </p>
          </div>

          <div style={{
            background: 'rgba(23, 14, 45, 0.75)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: '1rem',
            padding: '1.5rem'
          }}>
            <ShieldCheck size={28} color="#34d399" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>Automated Tests</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Comprehensive test suite covering transactions & edge cases.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <footer style={{
        borderTop: '1px solid rgba(139, 92, 246, 0.2)',
        padding: '2.5rem 4rem',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.9rem',
        position: 'relative',
        zIndex: 5
      }}>
        <p>Operra Mini Operations ERP © 2026. Built with React, Express, Prisma & PostgreSQL.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
