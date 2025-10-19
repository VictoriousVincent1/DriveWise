// Process user speech and generate AI response
// Location: Frontend/src/app/api/voice-call/process/route.ts


import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const speechResult = formData.get('SpeechResult') as string;
  const confidence = formData.get('Confidence') as string;

  // Log transcript from STT
  console.log('--- TRANSCRIPT RECEIVED FROM STT ---');
  console.log('User said:', speechResult);
  console.log('Confidence:', confidence);

  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();


  // Generate AI response using Gemini (full LLM)
  const aiResponse = await generateGeminiResponse(speechResult);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3003';


  // Play AI response using ElevenLabs, allow dynamic voice selection
  const voice = formData.get('Voice') as string | undefined;
  let speakUrl = `${baseUrl}/api/voice-call/speak?text=${encodeURIComponent(aiResponse)}`;
  if (voice) speakUrl += `&voice=${encodeURIComponent(voice)}`;
  response.play(speakUrl);

  // Check if conversation should continue
  if (shouldContinueConversation(speechResult, aiResponse)) {
    // Gather next input
    const gather = response.gather({
      input: ['speech'],
      action: `${baseUrl}/api/voice-call/process`,
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
async function generateGeminiResponse(userInput: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return 'Sorry, Gemini AI is not configured.';
  const prompt = `You are a helpful ToyotaPath assistant. Answer the user naturally and conversationally.\n\nUser: ${userInput}\nAssistant:`;
  // Log the prompt being sent to Gemini
  console.log('--- GEMINI PROMPT ---');
  console.log(prompt);
  try {
    const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
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
