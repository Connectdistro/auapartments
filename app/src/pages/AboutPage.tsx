import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { CONTACT } from '../data/contact';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ArrowRightIcon, CheckIcon, PhoneIcon, QualityIcon, HandshakeIcon, HeartIcon, LeafIcon } from '../components/icons';

const TIMELINE = [
  {
    stage: 'Getting Started',
    body: 'AUSTAY began with a simple idea: make finding a quality rental home in Australia easier, faster, and more personal.',
  },
  {
    stage: 'Expanding Our Reach',
    body: 'We grew from a small idea into a curated platform, connecting renters with apartments across Melbourne, Sydney, and Brisbane.',
  },
  {
    stage: 'Raising the Standard',
    body: "We'd rather list fewer apartments well than flood the page with filler — every listing is checked before it goes live and kept up to date.",
  },
  {
    stage: 'Today',
    body: 'We keep building on that same idea: clear, honest listings and a straightforward path from enquiry to inspection to application.',
  },
];

const MISSION_POINTS = [
  'Curated quality apartments',
  'Transparent and honest service',
  'Renter-first approach',
  'Support every step of the way',
];

const VALUES = [
  { icon: QualityIcon, title: 'Quality', body: 'We partner with the best to deliver exceptional homes.' },
  { icon: HandshakeIcon, title: 'Integrity', body: 'Honest, transparent and always acting in your best interest.' },
  { icon: HeartIcon, title: 'Community', body: 'Building better neighbourhoods and connections.' },
  { icon: LeafIcon, title: 'Sustainability', body: 'We care about the planet and a better future.' },
];

export default function AboutPage() {
  useDocumentTitle(
    'About',
    "Learn about AUSTAY's mission to make finding a quality rental home in Australia easier, faster, and more personal.",
  );

  return (
    <div className="about-page">
      <PageHero
        eyebrow="About AUSTAY"
        title="More Than Apartments. Better Living."
        subtitle="At AUSTAY, we believe renting is more than finding a place to live — it's about finding a place that feels like home."
        size="large"
      >
        <Link to="/apartments" className="btn-primary about-hero-cta">
          Find Your Next Apartment <ArrowRightIcon size={16} />
        </Link>
      </PageHero>
      <div className="page-hero-divider" />

      <Reveal className="about-history page-container">
        <div className="about-history-text">
          <span className="eyebrow">Our Story</span>
          <h2>Our History</h2>
          <p>
            AUSTAY was founded with a simple idea: to make finding a quality rental home in Australia easier,
            faster, and more personal.
          </p>
          <p>
            From a small team with a passion for property and design, we've grown into a platform connecting renters
            with exceptional apartments in the country's most desirable locations.
          </p>
          <div className="about-history-media">
            <ImagePlaceholder label="Melbourne skyline" />
          </div>
        </div>

        <ol className="about-timeline">
          {TIMELINE.map((item) => (
            <li key={item.stage}>
              <span className="about-timeline-marker" aria-hidden="true" />
              <h3>{item.stage}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="about-mission page-container">
        <div className="about-mission-content">
          <span className="eyebrow">Our Mission</span>
          <h2>Creating Places People Love</h2>
          <p>
            We're here to make renting better. By combining local expertise, beautiful properties, and a human-first
            approach, we help people find not just a place, but a lifestyle.
          </p>
          <ul className="about-mission-list">
            {MISSION_POINTS.map((point) => (
              <li key={point}>
                <CheckIcon size={16} /> {point}
              </li>
            ))}
          </ul>

          <div className="about-mission-media">
            <ImagePlaceholder label="Apartment living room" />
            <blockquote className="about-pull-quote">
              "We don't just list apartments. We match people with places where life happens."
            </blockquote>
          </div>
        </div>

        <aside className="about-floating-cta">
          <h3>Ready to find your perfect home?</h3>
          <p>Let our team help you discover apartments that suit your lifestyle and needs.</p>
          <Link to="/apartments" className="btn-primary">
            Enquire Now <ArrowRightIcon size={16} />
          </Link>
          <a href={`tel:${CONTACT.phone}`} className="btn-secondary">
            <PhoneIcon size={15} /> Call Us
          </a>
        </aside>
      </Reveal>

      <Reveal className="about-values page-container">
        <span className="eyebrow">What We Stand For</span>
        <div className="about-values-row">
          {VALUES.map((value) => (
            <div className="about-value-item" key={value.title}>
              <value.icon size={22} />
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
