import { NextRequest } from 'next/server';
import type { Vehicle } from '@/types';
import { mockVehicles } from '@/lib/mockData/vehicles';

// Returns a simple list of cars for SavedCars UI. Uses mock data.
export async function GET(_req: NextRequest) {
  const cars: Vehicle[] = mockVehicles.map((v) => ({
    ...v,
    // Ensure the UI has an MSRP field; fall back to price
    msrp: v.msrp ?? v.price,
    // Keep the actual vehicle image from mock data
    image: v.image,
  }));

  return Response.json({ cars });
}
