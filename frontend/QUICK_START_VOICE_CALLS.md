# 🎯 Quick Start: AI Voice Calls

## What You Need (5 minutes)

1. **Twilio Account** → https://www.twilio.com/try-twilio
   - Sign up (free $15 credit)
   - Get: Account SID, Auth Token
   - Buy a phone number ($1/month)

2. **Update `.env.local`**:
   ```bash
   TWILIO_ACCOUNT_SID=ACxxxxx...
   TWILIO_AUTH_TOKEN=xxxxx...
   TWILIO_PHONE_NUMBER=+15551234567
   NEXT_PUBLIC_BASE_URL=http://localhost:3003
   ```

3. **For webhooks** (choose one):
   - **Local testing:** `ngrok http 3003` then update `NEXT_PUBLIC_BASE_URL`
   - **Production:** Deploy first, then use production URL

4. **Restart app**: `npm run dev`

5. **Test it**:
   - Go to Dealer Connect page
   - Click "📞 Call Me" button
   - Enter your phone number
   - Get called by AI!

## Files to Check

- ✅ `/api/voice-call/initiate/route.ts` - Starts calls
- ✅ `/api/voice-call/twiml/route.ts` - Call flow
- ✅ `/api/voice-call/process/route.ts` - AI responses
- ✅ `/api/voice-call/speak/route.ts` - ElevenLabs voice
- ✅ `DealerChatbot.tsx` - "Call Me" button

## Costs

- **Free tier**: ~115 minutes of calls
- **Production**: ~$0.013/min + $1-2/month for number
- **10 calls/day**: ~$10/month total

## Common Issues

❌ **Call doesn't go through**
→ Check Twilio Console for errors
→ Verify phone number format: +1234567890

❌ **Webhooks failing**
→ Make sure ngrok is running
→ Update `NEXT_PUBLIC_BASE_URL`
→ Restart Next.js

❌ **Trial restrictions**
→ Verify recipient number in Twilio Console
→ Or upgrade to remove restrictions

## 🎉 That's It!

Full docs: `docs/AI_VOICE_CALL_IMPLEMENTATION.md`
