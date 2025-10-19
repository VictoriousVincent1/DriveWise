// Mock dealer data for ToyotaPath

import { Dealer, Vehicle } from '@/types';
import { mockVehicles } from './vehicles';

export const mockDealers: Dealer[] = [
  {
    id: 1,
    name: 'Eastside Toyota Center',
    location: '1234 Eastside Blvd, Seattle, WA 98101',
    phone: '(206) 555-0100',
    email: 'eastside@toyota.com',
    inventory: mockVehicles.slice(0, 5),
  },
  {
    id: 2,
    name: 'Toyota of Downtown',
    location: '567 Downtown Ave, Seattle, WA 98102',
    phone: '(206) 555-0200',
    email: 'downtown@toyota.com',
    inventory: mockVehicles.slice(2, 7),
  },
  {
    id: 3,
    name: 'Northside Toyota',
    location: '890 Northside Dr, Seattle, WA 98103',
    phone: '(206) 555-0300',
    email: 'northside@toyota.com',
    inventory: mockVehicles.slice(1, 6),
  },
  {
    id: 4,
    name: 'Westside Toyota Sales',
    location: '321 Westside Pkwy, Seattle, WA 98104',
    phone: '(206) 555-0400',
    email: 'westside@toyota.com',
    inventory: mockVehicles.slice(0, 4),
  },
  {
    id: 5,
    name: 'Premier Toyota Center',
    location: '654 Premier Way, Bellevue, WA 98005',
    phone: '(425) 555-0500',
    email: 'premier@toyota.com',
    inventory: mockVehicles.slice(3, 8),
  },
];

export function getDealerById(id: number): Dealer | undefined {
  return mockDealers.find(dealer => dealer.id === id);
}
