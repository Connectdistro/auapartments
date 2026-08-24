import Reveal from './Reveal';
import { QualityIcon, InfoIcon, SupportIcon, KnowledgeIcon } from './icons';

const REASONS = [
  { icon: QualityIcon, title: 'Quality Properties', body: 'Well-maintained and inspected' },
  { icon: InfoIcon, title: 'Transparent Information', body: 'No hidden fees or surprises' },
  { icon: SupportIcon, title: 'Responsive Support', body: 'Quick & helpful communication' },
  { icon: KnowledgeIcon, title: 'Local Knowledge', body: 'Real insights, better living' },
];

export default function WhyUs() {
  return (
    <Reveal>
      <section className="why-us">
        <div className="why-us-row">
          {REASONS.map((item) => (
            <div className="why-us-item" key={item.title}>
              <item.icon size={22} className="why-us-icon" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
