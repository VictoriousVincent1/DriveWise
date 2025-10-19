// Process user speech and generate AI response
// Location: Frontend/src/app/api/voice-call/process/route.ts

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const speechResult = formData.get('SpeechResult') as string;
  const confidence = formData.get('Confidence') as string;

  console.log('User said:', speechResult);
  console.log('Confidence:', confidence);

  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  // Generate AI response based on what user said
  const aiResponse = await generateAIResponse(speechResult);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3003';

  // Play AI response using ElevenLabs
  response.play(`${baseUrl}/api/voice-call/speak?text=${encodeURIComponent(aiResponse)}`);

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

async function generateAIResponse(userInput: string): Promise<string> {
  // Convert to lowercase for easier matching
  const input = userInput.toLowerCase();

  // Simple rule-based responses (you can replace with OpenAI API)
  if (input.includes('price') || input.includes('cost') || input.includes('afford')) {
    return "Based on typical budgets, our Corolla starts around $28,500, the Camry at $32,400, and the RAV4 at $36,800. We also offer financing options starting as low as $358 per month. Would you like to hear about specific models or financing details?";
  }
  
  if (input.includes('rav4') || input.includes('suv')) {
    return "The RAV4 is our most popular SUV! The 2024 RAV4 XLE starts at $36,800. It features all-wheel drive, excellent fuel economy at 27 city and 35 highway MPG, and comes loaded with safety features. Would you like to schedule a test drive or hear about financing options?";
  }
  
  if (input.includes('camry') || input.includes('sedan')) {
    return "The 2024 Camry is a fantastic choice! It starts at $32,400 and offers 28 city and 39 highway MPG. It includes Toyota Safety Sense, wireless charging, and a comfortable interior. We have several in stock. Would you like to visit a dealer or learn about our special financing rates?";
  }
  
  if (input.includes('finance') || input.includes('loan') || input.includes('lease')) {
    return "We offer both financing and leasing options! Current rates start at 4.9% APR for qualified buyers, and lease payments begin at $329 per month. We can also calculate a custom payment based on your budget. What's your preferred monthly payment range?";
  }
  
  if (input.includes('dealer') || input.includes('location') || input.includes('test drive')) {
    return "We have 5 certified Toyota dealers in your area. The closest one is Toyota of Downtown, just 2.3 miles away, with a 4.8 star rating. They're currently offering 0% APR for 60 months. Would you like me to schedule a test drive there?";
  }
  
  if (input.includes('hybrid') || input.includes('electric') || input.includes('fuel economy')) {
    return "Great question about fuel efficiency! Our Prius hybrid gets an amazing 57 MPG combined, and the RAV4 Prime plug-in hybrid offers 42 miles of electric range plus 302 horsepower. Both qualify for potential tax incentives. Which interests you more?";
  }
  
  if (input.includes('yes') || input.includes('sure') || input.includes('okay')) {
    return "Wonderful! I can connect you with one of our specialists who can help you schedule a test drive and discuss financing options. Would you like me to transfer you now, or would you prefer to receive a text message with their contact information?";
  }
  
  if (input.includes('no') || input.includes('goodbye') || input.includes('bye')) {
    return "No problem! Feel free to visit ToyotaPath.com anytime to explore our inventory, calculate payments, or chat with our online assistant. Thanks for calling!";
  }
  
  // Default response
  return "I'd be happy to help with that! I can provide information about our vehicles, financing options, dealer locations, and schedule test drives. What specifically would you like to know more about?";
}

function shouldContinueConversation(userInput: string, aiResponse: string): boolean {
  const endPhrases = ['goodbye', 'bye', 'no thanks', "that's all", 'nothing else'];
  const input = userInput.toLowerCase();
  
  return !endPhrases.some(phrase => input.includes(phrase));
}
