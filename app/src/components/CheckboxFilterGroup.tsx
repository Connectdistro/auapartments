import FilterAccordionSection from './FilterAccordionSection';

interface CheckboxOption<T> {
  value: T;
  label: string;
  count: number;
}

interface CheckboxFilterGroupProps<T extends string | number> {
  label: string;
  options: CheckboxOption<T>[];
  selected: T[];
  onChange: (next: T[]) => void;
}

export default function CheckboxFilterGroup<T extends string | number>({
  label,
  options,
  selected,
  onChange,
}: CheckboxFilterGroupProps<T>) {
  const toggle = (value: T) => {
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);
  };

  return (
    <FilterAccordionSection label={label}>
      <div className="filter-checkbox-list">
        <label className="filter-checkbox">
          <input type="checkbox" checked={selected.length === 0} onChange={() => onChange([])} />
          Any
        </label>
        {options.map((option) => (
          <label className="filter-checkbox" key={String(option.value)}>
            <input type="checkbox" checked={selected.includes(option.value)} onChange={() => toggle(option.value)} />
            {option.label} <span className="filter-checkbox-count">({option.count})</span>
          </label>
        ))}
      </div>
    </FilterAccordionSection>
  );
}
