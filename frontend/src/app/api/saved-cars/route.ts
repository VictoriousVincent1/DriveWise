import { NextRequest } from 'next/server';
import type { Vehicle } from '@/types';
import { mockVehicles } from '@/lib/mockData/vehicles';

// Returns a simple list of cars for SavedCars UI. Uses mock data.
export async function GET(_req: NextRequest) {
  const cars: Vehicle[] = mockVehicles.map((v) => ({
    ...v,
    // Ensure the UI has an MSRP field; fall back to price
    msrp: v.msrp ?? v.price,
    // Use a known-present placeholder image to avoid 404s
    image: '/vercel.svg',
  }));

  return Response.json({ cars });
}
