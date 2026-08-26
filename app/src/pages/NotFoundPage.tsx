import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ArrowRightIcon } from '../components/icons';

export default function NotFoundPage() {
  useDocumentTitle('Page not found', "The page you're looking for doesn't exist or may have moved.");

  return (
    <div className="page-hero">
      <span className="eyebrow">404</span>
      <h1>We couldn't find that page</h1>
      <p>
        It may have been moved or no longer exists. <Link to="/">Back to home →</Link> or{' '}
        <Link to="/locations">explore stays across Australia</Link>.
      </p>
      <Link to="/" className="btn-primary not-found-cta">
        Back to Home <ArrowRightIcon size={16} />
      </Link>
    </div>
  );
}
