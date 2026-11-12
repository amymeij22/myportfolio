import { NextRequest, NextResponse } from 'next/server';
import { createGeminiStream } from '@/lib/gemini';
import { isGeminiConfigured } from './gemini-config';

// Jalankan di Node.js runtime standar Next.js 16 dengan streaming SSE & batas durasi 60s (bebas 504)
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// Simple in-memory sliding window rate limiter per isolate
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 12; // 12 requests / min

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.expiresAt < now) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || record.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate Limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : 'anonymous';
    const isAllowed = checkRateLimit(clientIp);

    if (!isAllowed) {
      return NextResponse.json(
        {
          error:
            'Wah, kamu mengirim pesan cukup cepat nih 😊 Supaya asisten tetap nyaman melayani semuanya, silakan tunggu sekitar 1 menit dulu ya sebelum bertanya lagi.',
        },
        { status: 429 }
      );
    }

    // Check Gemini API Configuration without leaking setup hints to visitors
    if (!isGeminiConfigured()) {
      console.error('Gemini API key is missing in server environment variables (GEMINI_API_KEY).');
      return NextResponse.json(
        {
          response:
            'Maaf ya, layanan asisten virtual sedang dalam tahap penyesuaian sementara 🙏 Kamu masih dapat melihat seluruh karya di portofolio ini atau mengirim pesan lewat formulir kontak.',
        },
        { status: 200 }
      );
    }

    // Parse Body
    let body: { message?: unknown; context?: unknown };
    try {
      body = (await req.json()) as { message?: unknown; context?: unknown };
    } catch {
      return NextResponse.json(
        {
          error:
            'Maaf, format pesan yang dikirim belum dapat diproses 😅 Coba kirim ulang pertanyaanmu ya.',
        },
        { status: 400 }
      );
    }

    const { message, context = [] } = body;

    // Validate Input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Yuk tulis dulu pertanyaanmu sebelum dikirim 😊' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        {
          error:
            'Pertanyaannya lumayan panjang nih 😊 Supaya jawabannya tetap akurat dan ringkas, boleh dipersingkat hingga maksimal 1.000 karakter ya.',
        },
        { status: 400 }
      );
    }

    // Validate Context
    const safeContext = Array.isArray(context)
      ? context
          .filter((item): item is string => typeof item === 'string')
          .slice(-10)
          .map((item) => item.slice(0, 500))
      : [];

    // Stream response from Gemini 3.5 Flash-Lite
    const result = await createGeminiStream(message.trim(), safeContext);

    if (!result.ok || !result.stream) {
      return NextResponse.json(
        {
          response:
            result.message ||
            'Maaf ya, asisten sedang butuh jeda sebentar 😊 Silakan coba tanyakan lagi beberapa saat lagi.',
        },
        { status: 200 }
      );
    }

    return new Response(result.stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Error handling chat request:', error);
    return NextResponse.json(
      {
        error:
          'Maaf ya, asisten sedang mengalami kendala koneksi sebentar 😅 Silakan coba tanyakan lagi beberapa saat nanti.',
      },
      { status: 500 }
    );
  }
}
