// Backend API route for initiating voice calls with AI assistant
// Location: Frontend/src/app/api/voice-call/initiate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { adminDb, adminAuth } from '@/lib/firebaseAdmin';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
    if (!twilioNumber) {
      return NextResponse.json(
        { error: 'Twilio phone number is not configured on the server.' },
        { status: 500 }
      );
    }
  try {
    const { phoneNumber, userId, email, userName, context } = await request.json();

    // Prefer user's saved phone in Firestore/Auth
    let targetPhone: string | undefined = undefined;
    if (userId) {
      // Try Auth user
      try {
        const user = await adminAuth.getUser(userId);
        targetPhone = user.phoneNumber || undefined;
      } catch {}
      // Try Firestore profile
      if (!targetPhone) {
        const profileDoc = await adminDb.collection('users').doc(String(userId)).get();
        targetPhone = (profileDoc.exists ? (profileDoc.data()?.phone as string | undefined) : undefined) || targetPhone;
      }
    }
    if (!targetPhone && email) {
      // Try Firestore users lookup by email
      const snap = await adminDb.collection('users').where('email', '==', email).limit(1).get();
      if (!snap.empty) {
        targetPhone = (snap.docs[0].data()?.phone as string | undefined) || undefined;
      }
      if (!targetPhone) {
        // Try Auth lookup by email
        try {
          const user = await adminAuth.getUserByEmail(email);
          targetPhone = user.phoneNumber || undefined;
        } catch {}
      }
    }

    // Fallback to provided phoneNumber
    targetPhone = targetPhone || phoneNumber;

    // Validate final phone number
    if (!targetPhone || !/^\+?[1-9]\d{1,14}$/.test(targetPhone)) {
      return NextResponse.json(
        { error: 'No valid phone on file. Provide a phoneNumber in E.164 format.' },
        { status: 400 }
      );
    }

    // Create TwiML for the call
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3003';
    const twimlUrl = `${baseUrl}/api/voice-call/twiml?userName=${encodeURIComponent(userName || 'there')}&context=${encodeURIComponent(context || 'general')}`;

    // Initiate the call
    const call = await client.calls.create({
      from: twilioNumber,
      to: targetPhone,
      url: twimlUrl,
      method: 'POST',
      statusCallback: `${baseUrl}/api/voice-call/status`,
      statusCallbackMethod: 'POST',
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
      record: true, // Record for quality and compliance
      recordingStatusCallback: `${baseUrl}/api/voice-call/recording`,
    });

    return NextResponse.json({
      success: true,
      callSid: call.sid,
      status: call.status,
      message: 'Call initiated successfully',
      to: targetPhone,
    });
  } catch (error: any) {
    console.error('Error initiating call:', error);
    return NextResponse.json(
      { error: 'Failed to initiate call', details: error.message },
      { status: 500 }
    );
  }
}
