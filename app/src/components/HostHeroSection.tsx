import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import WebGLBackground from './WebGLBackground';
import { HandshakeIcon, ShieldIcon, SupportIcon, LeafIcon } from './icons';

const WHY_HOST = [
  { icon: HandshakeIcon, title: 'Trusted Guests', body: 'Every guest is verified before they can book your place.' },
  { icon: ShieldIcon, title: 'Secure Payments', body: 'Get paid securely with no chasing invoices or deposits.' },
  { icon: SupportIcon, title: '24/7 Support', body: 'Our team is on hand whenever you or your guests need help.' },
  { icon: LeafIcon, title: 'Full Control', body: 'Set your own price, availability, and house rules.' },
];

/** One continuous pinned section — a single WebGL background carries the
 * visitor from the hero copy through to the "Why Host" content, instead of
 * mounting a separate 3D canvas per chapter. */
export default function HostHeroSection() {
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end end'] });
  // Scroll progress extrapolates past [0, 1] once the wrapper's end edge has
  // passed the viewport's end edge — clamp it before deriving anything else,
  // otherwise every downstream transform keeps extrapolating past its range too.
  const scrollYProgress = useTransform(rawProgress, [0, 1], [0, 1]);

  const bgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.4]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 20]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [0.6, 1, 0.5]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.32, 0.4], reduced ? [1, 1, 0] : [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], reduced ? [0, 0] : [0, -60]);

  const whyOpacity = useTransform(
    scrollYProgress,
    [0.42, 0.5, 0.9, 1],
    reduced ? [1, 1, 1, 1] : [0, 1, 1, 0],
  );
  const whyY = useTransform(scrollYProgress, [0.42, 0.5, 1], reduced ? [0, 0, 0] : [40, 0, -40]);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 22 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.3 : 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="host-hero-pin-wrapper" ref={wrapperRef}>
      <div className="host-hero-sticky">
        <motion.div className="hero-bg-wrap" style={{ scale: bgScale, rotate: bgRotate, opacity: bgOpacity }}>
          <WebGLBackground variant="bloom" />
        </motion.div>
        <div className="hero-overlay" />

        <motion.div className="hero-content host-hero-chapter" style={{ opacity: heroOpacity, y: heroY }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.08}>
            <span className="eyebrow">Hosting</span>
            <h1>Become an AUSTAY Host</h1>
          </motion.div>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.16}>
            Turn your apartment into income. Join hosts across Australia earning from short stays.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.24}>
            <Link to="/contact" className="btn-primary">
              Start Hosting →
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="host-why-content host-hero-chapter"
          style={{ opacity: whyOpacity, y: whyY }}
        >
          <h2>Why Host With AUSTAY</h2>
          <div className="host-why-row">
            {WHY_HOST.map((item) => (
              <div className="host-why-item" key={item.title}>
                <item.icon size={22} className="host-why-item-icon" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
