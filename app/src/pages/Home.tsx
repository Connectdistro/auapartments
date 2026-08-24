import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import WhyUs from '../components/WhyUs';
import Lifestyle from '../components/Lifestyle';
import LocationCard from '../components/LocationCard';
import Reveal from '../components/Reveal';
import { CalendarIcon } from '../components/icons';
import { getCities, PROPERTIES } from '../data/properties';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Find Your Perfect Apartment');
  const featured = PROPERTIES.filter((property) => property.featured);
  const cities = getCities();

  return (
    <>
      <Hero />

      <section className="products-section">
        <div className="products-section-heading">
          <h2>Featured Apartments</h2>
          <Link to="/apartments">View all apartments →</Link>
        </div>
        <div className="products-grid">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <Lifestyle />

      <WhyUs />

      <Reveal>
        <section className="locations-teaser">
          <div className="products-section-heading">
            <h2>Featured Locations</h2>
          </div>
          <div className="locations-grid">
            {cities.map((city) => {
              const count = PROPERTIES.filter((property) => property.city === city).length;
              const state = PROPERTIES.find((property) => property.city === city)?.state;
              return <LocationCard key={city} city={city} state={state} count={count} />;
            })}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="final-cta-wrap page-container">
          <div className="final-cta">
            <CalendarIcon size={26} className="final-cta-icon" />
            <div className="final-cta-copy">
              <h2>Ready to Find Your Next Apartment?</h2>
              <p>Get in touch today and take the first step towards your new home.</p>
            </div>
            <Link to="/contact" className="btn-primary final-cta-button">
              Enquire Now →
            </Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}
