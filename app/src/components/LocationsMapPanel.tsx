import { Link } from 'react-router-dom';
import { POPULAR_LOCATIONS } from '../data/locations';
import { MapPinIcon } from './icons';

export default function LocationsMapPanel() {
  return (
    <div className="locations-mini-map">
      <div className="locations-mini-map-canvas">
        {POPULAR_LOCATIONS.map((location) => (
          <Link
            key={location.city}
            to={`/apartments?location=${encodeURIComponent(location.city)}`}
            className="locations-mini-map-pin"
            style={location.mapPosition}
          >
            <MapPinIcon size={16} />
            <span>{location.city}</span>
          </Link>
        ))}
      </div>
      <Link to="/apartments?view=map" className="btn-secondary locations-mini-map-cta">
        View Map
      </Link>
    </div>
  );
}
