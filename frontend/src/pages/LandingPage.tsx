import React from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';

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
      {/* Background Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(13, 6, 32, 0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '400px',
        right: '-150px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(13, 6, 32, 0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '1200px',
        left: '-100px',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(13, 6, 32, 0) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Top Header / Navigation Bar */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.6)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.5rem', color: '#ffffff', letterSpacing: '-0.5px' }}>Operra</span>
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#home" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600 }}>Home</a>
          <a href="#markets" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>NFT Markets</a>
          <a href="#shop" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>Shop</a>
          <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}>About Us</a>
        </nav>

        {/* Header Right CTA Button */}
        <button
          onClick={onGoToLogin}
          style={{
            padding: '0.7rem 1.8rem',
            borderRadius: '0.5rem',
            background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #9333ea 100%)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.5)',
            transition: 'all 0.25s ease'
          }}
        >
          Explore Now
        </button>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1350px',
        margin: '0 auto',
        padding: '3rem 4rem 4rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Left Column Content */}
        <div>
          <h1 style={{
            fontSize: '3.75rem',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-1px',
            marginBottom: '1.25rem',
            color: '#ffffff'
          }}>
            Explore The Largest<br />
            <span style={{
              background: 'linear-gradient(135deg, #d8b4fe 0%, #c084fc 40%, #e879f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(192, 132, 252, 0.4)'
            }}>
              NFT
            </span> Marketplaces
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: '#94a3b8',
            marginBottom: '2.5rem',
            maxWidth: '480px',
            lineHeight: 1.6
          }}>
            Buy, Sell & Trade Cryptocurrency Easily and Securely with Operra's ACID-Protected Enterprise Operations Platform.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '3rem', alignItems: 'center' }}>
            <button
              onClick={onGoToLogin}
              style={{
                padding: '0.85rem 2.2rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #9333ea 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 6px 25px rgba(124, 58, 237, 0.55)',
                transition: 'all 0.25s ease'
              }}
            >
              Connect Wallet
            </button>

            <button
              onClick={onGoToLogin}
              style={{
                padding: '0.85rem 2rem',
                borderRadius: '0.5rem',
                background: 'rgba(124, 58, 237, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              Learn More
            </button>
          </div>

          {/* Our Members Avatar Pile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>Our Members</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #f43f5e, #fb7185)', border: '2px solid #090417', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', marginLeft: '0' }}>👩‍💻</div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #38bdf8)', border: '2px solid #090417', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', marginLeft: '-10px' }}>👨‍💻</div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #c084fc)', border: '2px solid #090417', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', marginLeft: '-10px' }}>🙋‍♀️</div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', border: '2px solid #090417', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', marginLeft: '-10px' }}>🧔</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Isometric Floating Ethereum Platform Graphic */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <svg width="480" height="480" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="purpleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#4c1d95" />
              </linearGradient>
              <linearGradient id="purpleGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing Base Halo */}
            <ellipse cx="250" cy="380" rx="190" ry="60" fill="url(#purpleGrad1)" opacity="0.35" filter="url(#glow)" />
            <ellipse cx="250" cy="380" rx="140" ry="40" fill="#7c3aed" opacity="0.25" />

            {/* Perspective Circuit Rays */}
            <path d="M100 390 L250 430 L400 390" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <path d="M130 360 L250 400 L370 360" stroke="#a855f7" strokeWidth="2" opacity="0.4" />

            {/* Isometric Hexagonal Base Stack */}
            {/* Bottom Base */}
            <path d="M110 260 L250 190 L390 260 L390 290 L250 360 L110 290 Z" fill="#2e1065" stroke="#7c3aed" strokeWidth="3" />
            {/* Side 1 */}
            <path d="M110 290 L250 360 L250 380 L110 310 Z" fill="#1e1b4b" stroke="#6d28d9" strokeWidth="2" />
            {/* Side 2 */}
            <path d="M250 360 L390 290 L390 310 L250 380 Z" fill="#3b0764" stroke="#6d28d9" strokeWidth="2" />

            {/* Main Glowing Hexagon Top */}
            <path d="M125 250 L250 185 L375 250 L250 315 Z" fill="url(#purpleGrad1)" stroke="#a855f7" strokeWidth="4" />
            <path d="M140 250 L250 195 L360 250 L250 305 Z" fill="#4c1d95" opacity="0.8" />

            {/* "NFT" 3D Isometric Text Block on Platform */}
            <g transform="translate(195, 215)">
              <rect x="0" y="0" width="110" height="40" rx="8" fill="url(#purpleGrad2)" stroke="#ffffff" strokeWidth="2" opacity="0.9" />
              <text x="55" y="27" fill="#ffffff" fontSize="22" fontWeight="900" textAnchor="middle" letterSpacing="3">NFT</text>
            </g>

            {/* 3D Floating Diamond / Ethereum Crystal on Top */}
            <g transform="translate(250, 110)">
              {/* Top Facet Left */}
              <polygon points="0,-75 -40,-10 0,10" fill="#e9d5ff" opacity="0.9" />
              {/* Top Facet Right */}
              <polygon points="0,-75 40,-10 0,10" fill="#c084fc" opacity="0.95" />
              {/* Bottom Facet Left */}
              <polygon points="0,10 -40,-10 0,65" fill="#a855f7" opacity="0.85" />
              {/* Bottom Facet Right */}
              <polygon points="0,10 40,-10 0,65" fill="#7c3aed" opacity="0.9" />
              {/* Center Beam Light Glow */}
              <line x1="0" y1="-75" x2="0" y2="65" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
            </g>

            {/* Floating Sparkles & Neon Dots */}
            <circle cx="100" cy="180" r="4" fill="#38bdf8" filter="url(#glow)" />
            <circle cx="410" cy="190" r="5" fill="#c084fc" filter="url(#glow)" />
            <circle cx="380" cy="120" r="3" fill="#ffffff" />
            <circle cx="120" cy="330" r="3" fill="#a855f7" />
          </svg>
        </div>
      </section>

      {/* Section 2: "Secure & Private" / 3 Card Grid */}
      <section style={{
        maxWidth: '1350px',
        margin: '2rem auto 6rem',
        padding: '0 4rem',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Secure & Private
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            24/7 Dedicated Support Team
          </p>
        </div>

        {/* 3 Cards Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          {/* Card 1: Invest in crypto */}
          <div style={{
            background: 'rgba(23, 14, 45, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '1rem',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.3s ease'
          }}>
            {/* Circular Gold Icon Header */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '1.5rem',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)',
              marginBottom: '1.5rem'
            }}>
              ₿
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Invest in crypto
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.75rem', flex: 1 }}>
              Invest in crypto anytime, anywhere with our safe, secure, and easy to use online platform.
            </p>
            <button
              onClick={onGoToLogin}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#c084fc',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              Get Started →
            </button>
          </div>

          {/* Card 2: Fast Transaction */}
          <div style={{
            background: 'rgba(23, 14, 45, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '1rem',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.3s ease'
          }}>
            {/* Circular Purple Icon Header */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
              marginBottom: '1.5rem'
            }}>
              <RefreshCw size={26} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Fast Transaction
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.75rem', flex: 1 }}>
              Invest in cryptocurrency with our secure and easy-to-use online platform. With 24/7 access to full service customer support, you can trade with confidence.
            </p>
            <button
              onClick={onGoToLogin}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#c084fc',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              Get Started →
            </button>
          </div>

          {/* Card 3: Secure */}
          <div style={{
            background: 'rgba(23, 14, 45, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '1rem',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.3s ease'
          }}>
            {/* Circular Red/Pink Icon Header */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
              marginBottom: '1.5rem'
            }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Secure
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.75rem', flex: 1 }}>
              Gain access to a variety of digital assets with just a few clicks. Our intuitive platform makes it easy to buy, sell, and store your cryptocurrency.
            </p>
            <button
              onClick={onGoToLogin}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#c084fc',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              Start Now →
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: "Trade with confidence with **our platform** and easy to use." */}
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
            fontSize: '2.75rem',
            fontWeight: 800,
            lineHeight: 1.25,
            color: '#ffffff',
            marginBottom: '1.5rem'
          }}>
            Trade with confidence with<br />
            <span style={{ color: '#a855f7', textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}>
              our platform
            </span> and easy to<br />
            use.
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: '#94a3b8',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '480px'
          }}>
            Stay up-to-date with the latest news and trends in the crypto space. Follow our market insights to make informed decisions.
          </p>

          <button
            onClick={onGoToLogin}
            style={{
              padding: '0.8rem 2rem',
              borderRadius: '0.5rem',
              background: 'rgba(124, 58, 237, 0.08)',
              color: '#ffffff',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            Explore Now
          </button>
        </div>

        {/* Right Column: 3D Isometric Data Center / Building Vector Graphic */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg width="460" height="420" viewBox="0 0 460 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cyanBuild" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="purpleBuild" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Glowing Ground Grid */}
            <path d="M50 320 L230 400 L410 320 L230 240 Z" fill="#130a2a" stroke="#7c3aed" strokeWidth="2" opacity="0.8" />
            <path d="M90 320 L230 380 L370 320" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

            {/* Isometric Tower Structure */}
            {/* Main Tower Left Face */}
            <path d="M230 140 L150 180 L150 330 L230 290 Z" fill="url(#cyanBuild)" opacity="0.85" stroke="#38bdf8" strokeWidth="2" />
            {/* Main Tower Right Face */}
            <path d="M230 140 L310 180 L310 330 L230 290 Z" fill="url(#purpleBuild)" opacity="0.9" stroke="#a855f7" strokeWidth="2" />
            {/* Tower Top Roof */}
            <path d="M230 140 L150 180 L230 220 L310 180 Z" fill="#c084fc" opacity="0.95" />

            {/* Windows / Server Grid Lines */}
            <line x1="170" y1="210" x2="230" y2="180" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
            <line x1="170" y1="240" x2="230" y2="210" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
            <line x1="170" y1="270" x2="230" y2="240" stroke="#ffffff" strokeWidth="2" opacity="0.6" />

            <line x1="230" y1="180" x2="290" y2="210" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
            <line x1="230" y1="210" x2="290" y2="240" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
            <line x1="230" y1="240" x2="290" y2="270" stroke="#ffffff" strokeWidth="2" opacity="0.6" />

            {/* Bitcoin Floating Disk on Roof */}
            <g transform="translate(230, 95)">
              <ellipse cx="0" cy="0" rx="30" ry="15" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="5" fill="#ffffff" fontSize="16" fontWeight="900" textAnchor="middle">₿</text>
            </g>

            {/* Smaller Surrounding Isometric Blocks */}
            <path d="M100 270 L60 290 L60 340 L100 320 Z" fill="#1e1b4b" stroke="#06b6d4" strokeWidth="1.5" />
            <path d="M100 270 L140 290 L140 340 L100 320 Z" fill="#2e1065" stroke="#a855f7" strokeWidth="1.5" />

            <path d="M360 270 L320 290 L320 340 L360 320 Z" fill="#1e1b4b" stroke="#06b6d4" strokeWidth="1.5" />
            <path d="M360 270 L400 290 L400 340 L360 320 Z" fill="#2e1065" stroke="#a855f7" strokeWidth="1.5" />
          </svg>
        </div>
      </section>

      {/* Section 4: "24/7 access to customer support" */}
      <section style={{
        maxWidth: '1350px',
        margin: '0 auto 5rem',
        padding: '0 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Floating Bitcoin Badge Bottom Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: '#ffffff',
            fontWeight: 900,
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)',
            transform: 'rotate(-15deg)'
          }}>
            ₿
          </div>
        </div>

        {/* Text Right */}
        <div style={{ textAlign: 'right' }}>
          <h3 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.2
          }}>
            <span style={{ color: '#a855f7' }}>24/7</span> access to customer<br />support
          </h3>
        </div>
      </section>

      {/* Quick Access Footer */}
      <footer style={{
        borderTop: '1px solid rgba(139, 92, 246, 0.15)',
        padding: '2.5rem 4rem',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.9rem',
        position: 'relative',
        zIndex: 5
      }}>
        <p>Operra Operations ERP © 2026. Designed with Precision, Built with React, Express, Prisma & PostgreSQL.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

