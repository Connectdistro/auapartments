interface ImagePlaceholderProps {
  label: string;
  className?: string;
  src?: string;
}

export default function ImagePlaceholder({ label, className = '', src }: ImagePlaceholderProps) {
  if (src) {
    return <img src={src} alt={label} className={`image-placeholder ${className}`} />;
  }

  return (
    <div className={`image-placeholder ${className}`}>
      <svg className="image-placeholder-icon" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="8.5" cy="10" r="1.6" fill="currentColor" />
        <path d="M4 17l5-5 3.5 3.5L16 12l4 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="image-placeholder-label">{label}</span>
    </div>
  );
}
