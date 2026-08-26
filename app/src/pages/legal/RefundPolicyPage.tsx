import LegalPageLayout from '../../components/LegalPageLayout';
import { CONTACT } from '../../data/contact';

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Refund Policy" updated="22 August 2026">
      <h2>1. Overview</h2>
      <p>
        AUSTAY does not charge a fee to browse listings, submit an enquiry, or apply for a property. This
        policy explains the two situations where money changes hands before a lease begins: holding deposits and
        rental bonds.
      </p>

      <h2>2. Holding deposits</h2>
      <p>
        Where a holding deposit is requested to reserve a property while an application is processed, it is fully
        refunded if your application is unsuccessful. If you withdraw your application after paying a holding
        deposit, or fail to proceed without reasonable cause, the deposit may be forfeited in line with the rules of
        your state or territory's tenancy legislation, which vary and take precedence over this policy.
      </p>

      <h2>3. Rental bonds</h2>
      <p>
        A rental bond is not paid to {CONTACT.businessName} — it is lodged with your state or territory's official
        bond authority for the life of the tenancy and is refunded through that authority at the end of the lease,
        subject to the condition report and any agreed deductions.
      </p>

      <h2>4. No application fees</h2>
      <p>We do not charge prospective tenants a fee to submit a rental application.</p>

      <h2>5. Questions about a specific payment</h2>
      <p>
        If you believe you're owed a refund of a holding deposit, contact us at{' '}
        <a href={`mailto:${CONTACT.supportEmail}`}>{CONTACT.supportEmail}</a> with your name and the property
        address, and we'll respond within 5 business days.
      </p>
    </LegalPageLayout>
  );
}
