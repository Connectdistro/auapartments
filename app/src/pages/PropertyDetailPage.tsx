import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AVAILABILITY_LABEL, getPropertyBySlug } from '../data/properties';
import { useFavorites } from '../hooks/useFavorites';
import { usePropertyEnquiry } from '../hooks/usePropertyEnquiry';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ImageGallery from '../components/ImageGallery';
import HeartButton from '../components/HeartButton';
import EnquiryForm from '../components/EnquiryForm';
import ImagePlaceholder from '../components/ImagePlaceholder';
import {
  BedIcon,
  BathIcon,
  CarIcon,
  AreaIcon,
  MapPinIcon,
  CalendarIcon,
  CheckIcon,
  ExternalLinkIcon,
  ShareIcon,
  StarIcon,
  LiftIcon,
  QualityIcon,
  InfoIcon,
  TrainIcon,
  ShopIcon,
  RestaurantIcon,
  ParkIcon,
  AcIcon,
  BalconyIcon,
  DishwasherIcon,
  GymIcon,
  PoolIcon,
  WardrobeIcon,
  StorageIcon,
} from '../components/icons';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'space', label: 'The Space' },
  { id: 'location', label: 'Location' },
  { id: 'availability', label: 'Availability' },
] as const;

const NEARBY_ICON: Record<string, typeof TrainIcon> = {
  Train: TrainIcon,
  'Train & Ferry': TrainIcon,
  Shopping: ShopIcon,
  'Shopping & dining': ShopIcon,
  'Waterfront dining': RestaurantIcon,
  Park: ParkIcon,
  Beach: ParkIcon,
  Landmark: InfoIcon,
  School: InfoIcon,
};

const AMENITY_ICON: Record<string, typeof AcIcon> = {
  'Air conditioning': AcIcon,
  'Built-in wardrobes': WardrobeIcon,
  Dishwasher: DishwasherIcon,
  Balcony: BalconyIcon,
  'Secure parking': CarIcon,
  'Gym access': GymIcon,
  'Pool access': PoolIcon,
  'Storage cage': StorageIcon,
  Furnished: QualityIcon,
};

export default function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const property = slug ? getPropertyBySlug(slug) : undefined;
  const { isFavorite, toggleFavorite } = useFavorites();
  const { openEnquiry } = usePropertyEnquiry();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  useDocumentTitle(
    property ? property.title : 'Apartment not found',
    property ? `${property.shortDescription} — ${property.suburb}, ${property.state}.` : undefined,
  );

  if (!property) {
    return (
      <div className="page-hero">
        <span className="eyebrow">Not found</span>
        <h1>We couldn't find that apartment</h1>
        <p>
          It may have been leased or removed. <Link to="/apartments">Browse all apartments →</Link>
        </p>
      </div>
    );
  }

  const favorited = isFavorite(property.id);
  const fullAddress = `${property.suburb}, ${property.city} ${property.state}${property.postcode ? ` ${property.postcode}` : ''}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.title}, ${fullAddress}`)}`;

  const detailRows: { icon: typeof AcIcon; label: string; value: string }[] = [
    { icon: QualityIcon, label: 'Property Type', value: property.propertyType },
    { icon: CheckIcon, label: 'Furnished', value: property.furnished ? 'Furnished' : 'Unfurnished' },
    { icon: CalendarIcon, label: 'Minimum Stay', value: property.leaseTerms?.[0] ?? '—' },
    { icon: InfoIcon, label: 'Pet Policy', value: property.petPolicy ?? 'Upon application' },
    { icon: AreaIcon, label: 'Floor Level', value: property.floorLevel !== undefined ? String(property.floorLevel) : '—' },
    { icon: LiftIcon, label: 'Lift Access', value: property.liftAccess ? 'Yes' : 'No' },
    { icon: CalendarIcon, label: 'Building Year', value: property.buildingYear !== undefined ? String(property.buildingYear) : '—' },
    {
      icon: InfoIcon,
      label: 'Cancellation',
      value: property.leaseTerms?.find((term) => term.toLowerCase().includes('cancellation')) ?? 'Contact host',
    },
  ];

  const handleCopyInspection = async () => {
    if (!property.nextInspection) return;
    const text = `${property.title} — next inspection: ${property.nextInspection}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: property.title, url });
        return;
      } catch {
        /* user cancelled or share unavailable — fall through to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  return (
    <div className="product-detail">
      <div className="page-container property-detail-back">
        <Link to="/apartments">← Back to Apartments</Link>
      </div>

      <div className="page-container">
        <ImageGallery
          images={property.images}
          title={property.title}
          topLeft={
            <span className={`availability-badge availability-${property.availability}`}>
              {AVAILABILITY_LABEL[property.availability]}
            </span>
          }
          topRight={
            <HeartButton
              favorited={favorited}
              onToggle={() => toggleFavorite(property.id)}
              className="gallery-heart"
            />
          }
        />
      </div>

      <div className="product-detail-body page-container">
        <div className="product-detail-main">
          <div className="property-detail-title-row">
            <div>
              <h1>{property.title}</h1>
              <p className="property-detail-location">
                <MapPinIcon size={14} /> {property.suburb}, {property.state}
                {property.postcode ? ` ${property.postcode}` : ''} · <StarIcon size={13} /> {property.rating.toFixed(2)}
              </p>
            </div>
            <p className="property-detail-rent">
              ${property.pricePerNight}
              <span>/ night</span>
            </p>
          </div>

          <div className="property-detail-stats-full">
            <span>
              <BedIcon size={17} /> {property.bedrooms} Bedroom{property.bedrooms === 1 ? '' : 's'}
            </span>
            <span>
              <BathIcon size={17} /> {property.bathrooms} Bathroom{property.bathrooms === 1 ? '' : 's'}
            </span>
            <span>
              <CarIcon size={17} /> {property.parking} Car Space{property.parking === 1 ? '' : 's'}
            </span>
            {property.sqm ? (
              <span>
                <AreaIcon size={17} /> {property.sqm}m²
              </span>
            ) : null}
          </div>

          <nav className="property-jump-nav" aria-label="Jump to section">
            {SECTIONS.map((section) => (
              <a key={section.id} href={`#section-${section.id}`}>
                {section.label}
              </a>
            ))}
          </nav>

          <details id="section-overview" className="property-section" open>
            <summary>Overview</summary>
            <div className="property-section-body">
              <p className="product-detail-description">{property.description}</p>

              <div className="property-overview-grid">
                <dl className="property-details-grid">
                  {detailRows.map((row) => (
                    <div key={row.label}>
                      <dt>
                        <row.icon size={15} /> {row.label}
                      </dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="property-amenities-panel">
                  <h3>Amenities</h3>
                  <div className="property-amenities-grid">
                    {property.features.map((feature) => {
                      const Icon = AMENITY_ICON[feature] ?? CheckIcon;
                      return (
                        <span key={feature} className="property-amenity">
                          <Icon size={20} />
                          {feature}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </details>

          <details id="section-features" className="property-section" open>
            <summary>Features</summary>
            <div className="property-section-body">
              <div className="property-amenities-grid">
                {property.features.map((feature) => {
                  const Icon = AMENITY_ICON[feature] ?? CheckIcon;
                  return (
                    <span key={feature} className="property-amenity">
                      <Icon size={20} />
                      {feature}
                    </span>
                  );
                })}
              </div>
            </div>
          </details>

          <details id="section-space" className="property-section" open>
            <summary>The Space</summary>
            <div className="property-section-body">
              <p className="product-detail-description">
                {property.sqm ? `${property.sqm}m² of living space, spanning ` : 'This apartment spans '}
                {property.images.length} distinct areas:
              </p>
              <ul className="space-room-list">
                {property.images.map((room) => (
                  <li key={room.alt}>{room.alt.split(' — ').pop()}</li>
                ))}
              </ul>
            </div>
          </details>

          <details id="section-location" className="property-section" open>
            <summary>Location</summary>
            <div className="property-section-body">
              <div className="property-location-grid">
                <div>
                  <p className="product-detail-description">
                    {fullAddress}. Exact address provided after an enquiry is received.
                  </p>
                  <div className="location-map-thumb">
                    <ImagePlaceholder label="Map preview" />
                  </div>
                  <a href={mapsUrl} target="_blank" rel="noreferrer" className="location-map-link">
                    View on Google Maps <ExternalLinkIcon size={13} />
                  </a>
                </div>

                {property.nearby && property.nearby.length > 0 ? (
                  <div>
                    <h3>What's nearby</h3>
                    <ul className="nearby-list">
                      {property.nearby.map((place) => {
                        const Icon = NEARBY_ICON[place.type] ?? InfoIcon;
                        return (
                          <li key={place.name}>
                            <Icon size={16} />
                            <span className="nearby-name">{place.name}</span>
                            <span className="nearby-type">{place.type}</span>
                            {place.distance ? <span className="nearby-distance">{place.distance}</span> : null}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </details>

          <details id="section-availability" className="property-section" open>
            <summary>Availability</summary>
            <div className="property-section-body">
              <p className="product-detail-description">
                {AVAILABILITY_LABEL[property.availability]}
                {property.availableFrom ? ` from ${property.availableFrom}` : ''}.
              </p>

              {property.nextInspection ? (
                <div className="next-inspection-card">
                  <span className="eyebrow">Next Check-in Window</span>
                  <p>{property.nextInspection}</p>
                  <span className="next-inspection-note">Exact check-in details sent after booking</span>
                  <button type="button" className="btn-secondary" onClick={handleCopyInspection}>
                    {copied ? 'Copied ✓' : 'Copy check-in details'}
                  </button>
                </div>
              ) : null}

              <section className="property-enquire-section">
                <h2>Request to book this stay</h2>
                <EnquiryForm property={property} />
              </section>
            </div>
          </details>
        </div>

        <aside className="product-detail-sidebar">
          <div className="product-detail-price-card">
            <span className={`availability-badge availability-${property.availability}`}>
              {AVAILABILITY_LABEL[property.availability]}
            </span>
            {property.nextInspection ? (
              <p className="product-detail-sidebar-inspection">
                Next inspection
                <br />
                {property.nextInspection}
              </p>
            ) : null}
            <a href="#section-availability" className="btn-primary">
              Request to Book
            </a>
            <div className="product-detail-sidebar-actions">
              <button
                type="button"
                className={`btn-secondary product-detail-favorite${favorited ? ' is-favorited' : ''}`}
                onClick={() => toggleFavorite(property.id)}
              >
                {favorited ? 'Saved' : 'Save'}
              </button>
              <button type="button" className="btn-secondary" onClick={handleShare}>
                <ShareIcon size={15} /> {shared ? 'Copied ✓' : 'Share'}
              </button>
            </div>

            {property.features.length > 0 ? (
              <div className="product-detail-sidebar-checklist">
                <span className="eyebrow">Why you'll love it</span>
                <ul>
                  {property.features.slice(0, 5).map((feature) => (
                    <li key={feature}>
                      <CheckIcon size={15} /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </aside>
      </div>

      <div className="property-sticky-enquire">
        <button type="button" className="btn-primary" onClick={() => openEnquiry(property)}>
          Request to Book
        </button>
      </div>
    </div>
  );
}
