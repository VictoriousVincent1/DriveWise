import { Vehicle } from '@/types';

export const mockVehicles: Vehicle[] = [
  {
    id: 'camry-2024-xle',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    trim: 'XLE',
    msrp: 31170,
    image: '/vehicles/camry-xle.jpg',
    features: ['Adaptive Cruise Control', 'Leather Seats', 'Sunroof', 'Apple CarPlay'],
    fuelEconomy: { city: 28, highway: 39 },
    category: 'sedan',
  },
  {
    id: 'camry-2024-se',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    trim: 'SE',
    msrp: 27165,
    image: '/vehicles/camry-se.jpg',
    features: ['Sport Tuned Suspension', 'Push Button Start', 'Bluetooth'],
    fuelEconomy: { city: 28, highway: 39 },
    category: 'sedan',
  },
  {
    id: 'rav4-2024-xle',
    make: 'Toyota',
    model: 'RAV4',
    year: 2024,
    trim: 'XLE',
    msrp: 32285,
    image: '/vehicles/rav4-xle.jpg',
    features: ['AWD', 'Power Liftgate', 'Blind Spot Monitor', '8-inch Touchscreen'],
    fuelEconomy: { city: 27, highway: 35 },
    category: 'suv',
  },
  {
    id: 'rav4-2024-adventure',
    make: 'Toyota',
    model: 'RAV4',
    year: 2024,
    trim: 'Adventure',
    msrp: 35765,
    image: '/vehicles/rav4-adventure.jpg',
    features: ['AWD', 'Off-Road Package', 'Roof Rails', 'All-Terrain Tires'],
    fuelEconomy: { city: 27, highway: 34 },
    category: 'suv',
  },
  {
    id: 'highlander-2024-xle',
    make: 'Toyota',
    model: 'Highlander',
    year: 2024,
    trim: 'XLE',
    msrp: 42665,
    image: '/vehicles/highlander-xle.jpg',
    features: ['3-Row Seating', 'AWD', 'Tri-Zone Climate Control', 'Panoramic Moonroof'],
    fuelEconomy: { city: 21, highway: 29 },
    category: 'suv',
  },
  {
    id: 'tacoma-2024-trd-sport',
    make: 'Toyota',
    model: 'Tacoma',
    year: 2024,
    trim: 'TRD Sport',
    msrp: 37555,
    image: '/vehicles/tacoma-trd.jpg',
    features: ['4WD', 'Sport Tuned Suspension', 'LED Headlights', 'Towing Package'],
    fuelEconomy: { city: 18, highway: 22 },
    category: 'truck',
  },
  {
    id: 'prius-2024-limited',
    make: 'Toyota',
    model: 'Prius',
    year: 2024,
    trim: 'Limited',
    msrp: 32675,
    image: '/vehicles/prius-limited.jpg',
    features: ['Hybrid', 'Solar Roof', 'Premium Audio', 'Wireless Charging'],
    fuelEconomy: { city: 57, highway: 56 },
    category: 'hybrid',
  },
  {
    id: 'bz4x-2024-limited',
    make: 'Toyota',
    model: 'bZ4X',
    year: 2024,
    trim: 'Limited',
    msrp: 46255,
    image: '/vehicles/bz4x-limited.jpg',
    features: ['All-Electric', 'AWD', 'Heat Pump', '12.3" Touchscreen'],
    fuelEconomy: { city: 0, highway: 0 }, // Electric range: 252 miles
    category: 'electric',
  },
  {
    id: 'corolla-2024-xse',
    make: 'Toyota',
    model: 'Corolla',
    year: 2024,
    trim: 'XSE',
    msrp: 25105,
    image: '/vehicles/corolla-xse.jpg',
    features: ['Sport Seats', 'Alloy Wheels', 'Smart Key System', 'Dual-Zone AC'],
    fuelEconomy: { city: 31, highway: 40 },
    category: 'sedan',
  },
  {
    id: 'tundra-2024-sr5',
    make: 'Toyota',
    model: 'Tundra',
    year: 2024,
    trim: 'SR5',
    msrp: 42530,
    image: '/vehicles/tundra-sr5.jpg',
    features: ['4WD', 'Towing Package', 'Bed Liner', 'Backup Camera'],
    fuelEconomy: { city: 17, highway: 22 },
    category: 'truck',
  },
];

export function getVehicleById(id: string): Vehicle | undefined {
  return mockVehicles.find(v => v.id === id);
}

export function getVehiclesByCategory(category: string): Vehicle[] {
  return mockVehicles.filter(v => v.category === category);
}

export function getVehiclesByPriceRange(min: number, max: number): Vehicle[] {
  return mockVehicles.filter(v => v.msrp >= min && v.msrp <= max);
}
