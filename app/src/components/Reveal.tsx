import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Set true to only play the reveal once instead of easing back out every time it scrolls away. */
  once?: boolean;
  style?: CSSProperties;
  id?: string;
}

/**
 * Fades/slides content in when it scrolls into view, and back out again when it
 * scrolls away — unless `once` is set, in which case it plays a single time and stays.
 * Driven by a native IntersectionObserver + CSS transition so every section on the
 * site eases in and out with the exact same timing/curve.
 */
export default function Reveal({ children, className, delay = 0, once = false, style, id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setHasEntered(true);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const visible = once ? hasEntered : inView;

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal-toggle${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, transitionDelay: visible ? `${delay}s` : '0s' }}
    >
      {children}
    </div>
  );
}
