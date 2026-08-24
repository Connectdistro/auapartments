import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROPERTIES, type PropertyType } from '../data/properties';
import { POPULAR_LOCATIONS } from '../data/locations';
import Reveal from '../components/Reveal';
import LocationCard from '../components/LocationCard';
import LocationsMapPanel from '../components/LocationsMapPanel';
import { BriefcaseIcon, CoffeeIcon, CarIcon, ShieldIcon, MapPinIcon, BellIcon } from '../components/icons';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type PriceBand = 'any' | 'under-500' | '500-800' | '800-1200' | '1200-plus';
type PropertyTypeFilter = 'any' | PropertyType;

const WHY_LOCATION = [
  {
    icon: BriefcaseIcon,
    title: 'Live Close to What Matters',
    body: 'Shorter commutes, more time for the things you love.',
  },
  {
    icon: CoffeeIcon,
    title: 'Local Lifestyle',
    body: 'Discover cafes, parks, restaurants and culture on your doorstep.',
  },
  {
    icon: CarIcon,
    title: 'Transport & Connectivity',
    body: 'Easy access to public transport and major road networks.',
  },
  {
    icon: ShieldIcon,
    title: 'Safe & Desirable Areas',
    body: "Carefully selected neighbourhoods you'll love to call home.",
  },
];

export default function LocationsPage() {
  useDocumentTitle('Locations');
  const navigate = useNavigate();

  const [location, setLocation] = useState('any');
  const [propertyType, setPropertyType] = useState<PropertyTypeFilter>('any');
  const [priceBand, setPriceBand] = useState<PriceBand>('any');
  const [bedrooms, setBedrooms] = useState('any');
  const [notifyRequested, setNotifyRequested] = useState(false);

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
    const query = params.toString();
    navigate(query ? `/apartments?${query}` : '/apartments');
  };

  return (
    <div className="locations-page">
      <div className="page-hero">
        <h1>Find Your New Neighbourhood</h1>
        <p>Explore premium apartments in Australia's most sought-after locations.</p>

        <form className="hero-search locations-search" onSubmit={handleSubmit}>
          <label className="hero-search-field">
            <span>
              <MapPinIcon size={13} /> Location
            </span>
            <select value={location} onChange={(event) => setLocation(event.target.value)}>
              <option value="any">Any location</option>
              {POPULAR_LOCATIONS.map((loc) => (
                <option key={loc.city} value={loc.city}>
                  {loc.city}
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
            <span>Price Range</span>
            <select value={priceBand} onChange={(event) => setPriceBand(event.target.value as PriceBand)}>
              <option value="any">Any price</option>
              <option value="under-500">Under $500/wk</option>
              <option value="500-800">$500 – $800/wk</option>
              <option value="800-1200">$800 – $1,200/wk</option>
              <option value="1200-plus">$1,200+/wk</option>
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
          <button type="submit" className="btn-primary hero-search-submit">
            Search Locations
          </button>
        </form>
      </div>

      <div className="locations-layout page-container">
        <div className="locations-main">
          <div className="products-section-heading">
            <h2>Popular Locations</h2>
          </div>

          <Reveal className="locations-grid">
            {POPULAR_LOCATIONS.map((loc) => {
              const count = PROPERTIES.filter((property) => property.city === loc.city).length;
              return <LocationCard key={loc.city} city={loc.city} state={loc.state} count={count} />;
            })}
          </Reveal>

          <div className="locations-view-all">
            <Link to="/apartments" className="btn-secondary">
              View All Locations →
            </Link>
          </div>

          <div className="apartments-notify-banner">
            <BellIcon size={22} />
            <div className="apartments-notify-copy">
              <strong>Can't find what you're looking for?</strong>
              <p>We have new apartments coming to more locations soon.</p>
            </div>
            {notifyRequested ? (
              <span className="apartments-notify-confirm">Notified ✓</span>
            ) : (
              <button type="button" className="btn-primary" onClick={() => setNotifyRequested(true)}>
                Get Notified
              </button>
            )}
          </div>
        </div>

        <aside className="locations-sidebar">
          <div className="why-location-panel">
            <h3>Why Location Matters</h3>
            {WHY_LOCATION.map((item) => (
              <div className="why-location-item" key={item.title}>
                <item.icon size={20} />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="explore-map-panel">
            <h3>Explore on Map</h3>
            <LocationsMapPanel />
          </div>
        </aside>
      </div>
    </div>
  );
}
