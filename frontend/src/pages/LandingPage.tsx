import {
  Boxes,
  ClipboardList,
  ArrowLeftRight,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Database,
  Lock,
  ChevronRight,
  Activity,
  Workflow
} from 'lucide-react';

interface LandingPageProps {
  onGoToLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoToLogin }) => {
  return (
    <div className="hide-scrollbar" style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#090417',
      color: '#f8fafc',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      overflowY: 'auto',
      overflowX: 'hidden',
      zIndex: 9999,
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
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

      {/* Redefined Premium Glassmorphism Navigation Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.1rem 3.5rem',
        maxWidth: '100%',
        background: 'rgba(9, 4, 23, 0.75)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(168, 85, 247, 0.18)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
        transition: 'all 0.3s ease'
      }}>
        {/* Brand Logo & Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', cursor: 'pointer' }} onClick={onGoToLogin}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '0.85rem',
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.25)'
          }}>
            <Boxes size={24} color="#ffffff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 900, fontSize: '1.5rem', color: '#ffffff', letterSpacing: '-0.5px', lineHeight: 1 }}>Operra</span>
            <span style={{ fontSize: '0.65rem', color: '#a855f7', fontWeight: 700, letterSpacing: '1.2px', marginTop: '0.2rem' }}>OPERATIONS ERP</span>
          </div>
        </div>

        {/* Navigation Links matched exactly to Page Sections */}
        <nav style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          background: 'rgba(23, 14, 45, 0.6)',
          padding: '0.4rem 0.6rem',
          borderRadius: '9999px',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <a href="#overview" style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600, padding: '0.45rem 1rem', borderRadius: '9999px', background: 'rgba(124, 58, 237, 0.25)', border: '1px solid rgba(168, 85, 247, 0.3)', transition: 'all 0.2s ease' }}>
            Overview
          </a>
          <a href="#lifecycle" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500, padding: '0.45rem 1rem', borderRadius: '9999px', transition: 'all 0.2s ease' }}>
            Modules Lifecycle
          </a>
          <a href="#security" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500, padding: '0.45rem 1rem', borderRadius: '9999px', transition: 'all 0.2s ease' }}>
            ACID Safety
          </a>
          <a href="#architecture" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500, padding: '0.45rem 1rem', borderRadius: '9999px', transition: 'all 0.2s ease' }}>
            Architecture
          </a>
        </nav>

        {/* CTA Login Button with Glow Effect */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onGoToLogin}
            style={{
              padding: '0.75rem 1.75rem',
              borderRadius: '0.65rem',
              background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #9333ea 100%)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.55)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            Access ERP Portal <ChevronRight size={18} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="overview" style={{
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
      <section id="lifecycle" style={{
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

      {/* Section 3: ACID Safety & Transactional Guarantees Deep Dive */}
      <section id="security" style={{
        maxWidth: '1350px',
        margin: '0 auto 6rem',
        padding: '0 4rem',
        position: 'relative',
        zIndex: 5
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            <ShieldCheck size={16} /> Enterprise Reliability Architecture
          </div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.75rem' }}>
            ACID-Guaranteed Transaction System
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            How Operra guarantees complete data integrity, zero phantom stock leaks, and race-condition immunity across distributed warehouse operations.
          </p>
        </div>

        {/* 4 ACID Principles Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          {/* Atomicity */}
          <div style={{
            background: 'rgba(23, 14, 45, 0.75)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            borderRadius: '1rem',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '0.65rem',
              background: 'rgba(124, 58, 237, 0.2)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c084fc'
            }}>
              <Lock size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Atomicity (A)</h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Stock transfer dispatch/receipt and reservation deductions execute in single, atomic database transactions (`prisma.$transaction`). All updates succeed together or roll back completely.
            </p>
          </div>

          {/* Consistency */}
          <div style={{
            background: 'rgba(23, 14, 45, 0.75)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '1rem',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '0.65rem',
              background: 'rgba(6, 182, 212, 0.2)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8'
            }}>
              <Activity size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Consistency (C)</h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Invariants are strictly preserved across all operations: `Available Stock = Physical Stock - Reserved Stock`. Negative physical or available quantities are blocked at DB level.
            </p>
          </div>

          {/* Isolation */}
          <div style={{
            background: 'rgba(23, 14, 45, 0.75)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '1rem',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '0.65rem',
              background: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fbbf24'
            }}>
              <Workflow size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Isolation (I)</h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Concurrent customer order reservations lock target inventory rows during calculation, preventing dirty reads and race conditions when multiple sales reps reserve stock simultaneously.
            </p>
          </div>

          {/* Durability */}
          <div style={{
            background: 'rgba(23, 14, 45, 0.75)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '1rem',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '0.65rem',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399'
            }}>
              <Database size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Durability (D)</h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              All committed state transitions (such as stock transfer receipts or work order updates) are written to persistent storage with full transaction log integrity.
            </p>
          </div>
        </div>

        {/* Live Architectural Diagram & Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem' }}>
              Idempotent Stock Receipts & RBAC Operations
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: '1.75rem' }}>
              Operra enforces strict state machines on inter-warehouse transfers. Attempting to receive an already completed transfer (`RECEIVED`) returns an idempotent response without modifying inventory balances twice.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={20} color="#34d399" />
                <span style={{ fontSize: '0.95rem', color: '#e2e8f0' }}>Strict 3-Stage Transfer: REQUESTED → DISPATCHED → RECEIVED</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={20} color="#34d399" />
                <span style={{ fontSize: '0.95rem', color: '#e2e8f0' }}>Backend Role-Based Route Guards (Admin, Operations, Sales)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={20} color="#34d399" />
                <span style={{ fontSize: '0.95rem', color: '#e2e8f0' }}>Automated Shortage Computation for Production Scheduling</span>
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
              Access System Console
            </button>
          </div>

          <div style={{
            background: 'rgba(23, 14, 45, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            borderRadius: '1.25rem',
            padding: '2rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#a855f7', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Visual Transfer Pipeline
            </div>

            {/* Stage 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(14, 7, 36, 0.9)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(139, 92, 246, 0.2)', marginBottom: '0.75rem' }}>
              <div style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.5rem 0.8rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.8rem' }}>1. REQUESTED</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Source inventory physical balance remains untouched.</div>
            </div>

            {/* Stage 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(14, 7, 36, 0.9)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(139, 92, 246, 0.2)', marginBottom: '0.75rem' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '0.5rem 0.8rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.8rem' }}>2. DISPATCHED</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Source physical stock deducted atomically inside transaction.</div>
            </div>

            {/* Stage 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(14, 7, 36, 0.9)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '0.5rem 0.8rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.8rem' }}>3. RECEIVED</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Destination inventory increased atomically. Idempotency enforced.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: System Architecture & Entity Relationships */}
      <section id="architecture" style={{
        maxWidth: '1350px',
        margin: '0 auto 6rem',
        padding: '0 4rem',
        position: 'relative',
        zIndex: 5
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            <Database size={16} /> Relational Schema & Flow Architecture
          </div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.75rem' }}>
            Core Data Relationships & System Flow
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            Understand how entities connect, how inventory is scoped per warehouse, and how operations trigger database updates across the ERP stack.
          </p>
        </div>

        {/* 3 Main Architectural Layers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Layer 1: Access Control */}
          <div style={{ background: 'rgba(23, 14, 45, 0.75)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: '1rem', padding: '1.75rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>LAYER 1</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>User & Location Scope</h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Every user (`ADMIN`, `OPERATIONS`, `SALES`) belongs to a primary warehouse `Location`. RBAC route guards restrict write operations to assigned warehouse scopes.
            </p>
          </div>

          {/* Layer 2: Inventory Grid */}
          <div style={{ background: 'rgba(23, 14, 45, 0.75)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '1rem', padding: '1.75rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>LAYER 2</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>Location-Item Matrix</h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              `Inventory` rows form a composite relation linking `LocationId + ItemId + BatchNumber`. Formula: <code>Available = Physical - Reserved</code>.
            </p>
          </div>

          {/* Layer 3: Transaction Engines */}
          <div style={{ background: 'rgba(23, 14, 45, 0.75)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '1rem', padding: '1.75rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>LAYER 3</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>Atomic Action Handlers</h3>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              `WorkOrder` shortage checks, `InternalTransfer` dispatching, and `CustomerOrder` reservations process atomically inside Postgres transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Rich Footer */}
      <footer style={{
        borderTop: '1px solid rgba(139, 92, 246, 0.25)',
        background: 'rgba(13, 7, 32, 0.95)',
        backdropFilter: 'blur(12px)',
        padding: '4rem 4rem 2rem',
        position: 'relative',
        zIndex: 5
      }}>
        <div style={{
          maxWidth: '1350px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: '3.5rem',
          marginBottom: '3rem'
        }}>
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '0.6rem',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)'
              }}>
                <Boxes size={20} color="#ffffff" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.35rem', color: '#ffffff', letterSpacing: '-0.5px' }}>Operra</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '340px', marginBottom: '1.5rem' }}>
              Production-oriented Operations ERP platform for multi-location inventory control, production work orders, and transactional stock reservations.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span className="badge badge-admin">ACID Compliant</span>
              <span className="badge badge-ops">Multi-Tenant Ready</span>
            </div>
          </div>

          {/* Column 2: ERP Modules */}
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>ERP Modules</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <li><a href="#inventory" onClick={onGoToLogin} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Inventory Tracking</a></li>
              <li><a href="#work-orders" onClick={onGoToLogin} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Work Orders</a></li>
              <li><a href="#transfers" onClick={onGoToLogin} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Internal Stock Transfers</a></li>
              <li><a href="#orders" onClick={onGoToLogin} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Customer Reservations</a></li>
            </ul>
          </div>

          {/* Column 3: Architecture & Security */}
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>Architecture</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <li>React 18 + Vite</li>
              <li>Express API Server</li>
              <li>Prisma ORM</li>
              <li>PostgreSQL DB</li>
              <li>JWT Role Guards</li>
            </ul>
          </div>

          {/* Column 4: Portal Access & Credentials */}
          <div>
            <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem' }}>Demo Portal Access</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              Test default credentials are pre-seeded into the database:
            </p>
            <div style={{ background: 'rgba(23, 14, 45, 0.8)', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid rgba(139, 92, 246, 0.2)', fontSize: '0.8rem', color: '#c084fc' }}>
              <div><strong>Admin:</strong> admin@erp.com</div>
              <div><strong>Ops:</strong> ops@erp.com</div>
              <div><strong>Sales:</strong> sales@erp.com</div>
              <div style={{ color: '#94a3b8', marginTop: '0.25rem' }}>Password: <code>password123</code></div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div style={{
          maxWidth: '1350px',
          margin: '0 auto',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#64748b',
          fontSize: '0.85rem'
        }}>
          <p>Operra Operations ERP © 2026. Designed with Precision, Built for Scale.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={onGoToLogin}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }} onClick={onGoToLogin}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }} onClick={onGoToLogin}>Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
