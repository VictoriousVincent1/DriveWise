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

  // Download the recording audio (Twilio provides .wav by default)
  let transcript = '';
  try {
    if (recordingUrl) {
      // Download audio from Twilio with basic auth
      const audioUrl = `${recordingUrl}.wav`;
      const twilioSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioToken = process.env.TWILIO_AUTH_TOKEN;
      const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
      if (!deepgramApiKey) throw new Error('DEEPGRAM_API_KEY not set');
      if (!twilioSid || !twilioToken) throw new Error('Twilio credentials not set');

      // Download audio from Twilio
      const audioResp = await fetch(audioUrl, {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64'),
        },
      });
      if (!audioResp.ok) {
        const t = await audioResp.text();
        throw new Error('Twilio audio download failed: ' + t);
      }
      const audioBuffer = Buffer.from(await audioResp.arrayBuffer());

      // Send audio buffer to Deepgram
      const resp = await fetch('https://api.deepgram.com/v1/listen', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${deepgramApiKey}`,
          'Content-Type': 'audio/wav',
        },
        body: audioBuffer,
      });
      if (!resp.ok) {
        const t = await resp.text();
        throw new Error('Deepgram failed: ' + t);
      }
      const data = await resp.json();
      transcript = data.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';
      console.log('Deepgram transcript:', transcript);
      // Optionally: save transcript to Firestore or database here
    }
  } catch (e: any) {
    console.error('Deepgram transcription error:', e.message);
  }

  return NextResponse.json({ received: true, transcript });
}
