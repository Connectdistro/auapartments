import { useRef } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';
import { ArrowRightIcon } from './icons';

const CITY_IMAGES: Record<string, string> = {
  Melbourne: '/locations/melbourne.png',
  Sydney: '/locations/sydney.png',
  Brisbane: '/locations/brisbane.png',
  'Gold Coast': '/locations/gold-coast.png',
  Perth: '/locations/perth.png',
  Adelaide: '/locations/adelaide.png',
  Canberra: '/locations/canberra.png',
  Hobart: '/locations/hobart.png',
};

const MAX_TILT_DEG = 9;

interface LocationCardProps {
  city: string;
  state?: string;
  count: number;
}

export default function LocationCard({ city, state, count }: LocationCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateY = px * MAX_TILT_DEG;
    const rotateX = -py * MAX_TILT_DEG;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = '';
  };

  return (
    <Link
      ref={cardRef}
      to={`/apartments?location=${encodeURIComponent(city)}`}
      className="location-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="location-card-media">
        <ImagePlaceholder label={`${city} skyline`} src={CITY_IMAGES[city]} />
      </div>
      <div className="location-card-scrim" />
      <ArrowRightIcon size={18} className="location-card-arrow" />
      <div className="location-card-body">
        <h3>{city}</h3>
        <p>{state}</p>
        <span>{count > 0 ? `${count} stay${count === 1 ? '' : 's'}` : 'Coming soon'}</span>
      </div>
    </Link>
  );
}
