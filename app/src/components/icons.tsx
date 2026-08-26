import type { ReactNode } from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

function Svg({ size = 18, className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18v2M21 18v2" />
      <path d="M3 12V8a1 1 0 0 1 1-1h6v5" />
      <path d="M13 12V7h5a2 2 0 0 1 2 2v3" />
    </Svg>
  );
}

export function BathIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M4 12V6a2 2 0 0 1 3.2-1.6" />
      <path d="M3 19h18M9 4.5a1 1 0 1 0-1.6 1.1" />
    </Svg>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 16V11l1.8-4.2A2 2 0 0 1 7.6 5.6h8.8a2 2 0 0 1 1.8 1.2L20 11v5" />
      <path d="M4 16h16v2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2Z" />
      <circle cx="7.5" cy="16" r="1.2" />
      <circle cx="16.5" cy="16" r="1.2" />
    </Svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </Svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </Svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </Svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 9l6 6 6-6" />
    </Svg>
  );
}

export function TrainIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="3" width="14" height="13" rx="3" />
      <path d="M5 12h14M9 16l-2.5 4M15 16l2.5 4" />
      <circle cx="8.5" cy="9" r="0.6" fill="currentColor" />
      <circle cx="15.5" cy="9" r="0.6" fill="currentColor" />
    </Svg>
  );
}

export function ShopIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 8h16l-1 12H5L4 8Z" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </Svg>
  );
}

export function RestaurantIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11" />
      <path d="M16 3c-1.4 0-2.5 1.8-2.5 4s1.1 4 2.5 4v10" />
    </Svg>
  );
}

export function ParkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 7 11h2.5L6 17h5v4M12 3l5 8h-2.5L18 17h-5" />
    </Svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9l-5.6 3.2 1.4-6.3-4.8-4.3 6.4-.6L12 3Z" />
    </Svg>
  );
}

export function QualityIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 4 7v5c0 4.5 3.2 7.7 8 9 4.8-1.3 8-4.5 8-9V7l-8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}

export function SupportIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19a5 5 0 0 1-5 3h-2" />
    </Svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5v.01" />
    </Svg>
  );
}

export function KnowledgeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z" />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 4h3l1.5 4.5L7.5 10a12 12 0 0 0 6.5 6.5l1.5-2L20 16v3a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z" />
    </Svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s-7.5-4.6-10-9.1C.4 8.6 2 5 5.5 5c2 0 3.4 1.1 4.5 2.6C11.1 6.1 12.5 5 14.5 5 18 5 19.6 8.6 22 11.9 19.5 16.4 12 21 12 21z" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  );
}

export function AreaIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M4 9h3M4 15h3M20 9h-3M20 15h-3M9 4v3M15 4v3M9 20v-3M15 20v-3" />
    </Svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 6h16M7 12h10M10 18h4" />
      <circle cx="9" cy="6" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="18" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </Svg>
  );
}

export function AcIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="7" rx="2" />
      <path d="M7 16v3M12 16v3M17 16v3" />
    </Svg>
  );
}

export function BalconyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 10h16M4 10v9M20 10v9" />
      <path d="M4 19h16M8 10V6a4 4 0 0 1 8 0v4" />
    </Svg>
  );
}

export function DishwasherIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M4 8h16" />
      <circle cx="12" cy="14" r="3.2" />
      <circle cx="8" cy="5.5" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function GymIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 9v6M6 7v10M18 7v10M21 9v6" />
      <path d="M6 12h12" />
    </Svg>
  );
}

export function PoolIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 16c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
      <path d="M3 20c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
      <path d="M8 12V5.5a2 2 0 1 1 4 0V9" />
    </Svg>
  );
}

export function WardrobeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M12 3v18" />
      <circle cx="9.5" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function StorageIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="7" width="18" height="12" rx="1.5" />
      <path d="M3 12h18M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </Svg>
  );
}

export function LiftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="m10 9 2-2 2 2M10 15l2 2 2-2" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </Svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 4h6v6M20 4 10 14M9 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
    </Svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </Svg>
  );
}

export function CoffeeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 9h12v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 4c-.6.6-.6 1.4 0 2M12 4c-.6.6-.6 1.4 0 2" />
    </Svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 4 6.5v5C4 16.5 7.5 20 12 21c4.5-1 8-4.5 8-9.5v-5L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5h16v11H8l-4 4V5Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </Svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
      <path d="M10 21v-4h4v4" />
    </Svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 21v-8h3l.5-3.5H14V7.5c0-1 .3-1.7 1.8-1.7H18V2.6c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V9.5H8V13h3v8h3Z" />
    </Svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10v7M7.5 7.2v.01M12 17v-4.5c0-1.4 1-2.5 2.3-2.5s2.2 1 2.2 2.5V17" />
    </Svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2 12h4l3-3 3 3 2-2 2 2h4" />
      <path d="M8 15l2 2a1.6 1.6 0 0 0 2.3-2.2L10 12M14 12l2.3 2.3a1.6 1.6 0 0 1-2.3 2.2l-1-1" />
    </Svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 13c0-5 4-9 14-9 0 10-4 14-9 14-3 0-5-2-5-5Z" />
      <path d="M5 19c4-4 8-7 14-14" />
    </Svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="m8.1 10.8 7.8-4.6M8.1 13.2l7.8 4.6" />
    </Svg>
  );
}
