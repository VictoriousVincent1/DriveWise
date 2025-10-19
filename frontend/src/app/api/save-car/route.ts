import { NextRequest } from 'next/server';

// Minimal placeholder endpoint to accept saved car additions.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // In a real app we'd persist to Firestore under the user.
    // For now, just validate minimal shape and return ok.
    if (!body || typeof body !== 'object' || !body.car) {
      return new Response('Invalid payload', { status: 400 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    return new Response('Bad Request', { status: 400 });
  }
}
