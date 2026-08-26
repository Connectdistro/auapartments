import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROPERTIES, type PropertyType } from '../data/properties';
import { POPULAR_LOCATIONS } from '../data/locations';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import LocationCard from '../components/LocationCard';
import LocationsMapPanel from '../components/LocationsMapPanel';
import { BriefcaseIcon, CoffeeIcon, CarIcon, ShieldIcon, MapPinIcon, BellIcon } from '../components/icons';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type PriceBand = 'any' | 'under-150' | '150-250' | '250-400' | '400-plus';
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
  useDocumentTitle(
    'Locations',
    "Explore premium stays in Australia's most sought-after locations, from Sydney and Melbourne to Perth and beyond.",
  );
  const navigate = useNavigate();

  const [location, setLocation] = useState('any');
  const [propertyType, setPropertyType] = useState<PropertyTypeFilter>('any');
  const [priceBand, setPriceBand] = useState<PriceBand>('any');
  const [bedrooms, setBedrooms] = useState('any');
  const [notifyRequested, setNotifyRequested] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [whyPanelHeight, setWhyPanelHeight] = useState<number | undefined>(undefined);
  const [sidebarOffset, setSidebarOffset] = useState<number | undefined>(undefined);

  useEffect(() => {
    const mainEl = mainRef.current;
    const gridEl = gridRef.current;
    if (!mainEl || !gridEl) return;
    const query = window.matchMedia('(min-width: 961px)');

    const update = () => {
      if (!query.matches) {
        setWhyPanelHeight(undefined);
        setSidebarOffset(undefined);
        return;
      }
      setWhyPanelHeight(gridEl.getBoundingClientRect().height);
      setSidebarOffset(gridEl.getBoundingClientRect().top - mainEl.getBoundingClientRect().top);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(gridEl);
    observer.observe(mainEl);
    query.addEventListener('change', update);
    return () => {
      observer.disconnect();
      query.removeEventListener('change', update);
    };
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (location !== 'any') params.set('location', location);
    if (propertyType !== 'any') params.set('propertyType', propertyType);
    if (bedrooms !== 'any') params.set('bedrooms', bedrooms);
    if (priceBand === 'under-150') params.set('maxPrice', '150');
    else if (priceBand === '150-250') {
      params.set('minPrice', '150');
      params.set('maxPrice', '250');
    } else if (priceBand === '250-400') {
      params.set('minPrice', '250');
      params.set('maxPrice', '400');
    } else if (priceBand === '400-plus') params.set('minPrice', '400');
    const query = params.toString();
    navigate(query ? `/apartments?${query}` : '/apartments');
  };

  return (
    <div className="locations-page">
      <PageHero
        eyebrow="Explore"
        title="Find Your New Neighbourhood"
        subtitle="Explore premium stays in Australia's most sought-after locations."
        size="large"
        bgVariant="routes"
      >
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
              <option value="under-150">Under $150/night</option>
              <option value="150-250">$150 – $250/night</option>
              <option value="250-400">$250 – $400/night</option>
              <option value="400-plus">$400+/night</option>
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
      </PageHero>
      <div className="page-hero-divider" />

      <div className="locations-layout page-container">
        <div className="locations-main" ref={mainRef}>
          <Reveal className="products-section-heading">
            <h2>Popular Locations</h2>
          </Reveal>

          <div className="locations-grid" ref={gridRef}>
            {POPULAR_LOCATIONS.map((loc, index) => {
              const count = PROPERTIES.filter((property) => property.city === loc.city).length;
              return (
                <Reveal key={loc.city} delay={index * 0.06}>
                  <LocationCard city={loc.city} state={loc.state} count={count} />
                </Reveal>
              );
            })}
          </div>

          <div className="locations-view-all">
            <Link to="/apartments" className="btn-secondary">
              View All Locations →
            </Link>
          </div>
        </div>

        <Reveal
          className="locations-sidebar"
          style={sidebarOffset ? { marginTop: sidebarOffset } : undefined}
        >
          <aside className="why-location-panel" style={whyPanelHeight ? { height: whyPanelHeight } : undefined}>
            <h3>Why Location Matters</h3>
            <div className="why-location-items">
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
          </aside>

          <div className="explore-map-panel">
            <h3>Explore on Map</h3>
            <LocationsMapPanel />
          </div>
        </Reveal>
      </div>

      <div className="page-container locations-notify-wrap">
        <Reveal className="apartments-notify-banner">
          <BellIcon size={22} />
          <div className="apartments-notify-copy">
            <strong>Can't find what you're looking for?</strong>
            <p>We have new stays coming to more locations soon.</p>
          </div>
          {notifyRequested ? (
            <span className="apartments-notify-confirm">Notified ✓</span>
          ) : (
            <button type="button" className="btn-primary" onClick={() => setNotifyRequested(true)}>
              Get Notified
            </button>
          )}
        </Reveal>
      </div>
    </div>
  );
}
