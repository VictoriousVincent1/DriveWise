// Support POST as well as GET for TTS
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text = body.text;
    const voiceParam = body.voice;

    if (!text) {
      console.error('TTS error: No text provided (POST)');
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
    const voiceId = voiceParam || process.env.NEXT_PUBLIC_DEFAULT_VOICE_ID || 'JBFqnCBsd6RMkjVDRZzb';

    if (!apiKey) {
      console.error('TTS error: ElevenLabs API key is missing (POST)');
      return NextResponse.json({ error: 'TTS API key is missing' }, { status: 500 });
    }
    if (!voiceId) {
      console.error('TTS error: No voiceId provided or configured (POST)');
      return NextResponse.json({ error: 'No voiceId provided or configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.6,
            similarity_boost: 0.8,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('TTS error: ElevenLabs API failed (POST):', errText);
      throw new Error('Failed to generate speech: ' + errText);
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error: any) {
    console.error('Error generating speech (POST):', error?.message || error);
    return NextResponse.json({ error: 'Speech generation failed: ' + (error?.message || error) }, { status: 500 });
  }
}
// Generate speech audio using ElevenLabs
// Location: Frontend/src/app/api/voice-call/speak/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  const voiceParam = searchParams.get('voice');

  if (!text) {
    console.error('TTS error: No text provided');
    return NextResponse.json({ error: 'No text provided' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
  const voiceId = voiceParam || process.env.NEXT_PUBLIC_DEFAULT_VOICE_ID || 'JBFqnCBsd6RMkjVDRZzb'; // default voice

  if (!apiKey) {
    console.error('TTS error: ElevenLabs API key is missing');
    return NextResponse.json({ error: 'TTS API key is missing' }, { status: 500 });
  }
  if (!voiceId) {
    console.error('TTS error: No voiceId provided or configured');
    return NextResponse.json({ error: 'No voiceId provided or configured' }, { status: 500 });
  }

  try {
    // Call ElevenLabs API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.6,
            similarity_boost: 0.8,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('TTS error: ElevenLabs API failed:', errText);
      throw new Error('Failed to generate speech: ' + errText);
    }

    const audioBuffer = await response.arrayBuffer();

    // Return audio as MP3
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error: any) {
    console.error('Error generating speech:', error?.message || error);
    // Fallback to Twilio's built-in TTS
    return NextResponse.json({ error: 'Speech generation failed: ' + (error?.message || error) }, { status: 500 });
  }
}
