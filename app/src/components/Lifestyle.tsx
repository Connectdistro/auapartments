import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';

export default function Lifestyle() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-36, 36]);

  return (
    <section className="lifestyle-section" ref={ref}>
      <motion.div style={{ y }} className="lifestyle-media">
        <ImagePlaceholder label="Coastal skyline at dusk" />
      </motion.div>
      <div className="lifestyle-overlay" />

      <div className="lifestyle-content">
        <span className="eyebrow">Lifestyle</span>
        <h2>Live Where Life Happens</h2>
        <p>
          From vibrant city precincts to relaxed coastal neighbourhoods, find the perfect location to call home.
        </p>
        <Link to="/locations" className="btn-primary">
          Explore Locations
        </Link>
      </div>
    </section>
  );
}
