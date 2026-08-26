import LegalPageLayout from '../../components/LegalPageLayout';
import { CONTACT } from '../../data/contact';

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Terms of Service" updated="22 August 2026">
      <h2>1. Acceptance of terms</h2>
      <p>
        By using the AUSTAY website, you agree to these Terms of Service. If you do not agree, please do not
        use the site.
      </p>

      <h2>2. What AUSTAY is</h2>
      <p>
        AUSTAY advertises apartments available for rent across Australia and helps prospective tenants
        enquire about, inspect, and apply for a property. Submitting an enquiry through this site does not itself
        create a tenancy — a tenancy is only formed once a formal rental application and lease agreement are
        completed with {CONTACT.businessName} or the relevant property manager.
      </p>

      <h2>3. Accuracy of listings</h2>
      <p>
        We make reasonable efforts to keep listing information (rent, availability, features) accurate and
        current, but availability can change quickly. Always confirm current details before making decisions based
        on a listing.
      </p>

      <h2>4. Enquiries and applications</h2>
      <p>
        You agree to provide accurate information when submitting an enquiry or application, and not to use the
        site for unlawful or fraudulent purposes. Rental applications may require additional identity and
        reference checks conducted outside this website.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        Photography, floor plans, and descriptions published on this site remain the property of{' '}
        {CONTACT.businessName} or the relevant property owner. The AUSTAY name, logo, and site design are the
        property of {CONTACT.businessName}.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the extent permitted by law, {CONTACT.businessName} is not liable for indirect or consequential loss
        arising from your use of the site, including decisions made based on listing information later found to be
        out of date.
      </p>

      <h2>7. Governing law</h2>
      <p>These terms are governed by the laws of Victoria, Australia.</p>

      <h2>8. Changes to these terms</h2>
      <p>We may update these terms from time to time. Continued use of the site means you accept the changes.</p>

      <h2>9. Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
