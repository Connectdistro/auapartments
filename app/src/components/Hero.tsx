import { useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import WebGLBackground from './WebGLBackground';
import { getCities } from '../data/properties';
import { StarIcon, MapPinIcon, MailIcon, QualityIcon, CalendarIcon } from './icons';

const TRUST_ITEMS = [
  { icon: StarIcon, label: 'Quality Stays' },
  { icon: MapPinIcon, label: 'Prime Locations' },
  { icon: MailIcon, label: 'Easy Booking' },
  { icon: QualityIcon, label: 'Trusted & Secure' },
];

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Hero() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const cities = getCities();
  const wrapperRef = useRef<HTMLElement>(null);

  const [location, setLocation] = useState('any');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (location !== 'any') params.set('location', location);
    if (guests !== 'any') params.set('guests', guests);
    const query = params.toString();
    navigate(query ? `/apartments?${query}` : '/apartments');
  };

  return (
    <section className="hero-pin-wrapper" ref={wrapperRef}>
      <div className="hero-sticky">
        <motion.div className="hero-bg-wrap" style={{ scale: bgScale, opacity: bgOpacity }}>
          <WebGLBackground />
        </motion.div>
        <div className="hero-overlay" />

        <motion.div className="hero-content" style={{ opacity: contentOpacity, y: contentY }}>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0.08}>
            Find Your Next Place to Live
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.16}>
            Beautiful apartments and stays across Australia's most desirable cities.
          </motion.p>

          <motion.form
            className="hero-search"
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.24}
          >
            <label className="hero-search-field">
              <span>
                <MapPinIcon size={13} /> Where
              </span>
              <select value={location} onChange={(event) => setLocation(event.target.value)}>
                <option value="any">Anywhere in Australia</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
            <label className="hero-search-field">
              <span>
                <CalendarIcon size={13} /> Check-in
              </span>
              <input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} />
            </label>
            <label className="hero-search-field">
              <span>
                <CalendarIcon size={13} /> Check-out
              </span>
              <input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} />
            </label>
            <label className="hero-search-field">
              <span>Guests</span>
              <select value={guests} onChange={(event) => setGuests(event.target.value)}>
                {GUEST_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n} guest{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn-primary hero-search-submit">
              Search
            </button>
          </motion.form>

          <motion.div className="hero-trust-row" variants={fadeUp} initial="hidden" animate="show" custom={0.32}>
            {TRUST_ITEMS.map((item) => (
              <span key={item.label} className="hero-trust-item">
                <item.icon size={16} />
                {item.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="hero-scroll-hint" style={{ opacity: hintOpacity }} aria-hidden="true">
          ↓ Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
