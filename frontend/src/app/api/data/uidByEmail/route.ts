import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

  // Query Firestore for user with matching email
  const usersRef = adminDb.collection('users');
  const snapshot = await usersRef.where('email', '==', email).get();
  if (snapshot.empty) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  // Return the first matching user's UID
  const userDoc = snapshot.docs[0];
  return NextResponse.json({ uid: userDoc.id, user: userDoc.data() });
}