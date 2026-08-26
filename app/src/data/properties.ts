export type PropertyType = 'Apartment' | 'Unit' | 'Townhouse' | 'House';
export type Availability = 'available' | 'soon' | 'leased';

export interface NearbyPlace {
  name: string;
  type: string;
  distance?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;

  suburb: string;
  city: string;
  state: string;
  postcode?: string;

  propertyType: PropertyType;

  pricePerNight: number;
  maxGuests: number;
  /** Static seed rating (no review system yet) shown as a star score, e.g. 4.92. */
  rating: number;

  bedrooms: number;
  bathrooms: number;
  parking: number;
  sqm?: number;
  floorLevel?: number;
  liftAccess?: boolean;
  buildingYear?: number;
  petPolicy?: string;

  furnished: boolean;

  availability: Availability;
  availableFrom?: string;
  /** Next scheduled open inspection, shown as plain text — not a booking flow. */
  nextInspection?: string;

  /** ISO date this listing went live — drives the "Newest" sort. */
  listedDate: string;

  description: string;
  shortDescription: string;

  features: string[];

  /** Ordered gallery photos: exterior, living room, kitchen, bedroom, bathroom, balcony/view. */
  images: PropertyImage[];

  featured: boolean;

  leaseTerms?: string[];

  nearby?: NearbyPlace[];
}

export interface PropertyImage {
  src: string;
  alt: string;
}

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  available: 'Available now',
  soon: 'Available soon',
  leased: 'Leased',
};

const GALLERY_SHOTS: { file: string; label: string }[] = [
  { file: '01-exterior', label: 'Exterior' },
  { file: '02-living-room', label: 'Living room' },
  { file: '03-kitchen', label: 'Kitchen' },
  { file: '04-bedroom', label: 'Bedroom' },
  { file: '05-bathroom', label: 'Bathroom' },
  { file: '06-balcony-view', label: 'Balcony / view' },
];

function propertyGallery(slug: string, title: string): PropertyImage[] {
  return GALLERY_SHOTS.map(({ file, label }) => ({
    src: `/properties/${slug}/${file}.png`,
    alt: `${title} — ${label}`,
  }));
}

export const PROPERTIES: Property[] = [
  {
    id: 'skyline-luxury-apartment',
    slug: 'skyline-luxury-apartment',
    title: 'Skyline Luxury Apartment',
    suburb: 'Southbank',
    city: 'Melbourne',
    state: 'VIC',
    postcode: '3006',
    propertyType: 'Apartment',
    pricePerNight: 285,
    maxGuests: 4,
    rating: 4.92,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    sqm: 85,
    floorLevel: 23,
    liftAccess: true,
    buildingYear: 2020,
    petPolicy: 'No pets',
    furnished: false,
    availability: 'available',
    nextInspection: 'Sat 10:00am – 10:30am',
    listedDate: '2026-08-10',
    description:
      'A bright, modern two-bedroom apartment on a high floor with sweeping city views. Open-plan living flows onto a private balcony, with floor-to-ceiling glazing throughout.',
    shortDescription: 'Modern two-bedroom apartment with sweeping city views.',
    features: ['Air conditioning', 'Built-in wardrobes', 'Dishwasher', 'Balcony', 'Secure parking', 'Gym access'],
    images: propertyGallery('skyline-luxury-apartment', 'Skyline Luxury Apartment'),
    featured: true,
    leaseTerms: ['Minimum stay: 2 nights', 'Free cancellation up to 48 hours before check-in', 'No pets'],
    nearby: [
      { name: 'Southbank Station', type: 'Train', distance: '400m' },
      { name: 'Crown Melbourne', type: 'Entertainment', distance: '600m' },
      { name: 'Southbank Primary School', type: 'School', distance: '1.1km' },
    ],
  },
  {
    id: 'harbour-views-residences',
    slug: 'harbour-views-residences',
    title: 'Harbour Views Residences',
    suburb: 'Circular Quay',
    city: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    propertyType: 'Apartment',
    pricePerNight: 450,
    maxGuests: 6,
    rating: 4.97,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    sqm: 142,
    floorLevel: 31,
    liftAccess: true,
    buildingYear: 2018,
    petPolicy: 'Upon application',
    furnished: true,
    availability: 'available',
    nextInspection: 'Sun 11:00am – 11:30am',
    listedDate: '2026-08-18',
    description:
      'A premium three-bedroom residence steps from Circular Quay, with uninterrupted harbour views, designer finishes throughout, and access to a residents-only rooftop pool.',
    shortDescription: 'Premium three-bedroom residence with harbour views.',
    features: ['Furnished', 'Air conditioning', 'Dishwasher', 'Balcony', 'Secure parking', 'Pool access', 'Gym access'],
    images: propertyGallery('harbour-views-residences', 'Harbour Views Residences'),
    featured: true,
    leaseTerms: ['Minimum stay: 3 nights', 'Free cancellation up to 7 days before check-in'],
    nearby: [
      { name: 'Circular Quay Station', type: 'Train & Ferry', distance: '250m' },
      { name: 'Sydney Opera House', type: 'Landmark', distance: '500m' },
      { name: 'Royal Botanic Garden', type: 'Park', distance: '700m' },
    ],
  },
  {
    id: 'riverside-loft',
    slug: 'riverside-loft',
    title: 'Riverside Loft',
    suburb: 'Fortitude Valley',
    city: 'Brisbane',
    state: 'QLD',
    postcode: '4006',
    propertyType: 'Apartment',
    pricePerNight: 145,
    maxGuests: 2,
    rating: 4.85,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    sqm: 58,
    floorLevel: 2,
    liftAccess: false,
    buildingYear: 1998,
    petPolicy: 'Upon application',
    furnished: false,
    availability: 'available',
    listedDate: '2026-07-25',
    description:
      'A characterful one-bedroom loft in the heart of Fortitude Valley, close to cafes, bars, and the river walk. High ceilings and large windows keep the space bright all day.',
    shortDescription: 'Characterful one-bedroom loft near the river walk.',
    features: ['Built-in wardrobes', 'Dishwasher', 'Secure parking', 'Storage cage'],
    images: propertyGallery('riverside-loft', 'Riverside Loft'),
    featured: true,
    leaseTerms: ['Minimum stay: 2 nights', 'Self check-in with lockbox'],
    nearby: [
      { name: 'Brunswick Street Station', type: 'Train', distance: '450m' },
      { name: 'James Street precinct', type: 'Shopping', distance: '600m' },
    ],
  },
  {
    id: 'botanic-gardens-apartment',
    slug: 'botanic-gardens-apartment',
    title: 'Botanic Gardens Apartment',
    suburb: 'East Melbourne',
    city: 'Melbourne',
    state: 'VIC',
    postcode: '3002',
    propertyType: 'Apartment',
    pricePerNight: 175,
    maxGuests: 4,
    rating: 4.88,
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    sqm: 78,
    floorLevel: 3,
    liftAccess: true,
    buildingYear: 1985,
    petPolicy: 'Pets considered',
    furnished: false,
    availability: 'soon',
    availableFrom: '2026-09-15',
    listedDate: '2026-08-05',
    description:
      'A quiet, tree-lined two-bedroom apartment opposite the Royal Botanic Gardens, with period detailing and a fully renovated kitchen.',
    shortDescription: 'Quiet two-bedroom apartment opposite the Botanic Gardens.',
    features: ['Air conditioning', 'Built-in wardrobes', 'Dishwasher', 'Secure parking'],
    images: propertyGallery('botanic-gardens-apartment', 'Botanic Gardens Apartment'),
    featured: false,
    leaseTerms: ['Minimum stay: 2 nights', 'Pets considered'],
    nearby: [
      { name: 'Jolimont Station', type: 'Train', distance: '600m' },
      { name: 'Royal Botanic Gardens', type: 'Park', distance: '150m' },
    ],
  },
  {
    id: 'bondi-beach-studio',
    slug: 'bondi-beach-studio',
    title: 'Bondi Beach Studio',
    suburb: 'Bondi Beach',
    city: 'Sydney',
    state: 'NSW',
    postcode: '2026',
    propertyType: 'Unit',
    pricePerNight: 165,
    maxGuests: 2,
    rating: 4.9,
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    sqm: 42,
    floorLevel: 4,
    liftAccess: false,
    buildingYear: 1975,
    petPolicy: 'No pets',
    furnished: true,
    availability: 'available',
    listedDate: '2026-08-20',
    description:
      'A compact, fully furnished studio a two-minute walk from Bondi Beach — ideal for one person who wants the beach lifestyle without the price tag of a full apartment.',
    shortDescription: 'Furnished studio, two minutes from Bondi Beach.',
    features: ['Furnished', 'Air conditioning', 'Built-in wardrobes'],
    images: propertyGallery('bondi-beach-studio', 'Bondi Beach Studio'),
    featured: false,
    leaseTerms: ['Minimum stay: 2 nights', 'Self check-in with lockbox', 'No pets'],
    nearby: [
      { name: 'Bondi Beach', type: 'Beach', distance: '200m' },
      { name: 'Campbell Parade', type: 'Shopping & dining', distance: '250m' },
    ],
  },
  {
    id: 'story-bridge-apartment',
    slug: 'story-bridge-apartment',
    title: 'Story Bridge Apartment',
    suburb: 'New Farm',
    city: 'Brisbane',
    state: 'QLD',
    postcode: '4005',
    propertyType: 'Apartment',
    pricePerNight: 195,
    maxGuests: 4,
    rating: 4.86,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    sqm: 88,
    floorLevel: 6,
    liftAccess: true,
    buildingYear: 2005,
    petPolicy: 'Upon application',
    furnished: false,
    availability: 'leased',
    listedDate: '2026-06-30',
    description:
      'A modern two-bedroom, two-bathroom apartment with views toward the Story Bridge, set among the cafes and parklands of New Farm.',
    shortDescription: 'Modern two-bedroom apartment with Story Bridge views.',
    features: ['Air conditioning', 'Dishwasher', 'Balcony', 'Secure parking', 'Pool access'],
    images: propertyGallery('story-bridge-apartment', 'Story Bridge Apartment'),
    featured: false,
    leaseTerms: ['Minimum stay: 2 nights'],
    nearby: [
      { name: 'New Farm Park', type: 'Park', distance: '300m' },
      { name: 'Merthyr Village', type: 'Shopping', distance: '400m' },
    ],
  },
  {
    id: 'docklands-waterfront',
    slug: 'docklands-waterfront',
    title: 'Docklands Waterfront',
    suburb: 'Docklands',
    city: 'Melbourne',
    state: 'VIC',
    postcode: '3008',
    propertyType: 'Apartment',
    pricePerNight: 155,
    maxGuests: 2,
    rating: 4.89,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    sqm: 62,
    floorLevel: 9,
    liftAccess: true,
    buildingYear: 2016,
    petPolicy: 'No pets',
    furnished: false,
    availability: 'available',
    nextInspection: 'Wed 5:30pm – 6:00pm',
    listedDate: '2026-08-15',
    description:
      'A one-bedroom apartment directly on the Docklands waterfront, with a north-facing balcony and access to a residents-only gym and pool.',
    shortDescription: 'One-bedroom apartment on the Docklands waterfront.',
    features: ['Air conditioning', 'Dishwasher', 'Balcony', 'Secure parking', 'Gym access', 'Pool access'],
    images: propertyGallery('docklands-waterfront', 'Docklands Waterfront'),
    featured: true,
    leaseTerms: ['Minimum stay: 2 nights', 'Free cancellation up to 48 hours before check-in', 'No pets'],
    nearby: [
      { name: 'Southern Cross Station', type: 'Train', distance: '900m' },
      { name: 'NewQuay Promenade', type: 'Waterfront dining', distance: '150m' },
    ],
  },
  {
    id: 'kirribilli-heritage-apartment',
    slug: 'kirribilli-heritage-apartment',
    title: 'Kirribilli Heritage Apartment',
    suburb: 'Kirribilli',
    city: 'Sydney',
    state: 'NSW',
    postcode: '2061',
    propertyType: 'Apartment',
    pricePerNight: 225,
    maxGuests: 4,
    rating: 4.94,
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    sqm: 92,
    floorLevel: 1,
    liftAccess: false,
    buildingYear: 1962,
    petPolicy: 'Upon application',
    furnished: false,
    availability: 'soon',
    availableFrom: '2026-10-01',
    listedDate: '2026-08-01',
    description:
      'A heritage two-bedroom apartment in a leafy pocket of Kirribilli, walking distance to the Harbour Bridge and Milsons Point ferry.',
    shortDescription: 'Heritage two-bedroom apartment near the Harbour Bridge.',
    features: ['Built-in wardrobes', 'Dishwasher', 'Secure parking'],
    images: propertyGallery('kirribilli-heritage-apartment', 'Kirribilli Heritage Apartment'),
    featured: false,
    leaseTerms: ['Minimum stay: 2 nights', 'Free cancellation up to 7 days before check-in'],
    nearby: [
      { name: 'Milsons Point Station', type: 'Train', distance: '500m' },
      { name: 'Sydney Harbour Bridge', type: 'Landmark', distance: '600m' },
    ],
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((property) => property.slug === slug);
}

export function getPropertyById(id: string): Property | undefined {
  return PROPERTIES.find((property) => property.id === id);
}

export function formatNightlyRate(pricePerNight: number): string {
  return `$${pricePerNight}/night`;
}

export function formatListedAgo(listedDate: string): string {
  const diffDays = Math.floor((Date.now() - new Date(listedDate).getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return '1 week ago';
  if (diffWeeks < 5) return `${diffWeeks} weeks ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return diffMonths <= 1 ? '1 month ago' : `${diffMonths} months ago`;
}

export function getCities(): string[] {
  return [...new Set(PROPERTIES.map((property) => property.city))];
}
