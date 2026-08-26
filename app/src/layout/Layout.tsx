import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SiteNav from './SiteNav';
import Footer from './Footer';
import MobileActionBar from './MobileActionBar';
import Reveal from '../components/Reveal';
import { PropertyEnquiryProvider } from '../hooks/usePropertyEnquiry';
import { AuthProvider } from '../hooks/useAuth';
import './layout.css';

export default function Layout() {
  const location = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <AuthProvider>
      <PropertyEnquiryProvider>
        <div className="site-shell">
          <SiteNav />
          <main>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: reduced ? 0 : 10, scale: reduced ? 1 : 0.995 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: reduced ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{
                  opacity: 0,
                  y: reduced ? 0 : -6,
                  transition: { duration: reduced ? 0.1 : 0.22, ease: [0.4, 0, 1, 1] },
                }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>

          <div className="footer-stack">
            <Reveal delay={0.05}>
              <Footer />
            </Reveal>
          </div>

          <MobileActionBar />
        </div>
      </PropertyEnquiryProvider>
    </AuthProvider>
  );
}
