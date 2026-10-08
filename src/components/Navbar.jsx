import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (path) => location.pathname === path

  return (
    <header style={styles.header} ref={menuRef}>
      <nav style={styles.nav} aria-label="Main navigation">

        {/* Wordmark */}
        <Link to="/" style={styles.wordmark} aria-label="Mediafy home">
          Mediafy
        </Link>

        {/* Centre — desktop links */}
        <div className="nav-center-links" style={styles.centerLinks}>
          <NavLink to="/" label="Search" active={isActive('/')} />
          <NavLink to="/collection" label="Collection" active={isActive('/collection')} />
        </div>

        {/* Right — desktop CTA */}
        <div className="nav-right-desk" style={styles.rightDesk}>
          <Link
            to="/collection"
            style={{
              ...styles.ctaBtn,
              ...(isActive('/collection') ? styles.ctaBtnActive : {}),
            }}
          >
            My Collection
          </Link>
        </div>

        {/* Hamburger button */}
        <button
          className="nav-hamburger"
          style={styles.hamburger}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span style={bar(menuOpen, 0)} />
          <span style={bar(menuOpen, 1)} />
          <span style={bar(menuOpen, 2)} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className="nav-mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        style={{
          ...styles.mobileMenu,
          ...(menuOpen ? styles.mobileMenuOpen : {}),
        }}
      >
        <div style={styles.mobileLinks}>
          <MobileNavLink to="/" label="Search" active={isActive('/')} />
          <MobileNavLink to="/collection" label="Collection" active={isActive('/collection')} />
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          style={styles.backdrop}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  )
}

/* ── Sub-components ───────────────────────────────────────────────────── */
const NavLink = ({ to, label, active }) => (
  <Link
    to={to}
    style={{ ...styles.navLink, ...(active ? styles.navLinkActive : {}) }}
  >
    {label}
  </Link>
)

const MobileNavLink = ({ to, label, active }) => (
  <Link
    to={to}
    style={{ ...styles.mobileLink, ...(active ? styles.mobileLinkActive : {}) }}
  >
    {label}
  </Link>
)

/* ── Animated hamburger bars ──────────────────────────────────────────── */
const bar = (open, idx) => {
  const base = {
    display: 'block',
    width: '18px',
    height: '2px',
    backgroundColor: 'var(--color-ink)',
    borderRadius: '2px',
    transition: `transform var(--dur-normal) var(--ease-in-out),
                 opacity var(--dur-normal) var(--ease-in-out)`,
    transformOrigin: 'center',
  }
  if (open) {
    if (idx === 0) return { ...base, transform: 'translateY(7px) rotate(45deg)' }
    if (idx === 1) return { ...base, opacity: 0, transform: 'scaleX(0)' }
    if (idx === 2) return { ...base, transform: 'translateY(-7px) rotate(-45deg)' }
  }
  return base
}

/* ── Styles ───────────────────────────────────────────────────────────── */
const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'var(--color-paper-2)',
    borderBottom: '1px solid var(--color-border)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 'var(--width-content)',
    margin: '0 auto',
    padding: '0 var(--gutter)',
    height: 'var(--nav-height)',
    gap: 'var(--space-4)',
  },
  wordmark: {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-xl)',
    fontWeight: 'var(--weight-bold)',
    color: 'var(--color-ink)',
    letterSpacing: '-0.02em',
    flexShrink: 0,
  },
  centerLinks: {
    alignItems: 'center',
    gap: 'var(--space-2)',
  },
  navLink: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-medium)',
    color: 'var(--color-ink-2)',
    padding: 'var(--space-2) var(--space-3)',
    borderRadius: 'var(--radius-sm)',
    whiteSpace: 'nowrap',
    transition: `color var(--dur-fast) var(--ease-out),
                 background-color var(--dur-fast) var(--ease-out)`,
    display: 'inline-block',
  },
  navLinkActive: {
    color: 'var(--color-ink)',
    backgroundColor: 'var(--color-paper-3)',
  },
  rightDesk: {
    flexShrink: 0,
  },
  ctaBtn: {
    display: 'inline-block',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)',
    color: 'var(--color-paper)',
    backgroundColor: 'var(--color-accent)',
    padding: 'var(--space-2) var(--space-5)',
    borderRadius: 'var(--radius-sm)',
    whiteSpace: 'nowrap',
    transition: `background-color var(--dur-fast) var(--ease-out),
                 transform var(--dur-instant) var(--ease-out)`,
  },
  ctaBtnActive: {
    backgroundColor: 'var(--color-accent-dim)',
  },
  hamburger: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    width: '40px',
    height: '40px',
    background: 'none',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    flexShrink: 0,
    padding: 'var(--space-2)',
  },
  mobileMenu: {
    backgroundColor: 'var(--color-paper-2)',
    borderBottom: '1px solid var(--color-border)',
    overflow: 'hidden',
    maxHeight: 0,
    opacity: 0,
    transition: `max-height var(--dur-normal) var(--ease-out),
                 opacity var(--dur-normal) var(--ease-out)`,
  },
  mobileMenuOpen: {
    maxHeight: '260px',
    opacity: 1,
  },
  mobileLinks: {
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--space-4) var(--gutter-sm)',
    gap: 'var(--space-1)',
  },
  mobileLink: {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--weight-medium)',
    color: 'var(--color-ink-2)',
    padding: 'var(--space-3) var(--space-4)',
    borderRadius: 'var(--radius-sm)',
    display: 'block',
    whiteSpace: 'nowrap',
    transition: `color var(--dur-fast) var(--ease-out),
                 background-color var(--dur-fast) var(--ease-out)`,
  },
  mobileLinkActive: {
    color: 'var(--color-ink)',
    backgroundColor: 'var(--color-paper-3)',
  },
  backdrop: {
    position: 'fixed',
    inset: 0,
    top: 'var(--nav-height)',
    backgroundColor: 'var(--color-overlay)',
    zIndex: 98,
  },
}

export default Navbar
