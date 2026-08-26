import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import LogoMark from '../components/LogoMark';
import { HeartIcon, ChevronDownIcon } from '../components/icons';
import { useAuth } from '../hooks/useAuth';

const NAV_INDICATOR_SPRING = { type: 'spring', stiffness: 380, damping: 34 } as const;

const LINKS = [
  { to: '/locations', label: 'Explore', end: false },
  { to: '/apartments', label: 'Stays', end: false },
  { to: '/host', label: 'Become a Host', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
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

  const handleSignOut = () => {
    signOut();
    setMenuOpen(false);
    navigate('/');
  };

  return (
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
  );
}
