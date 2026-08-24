/**
 * Curated list of Australian capital/major cities shown on the Locations
 * page. Positions are rough relative placements on a simplified Australia
 * outline (percent of the map panel's width/height) — illustrative, not
 * geodata-accurate.
 */
export interface CityLocation {
  city: string;
  state: string;
  mapPosition: { left: string; top: string };
}

export const POPULAR_LOCATIONS: CityLocation[] = [
  { city: 'Melbourne', state: 'Victoria', mapPosition: { left: '66%', top: '78%' } },
  { city: 'Sydney', state: 'New South Wales', mapPosition: { left: '82%', top: '62%' } },
  { city: 'Brisbane', state: 'Queensland', mapPosition: { left: '84%', top: '38%' } },
  { city: 'Gold Coast', state: 'Queensland', mapPosition: { left: '85%', top: '46%' } },
  { city: 'Perth', state: 'Western Australia', mapPosition: { left: '10%', top: '58%' } },
  { city: 'Adelaide', state: 'South Australia', mapPosition: { left: '52%', top: '68%' } },
  { city: 'Canberra', state: 'Australian Capital Territory', mapPosition: { left: '76%', top: '68%' } },
  { city: 'Hobart', state: 'Tasmania', mapPosition: { left: '72%', top: '94%' } },
];
