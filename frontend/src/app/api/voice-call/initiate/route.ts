// Backend API route for initiating voice calls with AI assistant
// Location: Frontend/src/app/api/voice-call/initiate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, userName, context } = await request.json();

    // Validate phone number
    if (!phoneNumber || !phoneNumber.match(/^\+?[1-9]\d{1,14}$/)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Create TwiML for the call
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3003';
    const twimlUrl = `${baseUrl}/api/voice-call/twiml?userName=${encodeURIComponent(userName || 'there')}&context=${encodeURIComponent(context || 'general')}`;

    // Initiate the call
    const call = await client.calls.create({
      from: twilioNumber,
      to: phoneNumber,
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
    });
  } catch (error: any) {
    console.error('Error initiating call:', error);
    return NextResponse.json(
      { error: 'Failed to initiate call', details: error.message },
      { status: 500 }
    );
  }
}
