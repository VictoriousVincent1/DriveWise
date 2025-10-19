// TwiML route - Controls the call flow
// Location: Frontend/src/app/api/voice-call/twiml/route.ts

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Only <Gather> as the first verb, so Twilio trial message plays first
    const VoiceResponse = twilio.twiml.VoiceResponse;
    const response = new VoiceResponse();

    // Gather user input (speech or DTMF)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    response.gather({
      input: ['speech', 'dtmf'],
      timeout: 7,
      action: userId ? `/api/voice-call/process?userId=${encodeURIComponent(userId)}` : '/api/voice-call/process',
      method: 'POST',
      speechTimeout: 'auto',
      speechModel: 'phone_call',
      enhanced: true,
      language: 'en-US',
    });

    // No <Say> or <Play> here, so Twilio trial message plays first

    return new NextResponse(response.toString(), {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (err) {
    console.error('TwiML route error:', err);
    // Return a TwiML <Say> error message so Twilio doesn't hang up
    const VoiceResponse = twilio.twiml.VoiceResponse;
    const errorResponse = new VoiceResponse();
    errorResponse.say('Sorry, there was an error with the call. Please try again later.');
    return new NextResponse(errorResponse.toString(), {
      headers: { 'Content-Type': 'text/xml' },
      status: 200,
    });
  }
}
