import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT, HEAD_OFFICE, OFFICE_HOURS, OTHER_OFFICES } from '../data/contact';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import {
  ChatIcon,
  SupportIcon,
  ShieldIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  LockIcon,
  BuildingIcon,
  ArrowRightIcon,
} from '../components/icons';

const TRUST_ITEMS = [
  { icon: ChatIcon, title: 'Quick Responses', body: 'We aim to reply within 24 hours' },
  { icon: SupportIcon, title: 'Expert Support', body: 'Our team knows our apartments inside out' },
  { icon: ShieldIcon, title: 'Trusted & Local', body: 'Proudly helping renters across Australia' },
];

const ENQUIRY_TYPES = ['General enquiry', 'Book an inspection', 'Application support', 'Existing tenancy', 'Other'];

export default function ContactPage() {
  useDocumentTitle('Contact');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${CONTACT.businessName}, ${HEAD_OFFICE.addressLines.join(', ')}`,
  )}`;

  return (
    <div className="contact-page">
      <PageHero
        eyebrow="Contact"
        title="We're Here to Help"
        subtitle="Have a question about our apartments or need assistance with your enquiry? Get in touch with our friendly team."
        size="large"
        bgVariant="network"
      >
        <a href="#contact-form" className="btn-primary">
          Send a Message →
        </a>
      </PageHero>
      <div className="page-hero-divider" />

      <Reveal className="contact-trust-row page-container">
        {TRUST_ITEMS.map((item) => (
          <div className="contact-trust-item" key={item.title}>
            <item.icon size={22} />
            <span>{item.title}</span>
            <p>{item.body}</p>
          </div>
        ))}
      </Reveal>

      <div className="contact-quick-section page-container">
        <Reveal className="contact-quick-media">
          <ImagePlaceholder label="AUSTAY office" src="/contact-office.png" />
        </Reveal>

        <Reveal className="contact-quick-card" delay={0.1}>
          <div className="contact-quick-item">
            <PhoneIcon size={18} />
            <div>
              <strong>Call Us</strong>
              <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
              <span>{OFFICE_HOURS.weekdays}</span>
            </div>
          </div>
          <div className="contact-quick-item">
            <MailIcon size={18} />
            <div>
              <strong>Email Us</strong>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <span>We'll respond within 24 hours</span>
            </div>
          </div>
          <div className="contact-quick-item">
            <ChatIcon size={18} />
            <div>
              <strong>Live Chat</strong>
              <a href="#contact-form">Start a conversation →</a>
              <span>{OFFICE_HOURS.weekdays}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="contact-main-grid page-container">
        <Reveal className="contact-form-card" id="contact-form">
          <h2>Send Us a Message</h2>
          <p className="contact-form-lead">Fill out the form below and we'll get back to you as soon as possible.</p>

          {submitted ? (
            <div className="modal-success">
              <h3>Message sent</h3>
              <p>Thanks for reaching out — we'll get back to you shortly.</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="enquiry-form-row">
                  <label>
                    Full Name *
                    <input required placeholder="Your full name" />
                  </label>
                  <label>
                    Email Address *
                    <input required type="email" placeholder="you@example.com" />
                  </label>
                </div>
                <div className="enquiry-form-row">
                  <label>
                    Phone Number
                    <input type="tel" placeholder="0400 000 000" />
                  </label>
                  <label>
                    Enquiry Type *
                    <select required defaultValue="">
                      <option value="" disabled>
                        Select an enquiry type
                      </option>
                      {ENQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label>
                  Subject *
                  <input required placeholder="How can we help?" />
                </label>
                <label>
                  Message *
                  <textarea required rows={4} placeholder="Type your message here..." />
                </label>
                <div className="contact-form-footer">
                  <button type="submit" className="btn-primary">
                    Send Message →
                  </button>
                  <span className="contact-form-secure">
                    <LockIcon size={13} /> Your information is secure and will never be shared.
                  </span>
                </div>
              </form>
            </>
          )}
        </Reveal>

        <div className="contact-sidebar">
          <div className="contact-sidebar-sticky">
            <Reveal className="contact-info-panel" delay={0.08}>
              <h2>Contact Information</h2>
              <div className="contact-info-row">
                <MapPinIcon size={17} />
                <div>
                  <strong>Head Office</strong>
                  {HEAD_OFFICE.addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              </div>
              <div className="contact-info-row">
                <PhoneIcon size={17} />
                <div>
                  <strong>Phone</strong>
                  <span>{CONTACT.phoneDisplay}</span>
                </div>
              </div>
              <div className="contact-info-row">
                <MailIcon size={17} />
                <div>
                  <strong>Email</strong>
                  <span>{CONTACT.email}</span>
                </div>
              </div>
              <div className="contact-info-row">
                <ClockIcon size={17} />
                <div>
                  <strong>Office Hours</strong>
                  <span>{OFFICE_HOURS.weekdays}</span>
                  <span>{OFFICE_HOURS.weekend}</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="contact-map-panel" delay={0.16}>
              <div className="location-map-thumb">
                <ImagePlaceholder label="Head office map" />
              </div>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-secondary contact-directions-btn">
                Get Directions
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="contact-offices-row page-container">
        <Reveal className="contact-offices-heading">
          <h2>Other Office Locations</h2>
          <p>We have team members across Australia to help you find your next home.</p>
        </Reveal>
        <div className="contact-offices-grid">
          {OTHER_OFFICES.map((office, index) => (
            <Reveal key={office.city} delay={index * 0.08}>
              <div className="contact-office-card">
                <BuildingIcon size={22} />
                <div>
                  <strong>{office.city}</strong>
                  {office.addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                  <Link to={`/apartments?location=${encodeURIComponent(office.city)}`}>
                    View Apartments <ArrowRightIcon size={12} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="contact-closing-cta-wrap page-container">
        <Reveal className="final-cta">
          <ChatIcon size={26} className="final-cta-icon" />
          <div className="final-cta-copy">
            <h2>Still Have Questions?</h2>
            <p>Our team typically responds within 24 hours — reach out any time.</p>
          </div>
          <a href="#contact-form" className="btn-primary final-cta-button">
            Send a Message →
          </a>
        </Reveal>
      </div>
    </div>
  );
}
