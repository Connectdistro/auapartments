import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import HostHeroSection from '../components/HostHeroSection';
import { BriefcaseIcon, CheckIcon, CalendarIcon } from '../components/icons';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const STEPS = [
  { icon: BriefcaseIcon, title: 'List your space', body: 'Add photos, pricing, and details about your apartment.' },
  { icon: CheckIcon, title: 'Get verified', body: 'Our team reviews your listing before it goes live.' },
  { icon: CalendarIcon, title: 'Start earning', body: 'Accept booking requests and welcome your first guests.' },
];

export default function HostPage() {
  useDocumentTitle(
    'Become a Host',
    'Turn your apartment into income. List your space, get verified, and start earning with AUSTAY.',
  );

  return (
    <div className="host-page">
      <HostHeroSection />

      <section className="host-steps-wrap">
        <Reveal>
          <div className="page-container">
            <div className="products-section-heading">
              <h2>How It Works</h2>
            </div>
            <div className="host-steps">
              {STEPS.map((step, index) => (
                <div className="host-step" key={step.title}>
                  <span className="host-step-number">{index + 1}</span>
                  <step.icon size={24} className="host-step-icon" />
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="become-host-cta page-container">
            <div className="final-cta">
              <CalendarIcon size={26} className="final-cta-icon" />
              <div className="final-cta-copy">
                <h2>Ready to List Your Place?</h2>
                <p>Get in touch and our team will help you get started.</p>
              </div>
              <Link to="/contact" className="btn-primary final-cta-button">
                Start Hosting →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
