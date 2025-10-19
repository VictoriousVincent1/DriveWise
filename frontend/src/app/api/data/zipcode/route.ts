import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  try {
    // Get user ID from query param (for demo; in production, use auth/session)
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    if (!uid) return NextResponse.json({ error: 'Missing uid' }, { status: 400 });

    // Fetch user profile from Firestore (assume collection 'users', doc id = uid)
    const userDoc = await adminDb.collection('users').doc(uid).get();
    if (!userDoc.exists) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const userData = userDoc.data();
    const zipcode = userData?.zipcode || null;
    return NextResponse.json({ zipcode });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
