// TwiML route - Controls the call flow
// Location: Frontend/src/app/api/voice-call/twiml/route.ts

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get('userName') || 'there';
  const context = searchParams.get('context') || 'general';

  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  // Generate greeting based on context
  let greeting = `Hello ${userName}! I'm the ToyotaPath assistant. `;
  
  switch (context) {
    case 'vehicle-inquiry':
      greeting += "I understand you're interested in learning more about our vehicles. How can I help you today?";
      break;
    case 'financing':
      greeting += "I can help you explore financing options. What would you like to know?";
      break;
    case 'dealer-connect':
      greeting += "I can connect you with a local dealer or answer questions about our inventory. What interests you?";
      break;
    default:
      greeting += "How can I assist you with your car shopping journey today?";
  }

  // Use ElevenLabs for the greeting
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3003';
  
  // Play AI-generated greeting
  response.play(`${baseUrl}/api/voice-call/speak?text=${encodeURIComponent(greeting)}`);

  // Gather user input
  const gather = response.gather({
    input: ['speech'],
    action: `${baseUrl}/api/voice-call/process`,
    method: 'POST',
    speechTimeout: 'auto',
    speechModel: 'phone_call',
    enhanced: true,
    language: 'en-US',
  });

  gather.say("I'm listening...");

  // If no input, prompt again
  response.redirect(`${baseUrl}/api/voice-call/twiml?userName=${userName}&context=${context}`);

  return new NextResponse(response.toString(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
