import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import './site.css';

const Home = lazy(() => import('./pages/Home'));
const ApartmentsPage = lazy(() => import('./pages/ApartmentsPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const LocationsPage = lazy(() => import('./pages/LocationsPage'));
const SavedApartmentsPage = lazy(() => import('./pages/SavedApartmentsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/legal/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/legal/TermsOfServicePage'));
const RefundPolicyPage = lazy(() => import('./pages/legal/RefundPolicyPage'));
const ShippingPolicyPage = lazy(() => import('./pages/legal/ShippingPolicyPage'));
const CancellationPolicyPage = lazy(() => import('./pages/legal/CancellationPolicyPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="apartments" element={<ApartmentsPage />} />
            <Route path="apartments/:slug" element={<PropertyDetailPage />} />
            <Route path="locations" element={<LocationsPage />} />
            <Route path="saved" element={<SavedApartmentsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-of-service" element={<TermsOfServicePage />} />
            <Route path="refund-policy" element={<RefundPolicyPage />} />
            <Route path="shipping-policy" element={<ShippingPolicyPage />} />
            <Route path="cancellation-policy" element={<CancellationPolicyPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
