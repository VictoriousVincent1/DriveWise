// API route: /api/voice-call/summary
// Fetches conversation from Firestore and summarizes with Gemini

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const callSid = searchParams.get('callSid');

  if (!callSid) {
    return NextResponse.json({ error: 'callSid is required' }, { status: 400 });
  }

  try {
    // 1. Fetch messages from Firestore
    const messagesSnap = await adminDb
      .collection('calls')
      .doc(callSid)
      .collection('messages')
      .orderBy('createdAt')
      .get();
    const messages = messagesSnap.docs.map((d: any) => d.data());
    const transcript = messages.map((m: any) => `${m.role || 'user'}: ${m.content}`).join('\n');

    // 2. Build prompt for Gemini
    const prompt = `Summarize the following customer call in bullet points with: intent, key questions, mentioned vehicles, pricing/financing interests, next steps, and sentiment.\n\n${transcript}`;

    // 3. Call Gemini API
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }
    const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    if (!resp.ok) {
      const t = await resp.text();
      throw new Error('Gemini summarize failed: ' + t);
    }
    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary produced';

    // 4. Save summary to Firestore
    await adminDb.collection('calls').doc(callSid).set(
      { summary: text, summarizedAt: new Date().toISOString() },
      { merge: true }
    );

    // 5. Return summary
    return NextResponse.json({ callSid, summary: text });
  } catch (e: any) {
    console.error('Summary error', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
