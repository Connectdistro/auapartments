import { Link } from 'react-router-dom';
import ImagePlaceholder from './ImagePlaceholder';
import { ArrowRightIcon } from './icons';

interface LocationCardProps {
  city: string;
  state?: string;
  count: number;
}

export default function LocationCard({ city, state, count }: LocationCardProps) {
  return (
    <Link to={`/apartments?location=${encodeURIComponent(city)}`} className="location-card">
      <div className="location-card-media">
        <ImagePlaceholder label={`${city} skyline`} />
        <ArrowRightIcon size={18} className="location-card-arrow" />
      </div>
      <div className="location-card-body">
        <h3>{city}</h3>
        <p>{state}</p>
        <span>{count > 0 ? `${count} apartment${count === 1 ? '' : 's'}` : 'Coming soon'}</span>
      </div>
    </Link>
  );
}
