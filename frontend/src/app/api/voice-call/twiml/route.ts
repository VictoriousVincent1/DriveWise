// TwiML route - Controls the call flow
// Location: Frontend/src/app/api/voice-call/twiml/route.ts

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: NextRequest) {
  // Only <Gather> as the first verb, so Twilio trial message plays first
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  // Gather user input (speech or DTMF)
  response.gather({
    input: ['speech', 'dtmf'],
    timeout: 7,
    action: '/api/voice-call/process',
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
}
