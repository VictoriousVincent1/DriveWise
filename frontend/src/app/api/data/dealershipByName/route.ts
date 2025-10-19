import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  if (!name) return NextResponse.json({ error: 'Missing dealership name' }, { status: 400 });

  // Query Firestore for dealership with matching name
  const dealershipsRef = adminDb.collection('dealerships');
  const snapshot = await dealershipsRef.where('name', '==', name).get();
  if (snapshot.empty) {
    return NextResponse.json({ error: 'Dealership not found' }, { status: 404 });
  }
  // Return the first matching dealership's ID and data
  const doc = snapshot.docs[0];
  return NextResponse.json({ id: doc.id, dealership: doc.data() });
}