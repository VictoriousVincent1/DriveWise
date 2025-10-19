// Mock dealer data for ToyotaPath
import { Dealer, Vehicle } from '@/types';
import { mockVehicles } from './vehicles';

export const mockDealers: Dealer[] = [
  {
    id: 'dealer-1',
    name: 'Eastside Toyota Center',
    distance: 8.7,
    rating: 4.9,
    address: '1234 Eastside Blvd, Seattle, WA 98101',
    phone: '(206) 555-0100',
    specialOffer: '$2,500 loyalty rebate on select models',
    imageUrl: '/placeholder-dealer.jpg',
    inventory: mockVehicles.slice(0, 5),
  },
  {
    id: 'dealer-2',
    name: 'Toyota of Downtown',
    distance: 2.3,
    rating: 4.8,
    address: '567 Downtown Ave, Seattle, WA 98102',
    phone: '(206) 555-0200',
    specialOffer: '0% APR for 60 months',
    imageUrl: '/placeholder-dealer.jpg',
    inventory: mockVehicles.slice(2, 7),
  },
  {
    id: 'dealer-3',
    name: 'Northside Toyota',
    distance: 5.1,
    rating: 4.6,
    address: '890 Northside Dr, Seattle, WA 98103',
    phone: '(206) 555-0300',
    specialOffer: 'Free maintenance for 2 years',
    imageUrl: '/placeholder-dealer.jpg',
    inventory: mockVehicles.slice(1, 6),
  },
  {
    id: 'dealer-4',
    name: 'Westside Toyota Sales',
    distance: 12.4,
    rating: 4.7,
    address: '321 Westside Pkwy, Seattle, WA 98104',
    phone: '(206) 555-0400',
    specialOffer: '$1,000 off MSRP this month',
    imageUrl: '/placeholder-dealer.jpg',
    inventory: mockVehicles.slice(0, 4),
  },
  {
    id: 'dealer-5',
    name: 'Premier Toyota Center',
    distance: 15.8,
    rating: 4.5,
    address: '654 Premier Way, Bellevue, WA 98005',
    phone: '(425) 555-0500',
    specialOffer: 'Trade-in bonus up to $3,000',
    imageUrl: '/placeholder-dealer.jpg',
    inventory: mockVehicles.slice(3, 8),
  },
];

export function getDealerById(id: string): Dealer | undefined {
  return mockDealers.find(dealer => dealer.id === id);
}

export function getDealersNearby(maxDistance: number = 10): Dealer[] {
  return mockDealers.filter(dealer => dealer.distance <= maxDistance);
}

export function getTopRatedDealers(minRating: number = 4.5): Dealer[] {
  return mockDealers
    .filter(dealer => dealer.rating >= minRating)
    .sort((a, b) => b.rating - a.rating);
}
