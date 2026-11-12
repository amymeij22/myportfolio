import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createRateLimiter, verifySignedChallenge, sanitizePlainText } from '@/lib/security';

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
    const serviceId = process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey =
      process.env.EMAILJS_PUBLIC_KEY ||
      process.env.EMAILJS_USER_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY; // EmailJS Access Token for strict lockdown

    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        'EmailJS credentials are not fully configured in environment variables. Message logged on server.'
      );
      return NextResponse.json(
        {
          error:
            'Layanan pengiriman email sedang dalam pemeliharaan konfigurasi. Silakan hubungi langsung melalui email/sosial media.',
        },
        { status: 503 }
      );
    }

    // 8. Dispatch through EmailJS REST API from Server
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

    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('EmailJS dispatch error from server:', errorText);
      return NextResponse.json(
        { error: 'Gagal mengirim email melalui penyedia layanan. Silakan coba kembali nanti.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Pesan Anda telah berhasil dikirim! Terima kasih telah menghubungi.',
    });
  } catch (error) {
    console.error('Unexpected error in /api/contact:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat memproses pesan Anda.' },
      { status: 500 }
    );
  }
}

