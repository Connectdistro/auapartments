import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import CheckboxFilterGroup from '../components/CheckboxFilterGroup';
import ApartmentsMapPanel from '../components/ApartmentsMapPanel';
import { FilterIcon, BellIcon } from '../components/icons';
import {
  AVAILABILITY_LABEL,
  getCities,
  PROPERTIES,
  type Availability,
  type PropertyType,
} from '../data/properties';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'listed-desc' | 'availability';
type FurnishedValue = 'furnished' | 'unfurnished';
type ViewMode = 'list' | 'map';

const PRICE_MIN = 0;
const PRICE_MAX = 1600;
const PRICE_STEP = 20;

const BEDROOM_OPTIONS = [1, 2, 3] as const;
const BATHROOM_OPTIONS = [1, 2] as const;
const PROPERTY_TYPE_VALUES: PropertyType[] = ['Apartment', 'Unit', 'Townhouse', 'House'];
const FURNISHED_VALUES: FurnishedValue[] = ['furnished', 'unfurnished'];
const AVAILABILITY_VALUES: Availability[] = ['available', 'soon', 'leased'];
const AVAILABILITY_SORT_ORDER: Record<Availability, number> = { available: 0, soon: 1, leased: 2 };

interface FiltersState {
  location: string;
  suburbText: string;
  propertyType: PropertyType[];
  minPrice: number;
  maxPrice: number;
  bedrooms: number[];
  bathrooms: number[];
  furnished: FurnishedValue[];
  availability: Availability[];
}

const DEFAULT_FILTERS: FiltersState = {
  location: 'any',
  suburbText: '',
  propertyType: [],
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  bedrooms: [],
  bathrooms: [],
  furnished: [],
  availability: [],
};

function parsePropertyType(value: string | null): PropertyType[] {
  return value === 'Apartment' || value === 'Unit' || value === 'Townhouse' || value === 'House' ? [value] : [];
}

function filtersFromParams(params: URLSearchParams): FiltersState {
  const bedroomThreshold = Number(params.get('bedrooms'));
  const furnishedParam = params.get('furnished');
  const availabilityParam = params.get('availability');

  return {
    location: params.get('location') ?? 'any',
    suburbText: '',
    propertyType: parsePropertyType(params.get('propertyType')),
    minPrice: Number(params.get('minPrice')) || PRICE_MIN,
    maxPrice: Number(params.get('maxPrice')) || PRICE_MAX,
    bedrooms:
      bedroomThreshold >= 1 && bedroomThreshold <= 3
        ? BEDROOM_OPTIONS.filter((value) => value >= bedroomThreshold)
        : [],
    bathrooms: [],
    furnished: furnishedParam === 'furnished' || furnishedParam === 'unfurnished' ? [furnishedParam] : [],
    availability:
      availabilityParam === 'available' || availabilityParam === 'soon' || availabilityParam === 'leased'
        ? [availabilityParam]
        : [],
  };
}

function matchesBedrooms(count: number, selected: number[]): boolean {
  if (selected.length === 0) return true;
  return selected.some((value) => (value === 3 ? count >= 3 : count === value));
}

function matchesBathrooms(count: number, selected: number[]): boolean {
  if (selected.length === 0) return true;
  return selected.some((value) => (value === 2 ? count >= 2 : count === value));
}

export default function ApartmentsPage() {
  useDocumentTitle('Apartments');
  const [searchParams] = useSearchParams();
  const cities = getCities();

  const [draft, setDraft] = useState<FiltersState>(() => filtersFromParams(searchParams));
  const [applied, setApplied] = useState<FiltersState>(() => filtersFromParams(searchParams));
  const [featuredOnly] = useState(searchParams.get('featured') === 'true');

  const [sort, setSort] = useState<SortOption>('recommended');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<ViewMode>('list');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchSaved, setSearchSaved] = useState(false);

  const filtered = useMemo(() => {
    const list = PROPERTIES.filter((property) => {
      if (applied.location !== 'any' && property.city !== applied.location) return false;
      if (applied.suburbText.trim()) {
        const q = applied.suburbText.trim().toLowerCase();
        const hay = `${property.suburb} ${property.city} ${property.postcode ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (property.weeklyRent < applied.minPrice || property.weeklyRent > applied.maxPrice) return false;
      if (!matchesBedrooms(property.bedrooms, applied.bedrooms)) return false;
      if (!matchesBathrooms(property.bathrooms, applied.bathrooms)) return false;
      if (applied.propertyType.length > 0 && !applied.propertyType.includes(property.propertyType)) return false;
      if (applied.furnished.length > 0) {
        const wants = applied.furnished.includes('furnished') && applied.furnished.includes('unfurnished');
        if (!wants) {
          if (applied.furnished.includes('furnished') && !property.furnished) return false;
          if (applied.furnished.includes('unfurnished') && property.furnished) return false;
        }
      }
      if (applied.availability.length > 0 && !applied.availability.includes(property.availability)) return false;
      if (featuredOnly && !property.featured) return false;
      return true;
    });

    switch (sort) {
      case 'price-asc':
        return [...list].sort((a, b) => a.weeklyRent - b.weeklyRent);
      case 'price-desc':
        return [...list].sort((a, b) => b.weeklyRent - a.weeklyRent);
      case 'listed-desc':
        return [...list].sort((a, b) => (a.listedDate < b.listedDate ? 1 : -1));
      case 'availability':
        return [...list].sort((a, b) => AVAILABILITY_SORT_ORDER[a.availability] - AVAILABILITY_SORT_ORDER[b.availability]);
      default:
        return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
  }, [applied, featuredOnly, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const locationState = applied.location !== 'any' ? PROPERTIES.find((p) => p.city === applied.location)?.state : undefined;

  const applyFilters = () => {
    setApplied(draft);
    setPage(1);
    setFiltersOpen(false);
  };

  const clearAll = () => {
    setDraft(DEFAULT_FILTERS);
    setApplied(DEFAULT_FILTERS);
    setPage(1);
    setFiltersOpen(false);
  };

  const removeFilter = (mutate: (state: FiltersState) => FiltersState) => {
    setDraft((state) => mutate(state));
    setApplied((state) => mutate(state));
    setPage(1);
  };

  const bedroomOptions = BEDROOM_OPTIONS.map((value) => ({
    value,
    label: value === 3 ? '3+ Bedrooms' : `${value} Bedroom${value > 1 ? 's' : ''}`,
    count: PROPERTIES.filter((p) => (value === 3 ? p.bedrooms >= 3 : p.bedrooms === value)).length,
  }));

  const bathroomOptions = BATHROOM_OPTIONS.map((value) => ({
    value,
    label: value === 2 ? '2+ Bathrooms' : `${value} Bathroom`,
    count: PROPERTIES.filter((p) => (value === 2 ? p.bathrooms >= 2 : p.bathrooms === value)).length,
  }));

  const propertyTypeOptions = PROPERTY_TYPE_VALUES.map((value) => ({
    value,
    label: value,
    count: PROPERTIES.filter((p) => p.propertyType === value).length,
  }));

  const furnishedOptions = FURNISHED_VALUES.map((value) => ({
    value,
    label: value === 'furnished' ? 'Furnished' : 'Unfurnished',
    count: PROPERTIES.filter((p) => (value === 'furnished' ? p.furnished : !p.furnished)).length,
  }));

  const availabilityOptions = AVAILABILITY_VALUES.map((value) => ({
    value,
    label: AVAILABILITY_LABEL[value],
    count: PROPERTIES.filter((p) => p.availability === value).length,
  }));

  const pills: { key: string; label: string; onRemove: () => void }[] = [];
  if (applied.location !== 'any') {
    pills.push({
      key: 'location',
      label: locationState ? `${applied.location}, ${locationState}` : applied.location,
      onRemove: () => removeFilter((state) => ({ ...state, location: 'any' })),
    });
  }
  if (applied.suburbText.trim()) {
    pills.push({
      key: 'suburb',
      label: applied.suburbText.trim(),
      onRemove: () => removeFilter((state) => ({ ...state, suburbText: '' })),
    });
  }
  if (applied.minPrice > PRICE_MIN || applied.maxPrice < PRICE_MAX) {
    pills.push({
      key: 'price',
      label: `$${applied.minPrice} - $${applied.maxPrice}${applied.maxPrice >= PRICE_MAX ? '+' : ''}`,
      onRemove: () => removeFilter((state) => ({ ...state, minPrice: PRICE_MIN, maxPrice: PRICE_MAX })),
    });
  }
  if (applied.bedrooms.length > 0) {
    pills.push({
      key: 'bedrooms',
      label: bedroomOptions
        .filter((o) => applied.bedrooms.includes(o.value))
        .map((o) => o.label)
        .join(', '),
      onRemove: () => removeFilter((state) => ({ ...state, bedrooms: [] })),
    });
  }
  if (applied.bathrooms.length > 0) {
    pills.push({
      key: 'bathrooms',
      label: bathroomOptions
        .filter((o) => applied.bathrooms.includes(o.value))
        .map((o) => o.label)
        .join(', '),
      onRemove: () => removeFilter((state) => ({ ...state, bathrooms: [] })),
    });
  }
  if (applied.furnished.length > 0) {
    pills.push({
      key: 'furnished',
      label: applied.furnished.map((v) => (v === 'furnished' ? 'Furnished' : 'Unfurnished')).join(', '),
      onRemove: () => removeFilter((state) => ({ ...state, furnished: [] })),
    });
  }
  if (applied.availability.length > 0) {
    pills.push({
      key: 'availability',
      label: applied.availability.map((v) => AVAILABILITY_LABEL[v]).join(', '),
      onRemove: () => removeFilter((state) => ({ ...state, availability: [] })),
    });
  }
  if (applied.propertyType.length > 0) {
    pills.push({
      key: 'propertyType',
      label: applied.propertyType.join(', '),
      onRemove: () => removeFilter((state) => ({ ...state, propertyType: [] })),
    });
  }

  const filtersPanel = (
    <div className="filters-panel">
      <div className="filter-group">
        <span className="filter-label">Location</span>
        <select value={draft.location} onChange={(event) => setDraft((d) => ({ ...d, location: event.target.value }))}>
          <option value="any">Any location</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="filter-text-input"
          placeholder="Suburb, postcode or region"
          value={draft.suburbText}
          onChange={(event) => setDraft((d) => ({ ...d, suburbText: event.target.value }))}
        />
      </div>

      <CheckboxFilterGroup
        label="Property Type"
        options={propertyTypeOptions}
        selected={draft.propertyType}
        onChange={(next) => setDraft((d) => ({ ...d, propertyType: next }))}
      />

      <div className="filter-group">
        <span className="filter-label">
          Price Range: ${draft.minPrice} - {draft.maxPrice >= PRICE_MAX ? `$${PRICE_MAX}+` : `$${draft.maxPrice}`}
        </span>
        <div className="price-range-slider">
          <div
            className="price-range-track-fill"
            style={{
              left: `${((draft.minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
              right: `${100 - ((draft.maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
            }}
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            value={draft.minPrice}
            onChange={(event) =>
              setDraft((d) => ({ ...d, minPrice: Math.min(Number(event.target.value), d.maxPrice - PRICE_STEP) }))
            }
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            value={draft.maxPrice}
            onChange={(event) =>
              setDraft((d) => ({ ...d, maxPrice: Math.max(Number(event.target.value), d.minPrice + PRICE_STEP) }))
            }
          />
        </div>
        <div className="price-range-labels">
          <span>${PRICE_MIN}</span>
          <span>${PRICE_MAX}+</span>
        </div>
      </div>

      <CheckboxFilterGroup
        label="Bedrooms"
        options={bedroomOptions}
        selected={draft.bedrooms}
        onChange={(next) => setDraft((d) => ({ ...d, bedrooms: next }))}
      />

      <CheckboxFilterGroup
        label="Bathrooms"
        options={bathroomOptions}
        selected={draft.bathrooms}
        onChange={(next) => setDraft((d) => ({ ...d, bathrooms: next }))}
      />

      <CheckboxFilterGroup
        label="Furnished"
        options={furnishedOptions}
        selected={draft.furnished}
        onChange={(next) => setDraft((d) => ({ ...d, furnished: next }))}
      />

      <CheckboxFilterGroup
        label="Availability"
        options={availabilityOptions}
        selected={draft.availability}
        onChange={(next) => setDraft((d) => ({ ...d, availability: next }))}
      />

      <div className="filter-actions">
        <button type="button" className="btn-primary" onClick={applyFilters}>
          Apply Filters
        </button>
        <button type="button" className="filter-clear-all" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </div>
  );

  return (
    <div className="products-page">
      <div className="page-hero">
        <nav className="apartments-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Apartments</span>
        </nav>
        <h1>Apartments for Rent</h1>
        <p>
          {filtered.length} apartment{filtered.length === 1 ? '' : 's'} found
          {applied.location !== 'any' ? ` in ${locationState ? `${applied.location}, ${locationState}` : applied.location}` : ' across Australia'}
        </p>
      </div>

      {pills.length > 0 ? (
        <div className="apartments-active-filters apartments-container">
          {pills.map((pill) => (
            <button key={pill.key} type="button" className="filter-pill" onClick={pill.onRemove}>
              {pill.label} <span aria-hidden="true">×</span>
            </button>
          ))}
          <button type="button" className="filter-clear-all" onClick={clearAll}>
            Clear all
          </button>
        </div>
      ) : null}

      <div className="products-page-body apartments-container">
        <aside className="products-filters-desktop">
          <div className="filters-panel-heading">
            <h3>Filters</h3>
            <FilterIcon size={18} />
          </div>
          {filtersPanel}
        </aside>

        <div className="products-page-main">
          <div className="products-page-toolbar">
            <button
              type="button"
              className="btn-secondary products-filters-toggle"
              onClick={() => setFiltersOpen(true)}
            >
              Filters
            </button>
            <span className="products-count">{filtered.length} properties found</span>

            <div className="apartments-view-toggle" role="group" aria-label="List or map view">
              <button
                type="button"
                className={view === 'list' ? 'is-active' : ''}
                onClick={() => setView('list')}
                aria-pressed={view === 'list'}
              >
                List
              </button>
              <button
                type="button"
                className={view === 'map' ? 'is-active' : ''}
                onClick={() => setView('map')}
                aria-pressed={view === 'map'}
              >
                Map
              </button>
            </div>

            <button type="button" className="btn-ghost apartments-reset-filters" onClick={clearAll}>
              Reset Filters
            </button>

            <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
              <option value="recommended">Recommended</option>
              <option value="listed-desc">Newest listed</option>
              <option value="price-asc">Rent: Low to high</option>
              <option value="price-desc">Rent: High to low</option>
              <option value="availability">Availability</option>
            </select>

            <select
              value={pageSize}
              aria-label="Results per page"
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>

          {view === 'map' ? (
            <ApartmentsMapPanel properties={filtered} variant="full" />
          ) : (
            <div className="products-page-list-row">
              <div className="products-page-list-col">
                <div className="products-list">
                  {paged.map((property) => (
                    <PropertyCard key={property.id} property={property} layout="row" />
                  ))}
                </div>

                {filtered.length === 0 ? <p className="products-empty">No apartments match those filters.</p> : null}

                {filtered.length > 0 ? (
                  <div className="apartments-notify-banner">
                    <BellIcon size={22} />
                    <div className="apartments-notify-copy">
                      <strong>Don't miss out on your perfect apartment</strong>
                      <p>Save your search and we'll notify you when new apartments match your criteria.</p>
                    </div>
                    {searchSaved ? (
                      <span className="apartments-notify-confirm">Saved ✓</span>
                    ) : (
                      <div className="apartments-notify-actions">
                        <button type="button" className="btn-primary" onClick={() => setSearchSaved(true)}>
                          Save This Search
                        </button>
                        <button type="button" className="apartments-notify-alert" onClick={() => setSearchSaved(true)}>
                          Create alert →
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}

                {pageCount > 1 ? (
                  <nav className="apartments-pagination" aria-label="Pagination">
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={safePage === 1}
                    >
                      ←
                    </button>
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={n === safePage ? 'is-active' : ''}
                        aria-current={n === safePage}
                        onClick={() => setPage(n)}
                      >
                        {n}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                      disabled={safePage === pageCount}
                    >
                      →
                    </button>
                  </nav>
                ) : null}
              </div>

              <ApartmentsMapPanel properties={paged} variant="sidebar" />
            </div>
          )}
        </div>
      </div>

      {filtersOpen ? (
        <div className="filters-mobile-backdrop" onClick={() => setFiltersOpen(false)}>
          <div className="filters-mobile-panel" onClick={(event) => event.stopPropagation()}>
            <div className="filters-mobile-header">
              <h3>Filters</h3>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                ×
              </button>
            </div>
            {filtersPanel}
          </div>
        </div>
      ) : null}
    </div>
  );
}
