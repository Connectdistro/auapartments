import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import WebGLBackground from './WebGLBackground';
import { getCities, type PropertyType } from '../data/properties';
import { StarIcon, MapPinIcon, MailIcon, QualityIcon } from './icons';

type PriceBand = 'any' | 'under-500' | '500-800' | '800-1200' | '1200-plus';
type PropertyTypeFilter = 'any' | PropertyType;
type FurnishedFilter = 'any' | 'furnished' | 'unfurnished';

const TRUST_ITEMS = [
  { icon: StarIcon, label: 'Quality Properties' },
  { icon: MapPinIcon, label: 'Prime Locations' },
  { icon: MailIcon, label: 'Easy Enquiries' },
  { icon: QualityIcon, label: 'Trusted & Secure' },
];

export default function Hero() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const cities = getCities();

  const [location, setLocation] = useState('any');
  const [propertyType, setPropertyType] = useState<PropertyTypeFilter>('any');
  const [bedrooms, setBedrooms] = useState('any');
  const [priceBand, setPriceBand] = useState<PriceBand>('any');
  const [furnished, setFurnished] = useState<FurnishedFilter>('any');

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
    if (propertyType !== 'any') params.set('propertyType', propertyType);
    if (bedrooms !== 'any') params.set('bedrooms', bedrooms);
    if (priceBand === 'under-500') params.set('maxPrice', '500');
    else if (priceBand === '500-800') {
      params.set('minPrice', '500');
      params.set('maxPrice', '800');
    } else if (priceBand === '800-1200') {
      params.set('minPrice', '800');
      params.set('maxPrice', '1200');
    } else if (priceBand === '1200-plus') params.set('minPrice', '1200');
    if (furnished !== 'any') params.set('furnished', furnished);
    const query = params.toString();
    navigate(query ? `/apartments?${query}` : '/apartments');
  };

  return (
    <section className="hero">
      <WebGLBackground />
      <div className="hero-overlay" />

      <div className="hero-content">
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0.08}>
          Find Your Perfect Apartment
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.16}>
          Premium apartments in Australia's most desirable locations.
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
              <MapPinIcon size={13} /> Location
            </span>
            <select value={location} onChange={(event) => setLocation(event.target.value)}>
              <option value="any">Any location</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
          <label className="hero-search-field">
            <span>Property Type</span>
            <select value={propertyType} onChange={(event) => setPropertyType(event.target.value as PropertyTypeFilter)}>
              <option value="any">Any type</option>
              <option value="Apartment">Apartment</option>
              <option value="Unit">Unit</option>
              <option value="Townhouse">Townhouse</option>
              <option value="House">House</option>
            </select>
          </label>
          <label className="hero-search-field">
            <span>Bedrooms</span>
            <select value={bedrooms} onChange={(event) => setBedrooms(event.target.value)}>
              <option value="any">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </label>
          <label className="hero-search-field">
            <span>Price Range</span>
            <select value={priceBand} onChange={(event) => setPriceBand(event.target.value as PriceBand)}>
              <option value="any">Any</option>
              <option value="under-500">Under $500/wk</option>
              <option value="500-800">$500 – $800/wk</option>
              <option value="800-1200">$800 – $1,200/wk</option>
              <option value="1200-plus">$1,200+/wk</option>
            </select>
          </label>
          <label className="hero-search-field">
            <span>Furnished</span>
            <select value={furnished} onChange={(event) => setFurnished(event.target.value as FurnishedFilter)}>
              <option value="any">Any</option>
              <option value="furnished">Furnished</option>
              <option value="unfurnished">Unfurnished</option>
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
      </div>
    </section>
  );
}
