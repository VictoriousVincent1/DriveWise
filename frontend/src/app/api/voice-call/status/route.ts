// Call status webhook
// Location: Frontend/src/app/api/voice-call/status/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  
  const callSid = formData.get('CallSid');
  const callStatus = formData.get('CallStatus');
  const from = formData.get('From');
  const to = formData.get('To');
  const duration = formData.get('CallDuration');

  // Log call status (in production, save to database)
  console.log('Call Status Update:', {
    callSid,
    status: callStatus,
    from,
    to,
    duration,
    timestamp: new Date().toISOString(),
  });

  // You can save to database here
  // await saveCallLog({ callSid, status: callStatus, from, to, duration });

  return NextResponse.json({ received: true });
}
