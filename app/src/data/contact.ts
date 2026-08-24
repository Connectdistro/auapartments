/**
 * Placeholder business contact details — replace with the real phone
 * number, email, ABN/ACN, and registered address before this site goes live.
 */
export const CONTACT = {
  businessName: 'AuApartments Pty Ltd',
  phone: '+61400000000',
  phoneDisplay: '0400 000 000',
  email: 'hello@auapartments.example',
  supportEmail: 'support@auapartments.example',
  city: 'Melbourne, VIC, Australia',
  abn: 'ABN 00 000 000 000',
};

export interface OfficeLocation {
  city: string;
  addressLines: string[];
}

/** Placeholder office address — replace with the real registered office before launch. */
export const HEAD_OFFICE: OfficeLocation = {
  city: 'Melbourne',
  addressLines: ['Level 8, 99 Collins Street', 'Melbourne VIC 3000', 'Australia'],
};

export const OFFICE_HOURS = {
  weekdays: 'Monday – Friday: 9:00am – 5:00pm (AEST)',
  weekend: 'Saturday – Sunday: Closed',
};

/** Placeholder satellite offices — replace with real addresses before launch. */
export const OTHER_OFFICES: OfficeLocation[] = [
  { city: 'Sydney', addressLines: ['Level 5, 201 Elizabeth St', 'Sydney NSW 2000'] },
  { city: 'Brisbane', addressLines: ['Level 3, 240 Queen St', 'Brisbane QLD 4000'] },
  { city: 'Perth', addressLines: ['Level 2, 123 St Georges Tce', 'Perth WA 6000'] },
  { city: 'Adelaide', addressLines: ['Level 4, 50 Pirie St', 'Adelaide SA 5000'] },
];

/** Placeholder social handles — replace with the real profile URLs before launch. */
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/auapartments',
  instagram: 'https://instagram.com/auapartments',
  linkedin: 'https://linkedin.com/company/auapartments',
};
