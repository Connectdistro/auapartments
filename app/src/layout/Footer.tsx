import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import LogoMark from '../components/LogoMark';
import { PhoneIcon, MailIcon, FacebookIcon, InstagramIcon, LinkedinIcon, ArrowRightIcon } from '../components/icons';
import { CONTACT, SOCIAL_LINKS } from '../data/contact';
import { getCities } from '../data/properties';

const POLICY_LINKS = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-of-service', label: 'Terms of Service' },
  { to: '/refund-policy', label: 'Refund Policy' },
  { to: '/shipping-policy', label: 'Shipping Policy' },
  { to: '/cancellation-policy', label: 'Cancellation Policy' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Footer() {
  const cities = getCities();
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <Reveal>
      <footer className="site-footer">
        <div className="site-footer-columns">
          <div className="site-footer-brand">
            <Link to="/" className="site-footer-word">
              <LogoMark />
              AuApartments
            </Link>
            <p>Premium apartment living in Australia.</p>
            <div className="site-footer-social">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="AuApartments on Facebook">
                <FacebookIcon size={16} />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="AuApartments on Instagram">
                <InstagramIcon size={16} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="AuApartments on LinkedIn">
                <LinkedinIcon size={16} />
              </a>
              <a href={`mailto:${CONTACT.email}`} aria-label="Email AuApartments">
                <MailIcon size={16} />
              </a>
            </div>
          </div>

          <div className="site-footer-col">
            <span className="site-footer-heading">Properties</span>
            <Link to="/apartments">All Apartments</Link>
            <Link to="/apartments?availability=available">Available Now</Link>
            <Link to="/apartments?featured=true">Featured</Link>
          </div>

          <div className="site-footer-col">
            <span className="site-footer-heading">Locations</span>
            {cities.map((city) => (
              <Link key={city} to={`/apartments?location=${encodeURIComponent(city)}`}>
                {city}
              </Link>
            ))}
            <Link to="/locations">All Locations</Link>
          </div>

          <div className="site-footer-col">
            <span className="site-footer-heading">Contact</span>
            <a href={`tel:${CONTACT.phone}`} className="site-footer-contact-line">
              <PhoneIcon size={15} /> {CONTACT.phoneDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="site-footer-contact-line">
              <MailIcon size={15} /> {CONTACT.email}
            </a>
            <span>{CONTACT.city}</span>
          </div>

          <div className="site-footer-col">
            <span className="site-footer-heading">Stay Updated</span>
            <p className="site-footer-newsletter-lead">Subscribe to hear about new apartments and exclusive offers.</p>
            {subscribed ? (
              <span className="site-footer-newsletter-confirm">Subscribed ✓</span>
            ) : (
              <form className="site-footer-newsletter" onSubmit={handleSubscribe}>
                <input type="email" required placeholder="Enter your email address" aria-label="Email address" />
                <button type="submit" aria-label="Subscribe">
                  <ArrowRightIcon size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>
            © {new Date().getFullYear()} AuApartments · {CONTACT.abn}
          </span>
          <nav className="site-footer-policies" aria-label="Policies">
            {POLICY_LINKS.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </Reveal>
  );
}
