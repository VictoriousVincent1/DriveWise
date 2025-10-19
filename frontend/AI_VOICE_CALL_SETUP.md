# AI Voice Assistant Phone Call Setup

## Overview
This feature allows the DriveWise assistant to call users and have voice conversations using:
- **Twilio** - Phone call infrastructure
- **ElevenLabs** - Natural text-to-speech
- **OpenAI/Anthropic** - Conversation AI
- **Deepgram/AssemblyAI** - Speech-to-text

## Prerequisites

### 1. Twilio Account Setup
1. Sign up at https://www.twilio.com/try-twilio
2. Get your Account SID and Auth Token
3. Purchase a phone number ($1-2/month)
4. Get free trial credit ($15)

### 2. ElevenLabs (Already Configured ✅)
- You already have API key: `agent_9401k7wgxpk7e4atafvwwpfdegct`

### 3. Speech-to-Text Service
Choose one:
- **Deepgram** (recommended) - https://deepgram.com
- **AssemblyAI** - https://www.assemblyai.com
- **Google Cloud Speech** - https://cloud.google.com/speech-to-text

### 4. Conversational AI (Optional)
- **OpenAI** - https://platform.openai.com
- Or use rule-based responses

## Environment Variables

Add to `.env.local`:
```bash
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# ElevenLabs (Already set ✅)
NEXT_PUBLIC_ELEVENLABS_API_KEY=agent_9401k7wgxpk7e4atafvwwpfdegct

# Speech-to-Text
DEEPGRAM_API_KEY=your_deepgram_key
# OR
ASSEMBLYAI_API_KEY=your_assemblyai_key

# Optional: AI Processing
OPENAI_API_KEY=your_openai_key
```

## Cost Estimates

### Twilio Pricing:
- Phone number: $1-2/month
- Outbound calls: $0.013/min (US)
- Recording: $0.0025/min

### ElevenLabs:
- Free tier: 10,000 characters/month
- Paid: $5/month for 30,000 characters

### Deepgram:
- Free tier: $200 credit
- Pay-as-you-go: $0.0043/min

### Example: 10 calls/day, 3 min average
- Twilio: ~$1.20/month
- ElevenLabs: ~$5/month
- Deepgram: ~$4/month
- **Total: ~$10/month**

## Installation

See `docs/AI_VOICE_CALL_IMPLEMENTATION.md` for step-by-step setup.

## Features

1. **Click-to-Call Button** in chatbot
2. **User enters phone number**
3. **AI assistant calls immediately**
4. **Natural voice conversation**
5. **Context-aware responses** about:
   - Vehicle information
   - Financing options
   - Dealer locations
   - Test drive scheduling

## Security Considerations

⚠️ **Important:**
- Never expose Twilio credentials in frontend
- Use backend API routes for all phone operations
- Validate and sanitize phone numbers
- Rate limit to prevent abuse
- Log all calls for compliance
- Get user consent before calling
