import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

// GET /api/data/userinfo?uid=USER_ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    if (!uid) return NextResponse.json({ error: 'Missing uid' }, { status: 400 });

    // Fetch user profile from Firestore (add more fields as needed)
    const userDoc = await adminDb.collection('users').doc(uid).get();
    if (!userDoc.exists) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const userData = userDoc.data();
    // Example: return all fields (name, email, zipcode, preferences, etc.)
    return NextResponse.json({ user: userData });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
