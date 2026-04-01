import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get('room') || 'default-room';
  const schemeId = req.nextUrl.searchParams.get('scheme_id') || '';
  const identity = `user-${Math.floor(Math.random() * 1000)}`;

  // These must be in your .env.local
  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    { 
      identity,
      metadata: JSON.stringify({ scheme_id: schemeId })
    }
  );

  at.addGrant({ 
    roomJoin: true, 
    room: room, 
    canPublish: true, 
    canSubscribe: true 
  });

  return NextResponse.json({ token: await at.toJwt() });
}