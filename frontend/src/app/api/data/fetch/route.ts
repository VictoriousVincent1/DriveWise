import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin'; // Make sure this is set up and points to your Firebase Admin instance

export async function GET(request: NextRequest) {
  try {
    // Change 'yourCollection' to the name of your Firestore collection
    const snapshot = await adminDb.collection('yourCollection').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
