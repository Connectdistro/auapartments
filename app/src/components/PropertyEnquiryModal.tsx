import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Property } from '../data/properties';
import { formatWeeklyRent } from '../data/properties';
import EnquiryForm from './EnquiryForm';

interface PropertyEnquiryModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function PropertyEnquiryModal({ property, onClose }: PropertyEnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    setSubmitted(false);
  };

  return (
    <AnimatePresence>
      {property ? (
        <motion.div
          className="modal-backdrop"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="modal-panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Enquire about ${property.title}`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="modal-close" onClick={handleClose} aria-label="Close">
              ×
            </button>

            {submitted ? null : (
              <>
                <span className="eyebrow">
                  {property.title} · {formatWeeklyRent(property.weeklyRent)}
                </span>
                <h3>Enquire about this apartment</h3>
              </>
            )}
            <EnquiryForm property={property} onSubmitted={() => setSubmitted(true)} />
            {submitted ? (
              <button type="button" className="btn-primary" onClick={handleClose}>
                Done
              </button>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
