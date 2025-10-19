
'use client';
"use client";
import React, { useState, useRef, useEffect } from 'react';
// Speech-to-Text using Web Speech API
function useSpeechToText(setInput: (text: string) => void) {
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };
      recognitionRef.current.onerror = () => setListening(false);
      recognitionRef.current.onend = () => setListening(false);
    }
  }, [setInput]);

  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  return { listening, startListening };
}
import { auth } from '../lib/firebase';

export default function GeminiChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('gemini_chat_session');
      if (saved) return JSON.parse(saved);
    }
    return [
      { role: 'assistant', content: 'Hi! I am your ToyotaPath AI assistant. How can I help you today?' }
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { listening, startListening } = useSpeechToText(setInput);

  // Stop audio playback when mic is pressed
  const handleMicClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    startListening();
  };

  // Persist messages to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('gemini_chat_session', JSON.stringify(messages));
    }
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const user = auth.currentUser;
    let userInfo = '';
    if (user) {
      // Fetch all user info
      try {
        const resp = await fetch(`/api/data/userinfo?uid=${user.uid}`);
        const data = await resp.json();
        if (data.user) {
          // Build a summary string for Gemini context
          const { name, email, zipcode, ...rest } = data.user;
          userInfo = `User info: Name: ${name || 'N/A'}, Email: ${email || 'N/A'}, Zipcode: ${zipcode || 'N/A'}`;
          // Optionally add more fields
          for (const [key, value] of Object.entries(rest)) {
            userInfo += `, ${key}: ${value}`;
          }
        }
      } catch {}
    }
    // Add system prompt to limit Gemini's response length
    const systemPrompt = 'Please keep your response to a maximum of three sentences.';
    // Add userInfo and system prompt as system messages for Gemini context
    const newMessages = [
      { role: 'system', content: systemPrompt },
      ...(userInfo ? [{ role: 'system', content: userInfo }] : []),
      ...messages,
      { role: 'user', content: input }
    ];
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);
    try {
      const resp = await fetch('/api/voice-call/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await resp.json();
      setMessages((prev: typeof messages) => [...prev, { role: 'assistant', content: data.response }]);

      // ElevenLabs TTS: fetch audio and play
      const ttsResp = await fetch(`/api/voice-call/speak?text=${encodeURIComponent(data.response)}`);
      if (ttsResp.ok) {
        const audioBlob = await ttsResp.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.play();
        }
      }
    } catch (e) {
      setMessages((prev: typeof messages) => [...prev, { role: 'assistant', content: 'Sorry, there was an error.' }]);
    }
    setLoading(false);
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
          borderRadius: '50%',
          width: 56,
          height: 56,
          background: '#1976d2',
          color: 'white',
          fontSize: 28,
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          cursor: 'pointer',
        }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '×' : '💬'}
      </button>
      {/* Chat Box */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 100,
          right: 32,
          maxWidth: 400,
          width: '90vw',
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 16,
          background: 'rgba(255,255,255,0.98)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
          zIndex: 1001,
        }}>
          <div style={{ minHeight: 200, maxHeight: 300, overflowY: 'auto', marginBottom: 16 }}>
            {messages.map((m: any, i: number) => (
              <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '8px 0' }}>
                <b>{m.role === 'user' ? 'You' : 'AI'}:</b> {m.content}
              </div>
            ))}
            {loading && <div><i>AI is typing...</i></div>}
          </div>
          <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              style={{ flex: 1, padding: 8 }}
              disabled={loading}
            />
            <button type="button" onClick={handleMicClick} disabled={loading || listening} title="Speak">
              {listening ? 'Listening...' : '🎤'}
            </button>
            <button type="submit" disabled={loading || !input.trim()}>Send</button>
          </form>
          {/* Hidden audio element for TTS playback */}
          <audio ref={audioRef} style={{ display: 'none' }} />
        </div>
      )}
    </>
  );
}
