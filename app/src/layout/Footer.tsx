import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { PhoneIcon, MailIcon, ArrowRightIcon, MapPinIcon } from '../components/icons';
import { CONTACT, SOCIAL_LINKS } from '../data/contact';
import { getCities } from '../data/properties';

const DISCOVER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/apartments', label: 'Stays' },
  { to: '/locations', label: 'Explore' },
  { to: '/host', label: 'Become a Host' },
  { to: '/about', label: 'About' },
];

const POLICY_LINKS = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-of-service', label: 'Terms of Service' },
  { to: '/refund-policy', label: 'Refund Policy' },
  { to: '/cancellation-policy', label: 'Cancellation Policy' },
];

export default function Footer() {
  const cities = getCities();

  return (
    <Reveal>
      <footer className="site-footer">
        <div className="site-footer-blob site-footer-blob-accent" aria-hidden="true" />
        <div className="site-footer-blob site-footer-blob-dark" aria-hidden="true" />

        <div className="site-footer-hero">
          <h2>
            Find your next
            <br />
            place to stay<span className="site-footer-dot">.</span>
          </h2>
        </div>

        <div className="site-footer-columns">
          <div className="site-footer-col">
            <span className="site-footer-heading">Popular Cities</span>
            {cities.map((city) => (
              <Link key={city} to={`/apartments?location=${encodeURIComponent(city)}`}>
                {city}
              </Link>
            ))}
            <Link to="/locations">All Locations</Link>
          </div>

          <div className="site-footer-col">
            <span className="site-footer-heading">Discover</span>
            {DISCOVER_LINKS.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="site-footer-col">
            <span className="site-footer-heading">Get in Touch</span>
            <a href={`tel:${CONTACT.phone}`} className="site-footer-contact-line">
              <PhoneIcon size={15} /> {CONTACT.phoneDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="site-footer-contact-line">
              <MailIcon size={15} /> {CONTACT.email}
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <span className="site-footer-contact-line">
              <MapPinIcon size={15} /> {CONTACT.city}
            </span>
          </div>

          <div className="site-footer-ctas">
            <Link to="/apartments" className="site-footer-cta-card">
              <strong>I want to book</strong>
              <span>
                Find your next stay <ArrowRightIcon size={14} />
              </span>
            </Link>
            <Link to="/host" className="site-footer-cta-card">
              <strong>I want to host</strong>
              <span>
                List your place on AUSTAY <ArrowRightIcon size={14} />
              </span>
            </Link>
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>
            © {new Date().getFullYear()} AUSTAY · {CONTACT.abn}
          </span>
          <nav className="site-footer-policies" aria-label="Policies">
            {POLICY_LINKS.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <a href={`tel:${CONTACT.phone}`} className="site-footer-phone-pill">
          <PhoneIcon size={16} /> {CONTACT.phoneDisplay}
        </a>
      </footer>
    </Reveal>
  );
}
