# AI Voice Call Implementation Guide

## 🎉 What's Been Implemented

Your ToyotaPath app now has an **AI Voice Assistant** that can call users on their phone! This is a sophisticated feature that combines:

- **Twilio** - Makes actual phone calls
- **ElevenLabs** - Natural AI voice (already configured ✅)
- **Speech Recognition** - Understands what users say
- **Smart Responses** - Answers questions about vehicles, financing, dealers

## 📁 Files Created

### Backend API Routes:
1. `/api/voice-call/initiate/route.ts` - Starts the call
2. `/api/voice-call/twiml/route.ts` - Controls call flow
3. `/api/voice-call/process/route.ts` - Processes user speech & generates responses
4. `/api/voice-call/speak/route.ts` - Converts text to speech via ElevenLabs
5. `/api/voice-call/status/route.ts` - Tracks call status
6. `/api/voice-call/recording/route.ts` - Handles call recordings

### Frontend UI:
- **"📞 Call Me" button** added to chatbot
- **Phone number modal** for user input
- Call status updates

## 🚀 How It Works

1. User clicks **"📞 Call Me"** button in chatbot
2. Modal appears asking for phone number
3. User enters number and clicks "Call Me Now"
4. Backend calls Twilio API to initiate call
5. Within seconds, user's phone rings
6. AI assistant greets user with natural voice
7. User speaks their question
8. AI understands and responds intelligently
9. Conversation continues naturally
10. Call ends when user says goodbye

## 🔧 Setup Steps

### Step 1: Create Twilio Account

1. Go to https://www.twilio.com/try-twilio
2. Sign up (free trial gives you $15 credit)
3. Verify your email and phone number
4. Go to https://www.twilio.com/console

### Step 2: Get Twilio Credentials

From the Twilio Console, copy:
- **Account SID** (starts with `AC...`)
- **Auth Token** (click the eye icon to reveal)

### Step 3: Buy a Phone Number

1. In Twilio Console, go to **Phone Numbers** → **Buy a number**
2. Select your country (USA)
3. Search for a number with **Voice** capability
4. Buy the number (costs $1-2/month)
5. Copy the phone number (format: +1234567890)

### Step 4: Configure Webhooks (Important!)

For webhooks to work during development:

**Option A: Use ngrok (Recommended for testing)**
```bash
# Install ngrok
npm install -g ngrok

# Start your Next.js app
npm run dev

# In another terminal, start ngrok
ngrok http 3003

# ngrok will give you a URL like: https://abc123.ngrok.io
# Update .env.local with this URL:
NEXT_PUBLIC_BASE_URL=https://abc123.ngrok.io
```

**Option B: Deploy to Production**
Deploy to Vercel/Netlify and use your production URL.

### Step 5: Update Environment Variables

Edit `Frontend/.env.local`:

```bash
# Replace these with your actual values:
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567

# Use ngrok URL or production URL
NEXT_PUBLIC_BASE_URL=https://your-ngrok-url.ngrok.io

# ElevenLabs (already set ✅)
NEXT_PUBLIC_ELEVENLABS_API_KEY=agent_9401k7wgxpk7e4atafvwwpfdegct
```

### Step 6: Restart Your App

```bash
npm run dev
```

### Step 7: Test the Feature!

1. Open http://localhost:3003
2. Go to "Dealer Connect"
3. Click the **"📞 Call Me"** button
4. Enter YOUR phone number
5. Click "Call Me Now"
6. Your phone should ring within 5-10 seconds!
7. Answer and talk to the AI assistant!

## 🎙️ Example Conversation

**AI:** "Hello! I'm the ToyotaPath assistant. How can I assist you with your car shopping journey today?"

**You:** "I'm looking for an SUV"

**AI:** "The RAV4 is our most popular SUV! The 2024 RAV4 XLE starts at $36,800. It features all-wheel drive, excellent fuel economy at 27 city and 35 highway MPG, and comes loaded with safety features. Would you like to schedule a test drive or hear about financing options?"

**You:** "What about financing?"

**AI:** "We offer both financing and leasing options! Current rates start at 4.9% APR for qualified buyers, and lease payments begin at $329 per month. We can also calculate a custom payment based on your budget. What's your preferred monthly payment range?"

## 🎨 Customization

### Change the Voice

Edit `/api/voice-call/speak/route.ts`:

```typescript
const voiceId = 'JBFqnCBsd6RMkjVDRZzb'; // Current: George

// Try these alternatives:
const voiceId = '21m00Tcm4TlvDq8ikWAM'; // Rachel - calm female
const voiceId = 'pNInz6obpgDQGcFmaJgB'; // Adam - deep male
const voiceId = 'EXAVITQu4vr4xnSDxMaL'; // Bella - young female
```

### Add More AI Responses

Edit `/api/voice-call/process/route.ts` in the `generateAIResponse()` function to add more intelligent responses.

### Use OpenAI for Smarter Responses

Replace the rule-based responses with OpenAI:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAIResponse(userInput: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful Toyota car sales assistant. Be concise, friendly, and knowledgeable about vehicles, financing, and dealers."
      },
      {
        role: "user",
        content: userInput
      }
    ],
    max_tokens: 150,
  });
  
  return completion.choices[0].message.content || "I'm here to help! What would you like to know?";
}
```

## 💰 Cost Management

### Free Tier Limits:
- **Twilio:** $15 credit (~115 minutes of calls)
- **ElevenLabs:** 10,000 characters/month free
- **Deepgram:** $200 credit

### Tips to Minimize Costs:
1. Set call duration limits (max 5 minutes)
2. Cache common responses
3. Use Twilio's built-in TTS for simple phrases
4. Monitor usage in Twilio console

## 🐛 Troubleshooting

### "Module not found: 'twilio'"
```bash
npm install twilio
```

### Webhooks not working
- Make sure ngrok is running
- Update `NEXT_PUBLIC_BASE_URL` in `.env.local`
- Restart your Next.js app

### Call not going through
- Check Twilio Console for error logs
- Verify phone number format (+1234567890)
- Check your Twilio trial restrictions (may need to verify recipient number)

### No audio or voice
- Check ElevenLabs API key is correct
- Verify you have credits remaining
- Check browser console for errors

## 📱 Testing with Trial Account

Twilio trial accounts have restrictions:
- Can only call **verified** phone numbers
- Calls include a trial message at start
- To add verified numbers: Twilio Console → Phone Numbers → Verified Caller IDs

To remove restrictions, upgrade to a paid account (no monthly fee, just pay per use).

## 🎯 Next Steps

1. ✅ Set up Twilio account
2. ✅ Get credentials and phone number
3. ✅ Update `.env.local`
4. ✅ Test with your phone
5. ✅ Customize responses
6. ✅ Deploy to production
7. ✅ Add analytics tracking
8. ✅ Integrate with CRM

## 🚀 Production Deployment

When deploying to production:

1. **Deploy to Vercel/Netlify**
2. **Add environment variables** in hosting platform
3. **Update `NEXT_PUBLIC_BASE_URL`** to production URL
4. **Set up proper error tracking** (Sentry, etc.)
5. **Add rate limiting** to prevent abuse
6. **Monitor costs** in Twilio dashboard

## 🎉 You're All Set!

Your AI voice assistant is ready to make calls. This is a professional-grade feature that will impress users and make your app stand out!

Happy calling! 📞✨
