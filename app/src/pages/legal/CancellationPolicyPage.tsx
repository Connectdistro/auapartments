import LegalPageLayout from '../../components/LegalPageLayout';
import { CONTACT } from '../../data/contact';

export default function CancellationPolicyPage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Cancellation Policy" updated="22 August 2026">
      <h2>1. Enquiries and applications</h2>
      <p>
        You may withdraw a property enquiry or a rental application at any time before a lease is signed, free of
        charge, by contacting us. See our Refund Policy for what happens to a holding deposit if you withdraw after
        one has been paid.
      </p>

      <h2>2. Inspections</h2>
      <p>
        If you've booked a property inspection and need to cancel or reschedule, please let us know as early as
        possible so the time can be offered to someone else.
      </p>

      <h2>3. Signed leases</h2>
      <p>
        Once a lease is signed, ending or breaking the tenancy is governed by the residential tenancy legislation
        in your state or territory and by the terms of your specific lease agreement — not by this website. Speak
        to your property manager about your options if your circumstances change.
      </p>

      <h2>4. How to cancel an enquiry or application</h2>
      <p>
        Email <a href={`mailto:${CONTACT.supportEmail}`}>{CONTACT.supportEmail}</a> with the property address and
        your name. We aim to confirm within 1 business day.
      </p>
    </LegalPageLayout>
  );
}
