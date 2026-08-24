import { BedIcon, BathIcon, CarIcon, AreaIcon } from './icons';

interface PropertyStatsProps {
  bedrooms: number;
  bathrooms: number;
  parking: number;
  sqm?: number;
  className?: string;
}

export default function PropertyStats({ bedrooms, bathrooms, parking, sqm, className = '' }: PropertyStatsProps) {
  return (
    <p className={`property-stats ${className}`.trim()}>
      <span>
        <BedIcon size={16} /> {bedrooms}
      </span>
      <span>
        <BathIcon size={16} /> {bathrooms}
      </span>
      <span>
        <CarIcon size={16} /> {parking}
      </span>
      {sqm ? (
        <span>
          <AreaIcon size={16} /> {sqm}m²
        </span>
      ) : null}
    </p>
  );
}
