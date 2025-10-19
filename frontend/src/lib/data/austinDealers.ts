// Mock list of Toyota and Lexus dealerships within ~50 miles of Austin, TX
// Note: Coordinates and details are approximate for demo purposes.
export type AustinDealer = {
  id: string;
  name: string;
  brand: 'Toyota' | 'Lexus';
  address: string;
  city: string;
  state: 'TX';
  zipCode: string;
  lat: number;
  lon: number;
  phone?: string;
  website?: string;
};

export const AUSTIN_CENTER = { lat: 30.2672, lon: -97.7431 };

export const austinDealers: AustinDealer[] = [
  {
    id: 'toyota-north-austin',
    name: 'Toyota of North Austin',
    brand: 'Toyota',
    address: '8400 Research Blvd',
    city: 'Austin',
    state: 'TX',
    zipCode: '78758',
    lat: 30.369, lon: -97.721,
    phone: '(512) 000-0000',
  },
  {
    id: 'autonation-toyota-south-austin',
    name: 'AutoNation Toyota South Austin',
    brand: 'Toyota',
    address: '4800 S I-35 Frontage Rd',
    city: 'Austin',
    state: 'TX',
    zipCode: '78745',
    lat: 30.211, lon: -97.752,
  },
  {
    id: 'round-rock-toyota',
    name: 'Round Rock Toyota',
    brand: 'Toyota',
    address: '2307 N Interstate Hwy 35',
    city: 'Round Rock',
    state: 'TX',
    zipCode: '78665',
    lat: 30.529, lon: -97.688,
  },
  {
    id: 'toyota-of-cedar-park',
    name: 'Toyota of Cedar Park',
    brand: 'Toyota',
    address: '5600 183A Frontage Rd',
    city: 'Cedar Park',
    state: 'TX',
    zipCode: '78613',
    lat: 30.506, lon: -97.830,
  },
  {
    id: 'san-marcos-toyota',
    name: 'San Marcos Toyota',
    brand: 'Toyota',
    address: '5101 S IH 35',
    city: 'San Marcos',
    state: 'TX',
    zipCode: '78666',
    lat: 29.840, lon: -97.974,
  },
  {
    id: 'lexus-of-austin',
    name: 'Lexus of Austin',
    brand: 'Lexus',
    address: '9910 Stonelake Blvd',
    city: 'Austin',
    state: 'TX',
    zipCode: '78759',
    lat: 30.390, lon: -97.737,
  },
  {
    id: 'lexus-of-lakeway',
    name: 'Lexus of Lakeway',
    brand: 'Lexus',
    address: '108 Ranch Rd 620 S',
    city: 'Lakeway',
    state: 'TX',
    zipCode: '78738',
    lat: 30.354, lon: -97.973,
  },
  {
    id: 'toyota-bastrop',
    name: 'Lost Pines Toyota',
    brand: 'Toyota',
    address: '806 TX-71 W',
    city: 'Bastrop',
    state: 'TX',
    zipCode: '78602',
    lat: 30.106, lon: -97.326,
  },
];

export function milesBetween(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 3958.8; // Earth radius (miles)
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
