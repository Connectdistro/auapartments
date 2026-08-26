import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';
import { PROPERTIES } from '../data/properties';

const NEIGHBOURHOODS = Array.from(
  new Map(PROPERTIES.map((p) => [p.suburb, { suburb: p.suburb, city: p.city }])).values(),
);

const SUBURB_IMAGES: Record<string, string> = {
  Southbank: '/neighbourhoods/southbank.png',
  'Circular Quay': '/neighbourhoods/circular-quay.png',
  'Fortitude Valley': '/neighbourhoods/fortitude-valley.png',
  'East Melbourne': '/neighbourhoods/east-melbourne.png',
  'Bondi Beach': '/neighbourhoods/bondi-beach.png',
  'New Farm': '/neighbourhoods/new-farm.png',
  Docklands: '/neighbourhoods/docklands.png',
  Kirribilli: '/neighbourhoods/kirribilli.png',
};

function usePinnedScroll() {
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 860px)');
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return pinned;
}

export default function Neighbourhoods() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const pinned = usePinnedScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['2%', '-72%']);

  return (
    <section className={`neighbourhoods-pin-wrapper${pinned ? '' : ' is-static'}`} ref={ref}>
      <div className="neighbourhoods-sticky">
        <div className="neighbourhoods-heading page-container">
          <span className="eyebrow">Discover</span>
          <h2>Discover the Neighbourhood</h2>
        </div>
        <motion.div className="neighbourhoods-track" style={pinned ? { x } : undefined}>
          {NEIGHBOURHOODS.map((n) => (
            <Link
              key={n.suburb}
              to={`/apartments?location=${encodeURIComponent(n.city)}`}
              className="neighbourhood-card"
            >
              <ImagePlaceholder label={`${n.suburb} street`} src={SUBURB_IMAGES[n.suburb]} />
              <div className="neighbourhood-card-scrim" />
              <div className="neighbourhood-card-body">
                <h3>{n.suburb}</h3>
                <p>{n.city}</p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
