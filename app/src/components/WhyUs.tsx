import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import { QualityIcon, InfoIcon, SupportIcon, KnowledgeIcon } from './icons';

const REASONS = [
  { icon: QualityIcon, title: 'Verified Stays', body: 'Every listing is checked before it goes live' },
  { icon: InfoIcon, title: 'Transparent Pricing', body: 'No hidden fees or surprises at checkout' },
  { icon: SupportIcon, title: 'Responsive Support', body: 'Quick & helpful communication, day or night' },
  { icon: KnowledgeIcon, title: 'Local Knowledge', body: 'Real insights from people who know the area' },
];

const STATS: { to: number; decimals?: number; suffix: string; label: string }[] = [
  { to: 10, suffix: 'K+', label: 'Homes' },
  { to: 2.4, decimals: 1, suffix: 'K', label: 'Hosts' },
  { to: 98, suffix: '%', label: 'Verified' },
];

function Counter({
  to,
  decimals = 0,
  suffix,
  replay,
}: {
  to: number;
  decimals?: number;
  suffix: string;
  /** Bump this to re-run the count-up — used to replay it on hover. */
  replay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const duration = 2600;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(to * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, replay]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function WhyUs() {
  const [replayKeys, setReplayKeys] = useState<number[]>(() => STATS.map(() => 0));

  const replay = (index: number) => {
    setReplayKeys((prev) => prev.map((key, i) => (i === index ? key + 1 : key)));
  };

  return (
    <Reveal>
      <section className="why-us">
        <div className="stats-heading">
          <span className="eyebrow">Why AUSTAY</span>
          <h2>Everything You Need In One Place</h2>
        </div>

        <div className="stats-row">
          {STATS.map((stat, index) => (
            <div className="stat-item" key={stat.label} onMouseEnter={() => replay(index)}>
              <h3>
                <Counter to={stat.to} decimals={stat.decimals} suffix={stat.suffix} replay={replayKeys[index]} />
              </h3>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

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
