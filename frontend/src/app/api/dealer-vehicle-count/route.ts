import { NextRequest } from 'next/server';
import { mockDealers } from '@/lib/mockData/dealers';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dealershipIdParam = searchParams.get('dealershipId');
  if (!dealershipIdParam) {
    return new Response('Missing dealershipId', { status: 400 });
  }

  // IDs in mock data are numbers; support string IDs by loose compare
  const dealer = mockDealers.find((d) => String(d.id) === String(dealershipIdParam));
  // In our mock data, inventory is always an array (Vehicle[] or string[])
  const count = dealer && dealer.inventory ? (dealer.inventory as any[]).length : 0;
  return Response.json({ count });
}
