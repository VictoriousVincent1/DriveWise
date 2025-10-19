// Recording webhook
// Location: Frontend/src/app/api/voice-call/recording/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  
  const recordingSid = formData.get('RecordingSid');
  const recordingUrl = formData.get('RecordingUrl');
  const callSid = formData.get('CallSid');
  const duration = formData.get('RecordingDuration');

  // Log recording info (in production, save to database)
  console.log('Recording Available:', {
    recordingSid,
    recordingUrl,
    callSid,
    duration,
    timestamp: new Date().toISOString(),
  });

  // You can save to database and/or download recording here
  // await saveRecording({ recordingSid, url: recordingUrl, callSid, duration });

  return NextResponse.json({ received: true });
}
