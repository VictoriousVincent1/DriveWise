// Mock vehicle data for ToyotaPath
import { Vehicle, FinanceOption } from '@/types';

export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla',
    year: 2024,
    price: 28500,
    mileage: 0,
    image: '/placeholder-corolla.jpg',
    description: 'XSE trim, 31 city / 40 hwy mpg, Apple CarPlay, Adaptive Cruise Control, Lane Departure Warning, Heated Front Seats, Moonroof',
  },
  {
    id: 2,
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 32400,
    mileage: 0,
    image: '/placeholder-camry.jpg',
    description: 'SE trim, 28 city / 39 hwy mpg, Toyota Safety Sense 3.0, Wireless Phone Charging, Power Driver Seat, LED Headlights, Sport Suspension',
  },
  {
    id: 3,
    make: 'Toyota',
    model: 'RAV4',
    year: 2024,
    price: 36800,
    mileage: 0,
    image: '/placeholder-rav4.jpg',
    description: 'XLE trim, 27 city / 35 hwy mpg, All-Wheel Drive, Power Liftgate, Blind Spot Monitor, SofTex Seats, 8-inch Touchscreen',
  },
  {
    id: 4,
    make: 'Toyota',
    model: 'Highlander',
    year: 2024,
    price: 42500,
    mileage: 0,
    image: '/placeholder-highlander.jpg',
    description: 'LE trim, 21 city / 29 hwy mpg, 3-Row Seating, Toyota Safety Sense 2.5+, Roof Rails, Tri-Zone Climate Control, 12.3-inch Touchscreen',
  },
  {
    id: 5,
    make: 'Toyota',
    model: 'Prius',
    year: 2024,
    price: 33200,
    mileage: 0,
    image: '/placeholder-prius.jpg',
    description: 'XLE trim, 57 city / 56 hwy mpg, Hybrid Technology, Panoramic Glass Roof, Heated Steering Wheel, 10-Speaker JBL Audio, Digital Rearview Mirror',
  },
  {
    id: 6,
    make: 'Toyota',
    model: 'Tacoma',
    year: 2024,
    price: 38900,
    mileage: 0,
    image: '/placeholder-tacoma.jpg',
    description: 'SR5 trim, 19 city / 24 hwy mpg, 4x4 Off-Road Package, Double Cab, Tow Package, Bed Liner, Multi-Terrain Select',
  },
  {
    id: 7,
    make: 'Toyota',
    model: 'Camry Hybrid',
    year: 2024,
    price: 30500,
    mileage: 0,
    image: '/placeholder-camry-hybrid.jpg',
    description: 'LE trim, 51 city / 53 hwy mpg, Hybrid Synergy Drive, Eco & Sport Drive Modes, Smart Key System, 7-inch Display, Rear Camera',
  },
  {
    id: 8,
    make: 'Toyota',
    model: 'RAV4 Prime',
    year: 2024,
    price: 45200,
    mileage: 0,
    image: '/placeholder-rav4-prime.jpg',
    description: 'SE trim, 94 MPGe combined, Plug-In Hybrid, 42 miles electric range, 302 HP combined, Sport-Tuned Suspension, 9-inch Touchscreen',
  },
];

export const mockFinancingOptions: FinanceOption[] = [
  {
    id: 1,
    name: 'Lease',
    interestRate: 0,
    termMonths: 36,
    minDownPayment: 2500,
  },
  {
    id: 2,
    name: 'Finance',
    interestRate: 4.9,
    termMonths: 60,
    minDownPayment: 3000,
  },
  {
    id: 3,
    name: 'Finance',
    interestRate: 3.9,
    termMonths: 60,
    minDownPayment: 5000,
  },
  {
    id: 4,
    name: 'Cash',
    interestRate: 0,
    termMonths: 0,
    minDownPayment: 28500,
  },
];

export function getVehicleById(id: number): Vehicle | undefined {
  return mockVehicles.find(vehicle => vehicle.id === id);
}

export function getVehiclesByPriceRange(minPrice: number, maxPrice: number): Vehicle[] {
  return mockVehicles.filter(
    vehicle => (vehicle.price ?? 0) >= minPrice && (vehicle.price ?? 0) <= maxPrice
  );
}

export function getVehiclesInStock(): Vehicle[] {
  // No inStock property in Vehicle type, so just return all for now
  return mockVehicles;
}

export function getFinancingForVehicle(vehicleId: number): FinanceOption[] {
  // In a real app, this would be calculated based on the vehicle
  return mockFinancingOptions;
}
