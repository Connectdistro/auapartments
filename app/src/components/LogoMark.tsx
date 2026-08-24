export default function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="logo-mark">
      <path d="M12 2 22 20H2L12 2Z" fill="var(--accent-2)" />
      <path d="M12 9 17.5 20h-11L12 9Z" fill="var(--bg)" />
    </svg>
  );
}
