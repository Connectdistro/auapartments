interface HeartButtonProps {
  favorited: boolean;
  onToggle: () => void;
  className?: string;
}

export default function HeartButton({ favorited, onToggle, className = '' }: HeartButtonProps) {
  return (
    <button
      type="button"
      className={`heart-button${favorited ? ' is-favorited' : ''} ${className}`.trim()}
      aria-label={favorited ? 'Remove from saved apartments' : 'Save this apartment'}
      aria-pressed={favorited}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggle();
      }}
    >
      <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
        <path
          d="M12 21s-7.5-4.6-10-9.1C.4 8.6 2 5 5.5 5c2 0 3.4 1.1 4.5 2.6C11.1 6.1 12.5 5 14.5 5 18 5 19.6 8.6 22 11.9 19.5 16.4 12 21 12 21z"
          fill={favorited ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    </button>
  );
}
