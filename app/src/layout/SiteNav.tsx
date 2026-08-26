import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import LogoMark from '../components/LogoMark';
import { HeartIcon, ChevronDownIcon } from '../components/icons';
import { useAuth } from '../hooks/useAuth';

const NAV_INDICATOR_SPRING = { type: 'spring', stiffness: 380, damping: 34 } as const;
const PANEL_SPRING = { type: 'spring', stiffness: 320, damping: 34 } as const;

const LINKS = [
  { to: '/locations', label: 'Explore', end: false },
  { to: '/apartments', label: 'Stays', end: false },
  { to: '/host', label: 'Become a Host', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const handleSignOut = () => {
    signOut();
    setMenuOpen(false);
    navigate('/');
  };

  const handleMobileSignOut = () => {
    signOut();
    setMobileOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
        <Link to="/" className="site-nav-logo">
          <LogoMark />
          AUSTAY
        </Link>

        <nav className="site-nav-links" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive ? (
                    <motion.span
                      className="site-nav-link-indicator"
                      layoutId="site-nav-link-indicator"
                      transition={reduced ? { duration: 0 } : NAV_INDICATOR_SPRING}
                    />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="site-nav-actions">
          <Link to="/saved" className="site-nav-saved" aria-label="Saved stays">
            <HeartIcon size={19} />
          </Link>

          {user ? (
            <div className="site-nav-user" ref={menuRef}>
              <button type="button" className="site-nav-user-btn" onClick={() => setMenuOpen((open) => !open)}>
                {user.name.split(' ')[0]}
                <ChevronDownIcon size={14} className={menuOpen ? 'is-open' : ''} />
              </button>
              {menuOpen ? (
                <div className="site-nav-user-menu" role="menu">
                  <Link to="/saved" role="menuitem" onClick={() => setMenuOpen(false)}>
                    Saved stays
                  </Link>
                  <button type="button" role="menuitem" onClick={handleSignOut}>
                    Sign out
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link to="/sign-in" className="btn-primary site-nav-cta">
              Sign in
            </Link>
          )}
        </div>
      </header>

      <header className={`site-nav-mobile${scrolled ? ' is-scrolled' : ''}`}>
        <Link to="/" className="site-nav-logo" onClick={() => setMobileOpen(false)}>
          <LogoMark />
          AUSTAY
        </Link>

        <button
          type="button"
          className={`hamburger-btn${mobileOpen ? ' is-open' : ''}`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu-panel"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.1 : 0.25 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              id="mobile-menu-panel"
              className="mobile-menu-panel"
              aria-label="Mobile"
              onClick={(event) => event.stopPropagation()}
              initial={{ x: reduced ? 0 : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: reduced ? 0 : '100%' }}
              transition={reduced ? { duration: 0.1 } : PANEL_SPRING}
            >
              <ul className="mobile-menu-links">
                {LINKS.map((link, index) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: reduced ? 0 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduced ? 0 : 0.08 + index * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) => (isActive ? 'is-active' : '')}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mobile-menu-divider" />

              {user ? (
                <div className="mobile-menu-account">
                  <span>Hi, {user.name.split(' ')[0]}</span>
                  <button type="button" onClick={handleMobileSignOut}>
                    Sign out
                  </button>
                </div>
              ) : (
                <Link to="/sign-in" className="btn-primary mobile-menu-cta" onClick={() => setMobileOpen(false)}>
                  Sign in
                </Link>
              )}
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
