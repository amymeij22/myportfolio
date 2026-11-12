import { NextResponse } from 'next/server';
import { generateSignedChallenge } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const challenge = generateSignedChallenge();
    return NextResponse.json(challenge, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err) {
    console.error('Error generating challenge:', err);
    return NextResponse.json(
      { error: 'Gagal membuat tantangan verifikasi' },
      { status: 500 }
    );
  }
}

