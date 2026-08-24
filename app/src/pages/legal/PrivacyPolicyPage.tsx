import LegalPageLayout from '../../components/LegalPageLayout';
import { CONTACT } from '../../data/contact';

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Privacy Policy" updated="22 August 2026">
      <h2>1. Who we are</h2>
      <p>
        {CONTACT.businessName} ("AuApartments", "we", "us") operates the AuApartments website, which advertises
        rental apartments across Australia. This policy explains what personal information we collect, how we use
        it, and the choices you have.
      </p>

      <h2>2. Information we collect</h2>
      <p>We collect information you provide directly, such as when you:</p>
      <ul>
        <li>Submit a property enquiry (name, email, phone, preferred move-in date, message)</li>
        <li>Use the contact form (name, email, phone, message)</li>
        <li>Save an apartment to your list (stored only in your browser — see section 4)</li>
      </ul>
      <p>
        We also collect limited technical information automatically (browser type, device type, pages viewed) to
        keep the site working correctly and secure.
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To respond to enquiries and coordinate inspections or applications</li>
        <li>To operate, maintain, and improve the website</li>
        <li>To meet legal and accounting obligations</li>
        <li>To communicate important updates about an enquiry or application</li>
      </ul>
      <p>We do not sell your personal information to third parties.</p>

      <h2>4. Saved apartments</h2>
      <p>
        The "Saved" feature stores a list of apartment IDs in your browser's local storage. It is not linked to your
        identity and is not sent to us unless you submit an enquiry.
      </p>

      <h2>5. Data retention</h2>
      <p>
        We retain personal information only as long as necessary for the purposes described in this policy, or as
        required by law (for example, record-keeping obligations under Australian tenancy and consumer law).
      </p>

      <h2>6. Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information by contacting us at{' '}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about this policy can be sent to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
