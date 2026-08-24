import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Property } from '../data/properties';
import PropertyEnquiryModal from '../components/PropertyEnquiryModal';

interface PropertyEnquiryContextValue {
  openEnquiry: (property: Property) => void;
}

const PropertyEnquiryContext = createContext<PropertyEnquiryContextValue | null>(null);

export function PropertyEnquiryProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<Property | null>(null);

  const openEnquiry = useCallback((property: Property) => {
    setTarget(property);
  }, []);

  const closeEnquiry = useCallback(() => setTarget(null), []);

  return (
    <PropertyEnquiryContext.Provider value={{ openEnquiry }}>
      {children}
      <PropertyEnquiryModal property={target} onClose={closeEnquiry} />
    </PropertyEnquiryContext.Provider>
  );
}

export function usePropertyEnquiry(): PropertyEnquiryContextValue {
  const ctx = useContext(PropertyEnquiryContext);
  if (!ctx) throw new Error('usePropertyEnquiry must be used within PropertyEnquiryProvider');
  return ctx;
}
