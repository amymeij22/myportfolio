import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createRateLimiter, verifySignedChallenge, sanitizePlainText } from '@/lib/security';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

// Rate Limiter: Max 3 emails per 10 minutes per IP
const contactRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 3,
});

// Strict Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100, 'Nama maksimal 100 karakter'),
  email: z.string().email('Format email tidak valid').max(255),
  message: z.string().min(10, 'Pesan minimal 10 karakter').max(3000, 'Pesan maksimal 3000 karakter'),
  captchaAnswer: z.union([z.string(), z.number()]),
  captchaToken: z.string().min(1, 'Token verifikasi wajib disertakan'),
  // Honeypot field: must be empty
  _hp: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. IP Extraction & Rate Limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : 'anonymous';
    const rateCheck = contactRateLimiter(clientIp);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Terlalu banyak pengiriman pesan. Mohon tunggu ${Math.ceil((rateCheck.retryAfterSeconds || 600) / 60)} menit sebelum mencoba kembali.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse Body
    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { error: 'Format data permintaan tidak valid' },
        { status: 400 }
      );
    }

    // 3. Honeypot Trap Detection (Anti-Spambot)
    if (body._hp && String(body._hp).trim().length > 0) {
      console.warn(`Spam bot caught via honeypot trap from IP: ${clientIp}`);
      // Silent success for bots so they don't learn how to bypass
      return NextResponse.json({
        success: true,
        message: 'Pesan Anda berhasil dikirim.',
      });
    }

    // 4. Validate Fields
    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || 'Data form tidak valid';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, message, captchaAnswer, captchaToken } = parseResult.data;

    // 5. Cryptographic Server-Side CAPTCHA Verification
    const captchaCheck = verifySignedChallenge(captchaAnswer, captchaToken);
    if (!captchaCheck.valid) {
      return NextResponse.json(
        { error: captchaCheck.reason || 'Verifikasi keamanan gagal' },
        { status: 400 }
      );
    }

    // 6. Sanitize inputs to prevent SMTP Header Injections
    const sanitizedName = sanitizePlainText(name);
    const sanitizedEmail = sanitizePlainText(email);

    // 7. Read Credentials (Server-side priority, fallback to NEXT_PUBLIC_ for compatibility)
    const serviceId = (process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '').trim();
    const templateId = (process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '').trim();
    const publicKey = (
      process.env.EMAILJS_PUBLIC_KEY ||
      process.env.EMAILJS_USER_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID ||
      ''
    ).trim();
    const privateKey = (process.env.EMAILJS_PRIVATE_KEY || '').trim(); // EmailJS Access Token for strict lockdown

    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        'EmailJS credentials are not fully configured in environment variables. Message logged on server.'
      );
      return NextResponse.json(
        {
          error:
            'Maaf ya, layanan formulir kontak sedang dalam pemeliharaan konfigurasi 🙏 Silakan hubungi langsung melalui email atau LinkedIn yang tertera ya.',
        },
        { status: 503 }
      );
    }

    // 8. Dispatch through EmailJS REST API from Server (with 12s timeout)
    const emailPayload: {
      service_id: string;
      template_id: string;
      user_id: string;
      template_params: { name: string; email: string; message: string };
      accessToken?: string;
    } = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        name: sanitizedName,
        email: sanitizedEmail,
        message: message.trim(),
      },
    };

    // If EmailJS private key (accessToken) is enabled, include it
    if (privateKey) {
      emailPayload.accessToken = privateKey;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    let emailResponse: Response;
    try {
      emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text().catch(() => '');
      console.error(`EmailJS dispatch error (${emailResponse.status}):`, errorText);
      return NextResponse.json(
        {
          error:
            'Maaf ya, pesan belum dapat diteruskan oleh layanan email saat ini 😅 Silakan coba lagi sebentar lagi atau hubungi Yasir langsung lewat email yasirahmad220504@gmail.com.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Pesan Anda telah berhasil dikirim! Terima kasih telah menghubungi.',
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('EmailJS request timeout after 12s');
      return NextResponse.json(
        {
          error:
            'Koneksi ke layanan pengiriman email sedang agak lambat nih 😅 Silakan coba kirim ulang sebentar lagi ya.',
        },
        { status: 504 }
      );
    }
    console.error('Unexpected error in /api/contact:', error);
    return NextResponse.json(
      { error: 'Maaf, terjadi kendala sementara di server saat memproses pesan Anda. Silakan coba lagi beberapa saat nanti.' },
      { status: 500 }
    );
  }
}

