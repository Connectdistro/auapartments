import { Link } from 'react-router-dom';
import { PROPERTIES } from '../data/properties';
import { useFavorites } from '../hooks/useFavorites';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PropertyCard from '../components/PropertyCard';

export default function SavedApartmentsPage() {
  useDocumentTitle('Saved apartments', "Apartments you've saved on AUSTAY, stored on this device.");
  const { favorites } = useFavorites();
  const saved = PROPERTIES.filter((property) => favorites.has(property.id));

  return (
    <div className="saved-page">
      <div className="page-hero">
        <span className="eyebrow">Saved</span>
        <h1>Your saved apartments</h1>
        <p>Apartments you've saved on this device. Saved apartments aren't linked to an account — they live only
          in this browser.</p>
      </div>

      <div className="products-grid page-container">
        {saved.length === 0 ? (
          <p className="products-empty">
            Nothing saved yet. <Link to="/apartments">Browse apartments →</Link>
          </p>
        ) : (
          saved.map((property) => <PropertyCard key={property.id} property={property} />)
        )}
      </div>
    </div>
  );
}
