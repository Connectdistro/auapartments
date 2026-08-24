import { Link, NavLink } from 'react-router-dom';
import LogoMark from '../components/LogoMark';
import { HeartIcon } from '../components/icons';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/apartments', label: 'Apartments', end: false },
  { to: '/locations', label: 'Locations', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

export default function SiteNav() {
  return (
    <header className="site-nav">
      <Link to="/" className="site-nav-logo">
        <LogoMark />
        AuApartments
      </Link>

      <nav className="site-nav-links" aria-label="Primary">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="site-nav-actions">
        <Link to="/saved" className="site-nav-saved" aria-label="Saved apartments">
          <HeartIcon size={19} />
        </Link>
        <Link to="/contact" className="btn-primary site-nav-cta">
          Enquire Now
        </Link>
      </div>
    </header>
  );
}
