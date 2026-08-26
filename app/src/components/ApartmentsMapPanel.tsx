import { Link } from 'react-router-dom';
import type { Property } from '../data/properties';

interface ApartmentsMapPanelProps {
  properties: Property[];
  variant?: 'sidebar' | 'full';
}

/** Deterministic pin placement from listing data — there is no real geocoding/map provider yet. */
function pinPosition(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const left = 10 + (hash % 78);
  const top = 14 + ((hash >> 8) % 66);
  return { left: `${left}%`, top: `${top}%` };
}

export default function ApartmentsMapPanel({ properties, variant = 'sidebar' }: ApartmentsMapPanelProps) {
  return (
    <div className={`apartments-map-panel apartments-map-panel-${variant}`}>
      <div className="apartments-map-canvas">
        {properties.map((property) => (
          <Link
            key={property.id}
            to={`/apartments/${property.slug}`}
            className="apartments-map-pin"
            style={pinPosition(property.id)}
          >
            ${property.pricePerNight}
            <span>/night</span>
          </Link>
        ))}
      </div>

      <div className="apartments-map-controls">
        <button type="button" disabled title="Interactive map coming soon">
          +
        </button>
        <button type="button" disabled title="Interactive map coming soon">
          −
        </button>
      </div>

      <div className="apartments-map-notice">
        <strong>Interactive map coming soon</strong>
        <p>We're working on bringing you a better map experience.</p>
      </div>
    </div>
  );
}
