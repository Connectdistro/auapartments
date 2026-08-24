import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SiteNav from './SiteNav';
import Footer from './Footer';
import MobileActionBar from './MobileActionBar';
import { PropertyEnquiryProvider } from '../hooks/usePropertyEnquiry';
import './layout.css';

export default function Layout() {
  const location = useLocation();
  const reduced = useReducedMotion();

  return (
    <PropertyEnquiryProvider>
      <div className="site-shell">
        <SiteNav />
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: reduced ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <MobileActionBar />
      </div>
    </PropertyEnquiryProvider>
  );
}
