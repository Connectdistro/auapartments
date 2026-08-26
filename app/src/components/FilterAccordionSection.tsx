import { useState, type ReactNode } from 'react';
import { ChevronDownIcon } from './icons';

interface FilterAccordionSectionProps {
  label: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function FilterAccordionSection({ label, children, defaultOpen = true }: FilterAccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="filter-group filter-accordion">
      <button type="button" className="filter-accordion-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="filter-label">{label}</span>
        <ChevronDownIcon size={16} className={`filter-accordion-chevron${open ? ' is-open' : ''}`} />
      </button>
      <div className={`filter-accordion-body${open ? ' is-open' : ''}`}>
        <div className="filter-accordion-inner">{children}</div>
      </div>
    </div>
  );
}
