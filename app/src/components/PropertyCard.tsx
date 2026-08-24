import { Link } from 'react-router-dom';
import { AVAILABILITY_LABEL, formatListedAgo, formatWeeklyRent, type Property } from '../data/properties';
import { useFavorites } from '../hooks/useFavorites';
import HeartButton from './HeartButton';
import PropertyStats from './PropertyStats';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'row';
}

export default function PropertyCard({ property, layout = 'grid' }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(property.id);

  return (
    <article className={`property-card${layout === 'row' ? ' property-card-row' : ''}`}>
      <Link to={`/apartments/${property.slug}`} className="property-card-media">
        <span className={`availability-badge availability-${property.availability}`}>
          {AVAILABILITY_LABEL[property.availability]}
        </span>
        <HeartButton
          favorited={favorited}
          onToggle={() => toggleFavorite(property.id)}
          className="property-card-heart"
        />
        <img
          className="property-card-img"
          src={property.images[0]?.src}
          alt={property.images[0]?.alt ?? property.title}
        />
      </Link>

      <div className="property-card-body">
        <Link to={`/apartments/${property.slug}`} className="property-card-title">
          <h3>{property.title}</h3>
        </Link>
        <p className="property-card-location">
          {property.suburb}, {property.state}
        </p>

        {layout === 'row' ? (
          <>
            <PropertyStats
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              parking={property.parking}
              sqm={property.sqm}
            />
            <p className="property-card-description">{property.shortDescription}</p>
            <div className="property-card-meta-row">
              <span className="property-card-meta">
                Listed {formatListedAgo(property.listedDate)} •{' '}
                {property.nextInspection
                  ? `Next inspection: ${property.nextInspection}`
                  : AVAILABILITY_LABEL[property.availability]}
              </span>
              <span className="property-card-price">{formatWeeklyRent(property.weeklyRent)}</span>
            </div>
          </>
        ) : (
          <div className="property-card-stats-row">
            <PropertyStats bedrooms={property.bedrooms} bathrooms={property.bathrooms} parking={property.parking} />
            <span className="property-card-price">{formatWeeklyRent(property.weeklyRent)}</span>
          </div>
        )}

        <Link to={`/apartments/${property.slug}`} className="property-card-view">
          View Apartment <span className="property-card-view-arrow">→</span>
        </Link>
      </div>
    </article>
  );
}
