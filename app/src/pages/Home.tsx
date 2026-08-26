import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import WhyUs from '../components/WhyUs';
import Neighbourhoods from '../components/Neighbourhoods';
import BecomeHost from '../components/BecomeHost';
import LocationCard from '../components/LocationCard';
import Reveal from '../components/Reveal';
import { PROPERTIES } from '../data/properties';
import { POPULAR_LOCATIONS } from '../data/locations';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const RoomViewer = lazy(() => import('../components/RoomViewer'));

export default function Home() {
  useDocumentTitle('Find Your Next Place to Live');
  const featured = PROPERTIES.filter((property) => property.featured).slice(0, 4);

  return (
    <>
      <Hero />

      <Reveal>
        <section className="products-section">
          <div className="products-section-heading">
            <span className="eyebrow">Explore Australia</span>
            <h2>Find your next stay in Australia's most desirable cities</h2>
          </div>
          <div className="locations-grid">
            {POPULAR_LOCATIONS.map((location) => {
              const count = PROPERTIES.filter((property) => property.city === location.city).length;
              return <LocationCard key={location.city} city={location.city} state={location.state} count={count} />;
            })}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="products-section">
          <div className="products-section-heading">
            <h2>Featured Stays</h2>
            <Link to="/apartments">View all →</Link>
          </div>
          <div className="featured-stays-grid">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} layout="editorial" />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="products-section">
          <div className="room-viewer-heading">
            <span className="eyebrow">See It Differently</span>
            <h2>Explore the space before you arrive</h2>
          </div>
          <Suspense fallback={<div className="room-viewer-loading">Loading 3D view…</div>}>
            <RoomViewer />
          </Suspense>
        </section>
      </Reveal>

      <WhyUs />

      <Neighbourhoods />

      <BecomeHost />
    </>
  );
}
