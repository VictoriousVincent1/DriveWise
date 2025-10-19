// Process user speech and generate AI response
// Location: Frontend/src/app/api/voice-call/process/route.ts


import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { adminDb } from '../../../../lib/firebaseAdmin';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const speechResult = formData.get('SpeechResult') as string;
  const confidence = formData.get('Confidence') as string;

  // Log transcript from STT
  console.log('--- TRANSCRIPT RECEIVED FROM STT ---');
  console.log('User said:', speechResult);
  console.log('Confidence:', confidence);

  const VoiceResponse = twilio.twiml.VoiceResponse;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || undefined;
  const response = new VoiceResponse();


  // Generate AI response using Gemini (full LLM)
  // Build context similar to the web chatbot (system limit + user info)
  let userInfo = '';
  if (userId) {
    try {
      const snap = await adminDb.collection('users').doc(String(userId)).get();
      if (snap.exists) {
        const data = snap.data() as any;
        const { name, email, zipcode, ...rest } = data || {};
        userInfo = `User info: Name: ${name || 'N/A'}, Email: ${email || 'N/A'}, Zipcode: ${zipcode || 'N/A'}`;
        for (const [key, value] of Object.entries(rest || {})) {
          // Avoid dumping very large nested structures
          if (typeof value === 'object') {
            try {
              userInfo += `, ${key}: ${JSON.stringify(value).slice(0, 200)}${JSON.stringify(value).length > 200 ? '…' : ''}`;
            } catch {
              userInfo += `, ${key}: [object]`;
            }
          } else {
            userInfo += `, ${key}: ${value}`;
          }
        }
      }
    } catch {
      // ignore user info errors; proceed without context
    }
  }

  const systemPrompt = 'Please keep your response to a maximum of three sentences.';
  const personaPrompt = 'You are the same ToyotaPath assistant used in the web chatbot. Keep responses concise, friendly, and conversational. Avoid overly long sentences; prefer short, natural phrasing suitable for phone calls.';
  const aiResponse = await generateGeminiResponse(speechResult, { systemPrompt, personaPrompt, userInfo });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3003';


  // Play AI response using ElevenLabs, allow dynamic voice selection
  // Align voice to chatbot: allow persona/voice selection; default stays if none provided
  const voice = (formData.get('Voice') as string | undefined) || (process.env.NEXT_PUBLIC_DEFAULT_VOICE_ID || undefined);
  let speakUrl = `${baseUrl}/api/voice-call/speak?text=${encodeURIComponent(aiResponse)}`;
  if (voice) speakUrl += `&voice=${encodeURIComponent(voice)}`;
  if (userId) speakUrl += `&userId=${encodeURIComponent(userId)}`;
  response.play(speakUrl);

  // Check if conversation should continue
  if (shouldContinueConversation(speechResult, aiResponse)) {
    // Gather next input
    const gather = response.gather({
      input: ['speech'],
      action: `${baseUrl}/api/voice-call/process${userId ? `?userId=${encodeURIComponent(userId)}` : ''}`,
      method: 'POST',
      speechTimeout: 'auto',
      speechModel: 'phone_call',
      enhanced: true,
    });

    gather.say("Is there anything else I can help you with?");
  } else {
    // End call
    response.say("Thank you for calling ToyotaPath! Have a great day!");
    response.hangup();
  }

  return new NextResponse(response.toString(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}


// Use Gemini LLM for all responses
async function generateGeminiResponse(
  userInput: string,
  ctx?: { systemPrompt?: string; personaPrompt?: string; userInfo?: string }
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return 'Sorry, Gemini AI is not configured.';
  const prompt = `${ctx?.personaPrompt || ''}\n${ctx?.systemPrompt || ''}\n${ctx?.userInfo ? ctx.userInfo + '\n' : ''}User: ${userInput}\nAssistant:`;
  // Log the prompt being sent to Gemini
  console.log('--- GEMINI PROMPT ---');
  console.log(prompt);
  try {
    // Use the same model as the web chatbot for consistent style
    const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    if (!resp.ok) {
      const t = await resp.text();
      console.error('Gemini API error:', t);
      throw new Error('Gemini failed: ' + t);
    }
    const data = await resp.json();
    // Log the Gemini API response
    console.log('--- GEMINI API RESPONSE ---');
    console.log(JSON.stringify(data, null, 2));
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response from Gemini.';
  } catch (e: any) {
    console.error('Gemini error:', e.message);
    return 'Sorry, there was an error with the AI service.';
  }
}

function shouldContinueConversation(userInput: string, aiResponse: string): boolean {
  const endPhrases = ['goodbye', 'bye', 'no thanks', "that's all", 'nothing else'];
  const input = userInput.toLowerCase();
  
  return !endPhrases.some(phrase => input.includes(phrase));
}
