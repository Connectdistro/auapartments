import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import ImagePlaceholder from './ImagePlaceholder';
import { CalendarIcon } from './icons';

export default function BecomeHost() {
  return (
    <div className="become-host-wrap">
      <Reveal>
        <section className="become-host">
          <div className="become-host-copy">
            <span className="eyebrow">Hosting</span>
            <h2>Have a Place in Australia?</h2>
            <p>
              Turn your apartment into income. List your space on AUSTAY and reach guests looking for their next
              stay.
            </p>
            <Link to="/host" className="btn-primary">
              Start Hosting →
            </Link>
          </div>
          <div className="become-host-media">
            <ImagePlaceholder label="Your apartment, hosted" src="/become-host.png" />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <div className="become-host-cta">
          <div className="final-cta">
            <CalendarIcon size={26} className="final-cta-icon" />
            <div className="final-cta-copy">
              <h2>Your Next Home Is Waiting</h2>
              <p>Start exploring Australia's best stays today.</p>
            </div>
            <Link to="/apartments" className="btn-primary final-cta-button">
              Explore Apartments →
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
