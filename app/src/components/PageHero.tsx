import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import WebGLBackground from './WebGLBackground';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  size?: 'default' | 'large';
  /** Swap the hero's WebGL background for a themed variant (see WebGLBackground). */
  bgVariant?: 'particles' | 'network' | 'routes' | 'skyline' | 'bloom';
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  size = 'default',
  bgVariant = 'particles',
}: PageHeroProps) {
  const reduced = useReducedMotion();

  if (size === 'large') {
    return (
      <LargePageHero eyebrow={eyebrow} title={title} subtitle={subtitle} reduced={reduced} bgVariant={bgVariant}>
        {children}
      </LargePageHero>
    );
  }

  return (
    <section className="page-hero-band">
      <div className="page-hero-band-bg">
        <WebGLBackground variant={bgVariant} />
      </div>
      <div className="page-hero-band-overlay" />

      <motion.div
        className="page-hero-band-content page-container"
        initial={{ opacity: 0, y: reduced ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
        {children}
      </motion.div>
    </section>
  );
}

interface LargePageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  reduced: boolean | null;
  bgVariant: 'particles' | 'network' | 'routes' | 'skyline' | 'bloom';
}

/** Large hero variant — same pinned scroll-scrub behavior as the homepage hero
 * (background zooms/fades and content eases out while the section stays
 * pinned for an extra scroll length), just with prop-driven content. */
function LargePageHero({ eyebrow, title, subtitle, children, reduced, bgVariant }: LargePageHeroProps) {
  const wrapperRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.25]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6, 1], reduced ? [1, 1, 1] : [1, 0.6, 0.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], reduced ? [1, 1] : [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], reduced ? [0, 0] : [0, -60]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], reduced ? [0, 0] : [1, 0]);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 22 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.3 : 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="hero-pin-wrapper" ref={wrapperRef}>
      <div className="hero-sticky">
        <motion.div className="hero-bg-wrap" style={{ scale: bgScale, opacity: bgOpacity }}>
          <WebGLBackground variant={bgVariant} />
        </motion.div>
        <div className="hero-overlay" />

        <motion.div className="hero-content" style={{ opacity: contentOpacity, y: contentY }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.08}>
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <h1>{title}</h1>
          </motion.div>
          {subtitle ? (
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.16}>
              {subtitle}
            </motion.p>
          ) : null}
          {children ? (
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.24}>
              {children}
            </motion.div>
          ) : null}
        </motion.div>

        <motion.div className="hero-scroll-hint" style={{ opacity: hintOpacity }} aria-hidden="true">
          ↓ Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
