// Mock vehicle data for ToyotaPath
import { Vehicle, FinancingOption } from '@/types';

export const mockVehicles: Vehicle[] = [
  {
    id: 'veh-1',
    make: 'Toyota',
    model: 'Corolla',
    year: 2024,
    trim: 'XSE',
    price: 28500,
    msrp: 30200,
    imageUrl: '/placeholder-corolla.jpg',
    mpg: '31 city / 40 hwy',
    fuelEconomy: { city: 31, highway: 40 },
    category: 'sedan',
    features: [
      'Apple CarPlay & Android Auto',
      'Adaptive Cruise Control',
      'Lane Departure Warning',
      'Heated Front Seats',
      'Moonroof',
    ],
    inStock: true,
  },
  {
    id: 'veh-2',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    trim: 'SE',
    price: 32400,
    msrp: 34500,
    imageUrl: '/placeholder-camry.jpg',
    mpg: '28 city / 39 hwy',
    fuelEconomy: { city: 28, highway: 39 },
    category: 'sedan',
    features: [
      'Toyota Safety Sense 3.0',
      'Wireless Phone Charging',
      'Power Driver Seat',
      'LED Headlights',
      'Sport Suspension',
    ],
    inStock: true,
  },
  {
    id: 'veh-3',
    make: 'Toyota',
    model: 'RAV4',
    year: 2024,
    trim: 'XLE',
    price: 36800,
    msrp: 38900,
    imageUrl: '/placeholder-rav4.jpg',
    mpg: '27 city / 35 hwy',
    fuelEconomy: { city: 27, highway: 35 },
    category: 'suv',
    features: [
      'All-Wheel Drive',
      'Power Liftgate',
      'Blind Spot Monitor',
      'SofTex Seats',
      '8-inch Touchscreen',
    ],
    inStock: true,
  },
  {
    id: 'veh-4',
    make: 'Toyota',
    model: 'Highlander',
    year: 2024,
    trim: 'LE',
    price: 42500,
    msrp: 44800,
    imageUrl: '/placeholder-highlander.jpg',
    mpg: '21 city / 29 hwy',
    fuelEconomy: { city: 21, highway: 29 },
    category: 'suv',
    features: [
      '3-Row Seating (8 passengers)',
      'Toyota Safety Sense 2.5+',
      'Roof Rails',
      'Tri-Zone Climate Control',
      '12.3-inch Touchscreen',
    ],
    inStock: true,
  },
  {
    id: 'veh-5',
    make: 'Toyota',
    model: 'Prius',
    year: 2024,
    trim: 'XLE',
    price: 33200,
    msrp: 35000,
    imageUrl: '/placeholder-prius.jpg',
    mpg: '57 city / 56 hwy',
    fuelEconomy: { city: 57, highway: 56 },
    category: 'hybrid',
    features: [
      'Hybrid Technology',
      'Panoramic Glass Roof',
      'Heated Steering Wheel',
      '10-Speaker JBL Audio',
      'Digital Rearview Mirror',
    ],
    inStock: true,
  },
  {
    id: 'veh-6',
    make: 'Toyota',
    model: 'Tacoma',
    year: 2024,
    trim: 'SR5',
    price: 38900,
    msrp: 40500,
    imageUrl: '/placeholder-tacoma.jpg',
    mpg: '19 city / 24 hwy',
    fuelEconomy: { city: 19, highway: 24 },
    category: 'truck',
    features: [
      '4x4 Off-Road Package',
      'Double Cab',
      'Tow Package',
      'Bed Liner',
      'Multi-Terrain Select',
    ],
    inStock: true,
  },
  {
    id: 'veh-7',
    make: 'Toyota',
    model: 'Camry Hybrid',
    year: 2024,
    trim: 'LE',
    price: 30500,
    msrp: 32200,
    imageUrl: '/placeholder-camry-hybrid.jpg',
    mpg: '51 city / 53 hwy',
    fuelEconomy: { city: 51, highway: 53 },
    category: 'hybrid',
    features: [
      'Hybrid Synergy Drive',
      'Eco & Sport Drive Modes',
      'Smart Key System',
      '7-inch Display',
      'Rear Camera',
    ],
    inStock: true,
  },
  {
    id: 'veh-8',
    make: 'Toyota',
    model: 'RAV4 Prime',
    year: 2024,
    trim: 'SE',
    price: 45200,
    msrp: 47800,
    imageUrl: '/placeholder-rav4-prime.jpg',
    mpg: '94 MPGe combined',
    fuelEconomy: { city: 94, highway: 94 },
    category: 'electric',
    features: [
      'Plug-In Hybrid',
      '42 miles electric range',
      '302 HP combined',
      'Sport-Tuned Suspension',
      '9-inch Touchscreen',
    ],
    inStock: false,
  },
];

export const mockFinancingOptions: FinancingOption[] = [
  {
    id: 'fin-1',
    type: 'lease',
    monthlyPayment: 358,
    downPayment: 2500,
    term: 36,
    milesPerYear: 12000,
    totalCost: 15388,
  },
  {
    id: 'fin-2',
    type: 'finance',
    monthlyPayment: 529,
    downPayment: 3000,
    term: 60,
    apr: 4.9,
    totalCost: 34740,
  },
  {
    id: 'fin-3',
    type: 'finance',
    monthlyPayment: 445,
    downPayment: 5000,
    term: 60,
    apr: 3.9,
    totalCost: 31700,
  },
  {
    id: 'fin-4',
    type: 'cash',
    monthlyPayment: 0,
    downPayment: 28500,
    totalCost: 28500,
  },
];

export function getVehicleById(id: string): Vehicle | undefined {
  return mockVehicles.find(vehicle => vehicle.id === id);
}

export function getVehiclesByPriceRange(minPrice: number, maxPrice: number): Vehicle[] {
  return mockVehicles.filter(
    vehicle => vehicle.price >= minPrice && vehicle.price <= maxPrice
  );
}

export function getVehiclesInStock(): Vehicle[] {
  return mockVehicles.filter(vehicle => vehicle.inStock);
}

export function getFinancingForVehicle(vehicleId: string): FinancingOption[] {
  // In a real app, this would be calculated based on the vehicle
  return mockFinancingOptions;
}
