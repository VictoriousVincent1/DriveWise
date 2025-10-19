import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(request: NextRequest) {
  const { messages, uid } = await request.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ response: 'Gemini API key not set.' }, { status: 500 });

  // Build prompt from conversation
  const prompt = messages.map((m: any) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n') + '\nAssistant:';

  // Store conversation transcript for future context (if uid provided)
  if (uid) {
    try {
      await adminDb.collection('conversations').add({
        uid,
        messages,
        createdAt: new Date(),
      });
    } catch (e) {
      console.error('Failed to store conversation:', e);
    }
  }

  try {
    const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    if (!resp.ok) {
      const t = await resp.text();
      throw new Error('Gemini failed: ' + t);
    }
    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    return NextResponse.json({ response: text });
  } catch (e: any) {
    return NextResponse.json({ response: 'Error: ' + e.message }, { status: 500 });
  }
}
