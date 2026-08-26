import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/** Route guard — redirects signed-out visitors to /sign-in, remembering
 * where they were headed so SignInPage can send them back after auth. */
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for the stored session to be checked before deciding — otherwise an
  // already signed-in visitor gets bounced during the instant before it loads.
  if (loading) return null;

  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
