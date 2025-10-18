import { Dealer } from '@/types';

export const mockDealers: Dealer[] = [
  {
    id: 'dealer_001',
    name: 'Toyota of Downtown',
    address: '123 Main Street',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    phone: '(206) 555-0100',
    rating: 4.8,
    distance: 2.3,
    inventory: ['camry-2024-xle', 'rav4-2024-xle', 'highlander-2024-xle', 'prius-2024-limited'],
    specialOffers: ['0% APR for 60 months on select models', '$1,000 college grad rebate'],
  },
  {
    id: 'dealer_002',
    name: 'Northside Toyota',
    address: '456 North Ave',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98103',
    phone: '(206) 555-0200',
    rating: 4.6,
    distance: 5.1,
    inventory: ['camry-2024-se', 'corolla-2024-xse', 'tacoma-2024-trd-sport', 'tundra-2024-sr5'],
    specialOffers: ['First responder discount', 'Free maintenance for 2 years'],
  },
  {
    id: 'dealer_003',
    name: 'Eastside Toyota Center',
    address: '789 Bellevue Way',
    city: 'Bellevue',
    state: 'WA',
    zipCode: '98004',
    phone: '(425) 555-0300',
    rating: 4.9,
    distance: 8.7,
    inventory: ['rav4-2024-adventure', 'highlander-2024-xle', 'bz4x-2024-limited'],
    specialOffers: ['$2,500 loyalty rebate for current Toyota owners', 'Extended warranty available'],
  },
  {
    id: 'dealer_004',
    name: 'South Seattle Toyota',
    address: '321 Pacific Hwy',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98188',
    phone: '(206) 555-0400',
    rating: 4.5,
    distance: 12.4,
    inventory: ['camry-2024-xle', 'camry-2024-se', 'corolla-2024-xse', 'prius-2024-limited'],
    specialOffers: ['Military discount program', 'Complimentary vehicle delivery'],
  },
];

export function getDealerById(id: string): Dealer | undefined {
  return mockDealers.find(d => d.id === id);
}

export function getDealersWithVehicle(vehicleId: string): Dealer[] {
  return mockDealers.filter(d => d.inventory.includes(vehicleId));
}

export function getNearestDealers(maxDistance: number = 10): Dealer[] {
  return mockDealers.filter(d => d.distance <= maxDistance).sort((a, b) => a.distance - b.distance);
}
