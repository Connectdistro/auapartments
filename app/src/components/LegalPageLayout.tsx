import type { ReactNode } from 'react';
import { CONTACT } from '../data/contact';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}

export default function LegalPageLayout({ eyebrow, title, updated, children }: LegalPageLayoutProps) {
  useDocumentTitle(title, `Read AUSTAY's ${title.toLowerCase()}, last updated ${updated}.`);
  return (
    <div className="legal-page">
      <div className="page-hero">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>Last updated {updated}</p>
      </div>

      <div className="legal-body page-container">
        <div className="legal-notice">
          <strong>Template notice:</strong> this page is a starting-point draft for {CONTACT.businessName}, not
          legal advice. Have it reviewed by a qualified professional and updated with your actual business
          details before publishing.
        </div>

        <div className="legal-prose">{children}</div>
      </div>
    </div>
  );
}
