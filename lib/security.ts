import crypto from 'crypto';

// Secret salt for HMAC token generation (falls back to a stable session string)
const HMAC_SECRET = process.env.SECURITY_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || 'antigravity-secure-salt-2026';

/**
 * Generate a signed mathematical challenge with timestamp.
 * Returns the two numbers to add and an HMAC signature.
 */
export function generateSignedChallenge(): {
  num1: number;
  num2: number;
  token: string;
} {
  const num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
  const num2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
  const answer = num1 + num2;
  const timestamp = Date.now();

  const payload = `${answer}:${timestamp}`;
  const signature = crypto
    .createHmac('sha256', HMAC_SECRET)
    .update(payload)
    .digest('hex');

  // Token format: answerHash.timestamp.signature
  const token = Buffer.from(`${timestamp}.${signature}.${answer}`).toString('base64url');

  return { num1, num2, token };
}

/**
 * Verify a user's answer against the signed challenge token.
 * Token expires in 10 minutes and requires minimum 2 seconds interaction to defeat instant-fire bots.
 */
export function verifySignedChallenge(userAnswer: number | string, token: string): {
  valid: boolean;
  reason?: string;
} {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [timestampStr, signature, expectedAnswerStr] = decoded.split('.');

    if (!timestampStr || !signature || !expectedAnswerStr) {
      return { valid: false, reason: 'Token verifikasi tidak valid' };
    }

    const timestamp = parseInt(timestampStr, 10);
    const expectedAnswer = parseInt(expectedAnswerStr, 10);
    const parsedUserAnswer = parseInt(String(userAnswer), 10);

    const now = Date.now();
    // Expiration check: 10 minutes
    if (now - timestamp > 10 * 60 * 1000) {
      return { valid: false, reason: 'Tantangan verifikasi telah kedaluwarsa. Silakan refresh.' };
    }

    // Minimum interaction time check: at least 1.5 seconds from challenge issue
    if (now - timestamp < 1500) {
      return { valid: false, reason: 'Pengiriman terlalu cepat terdeteksi oleh sistem keamanan.' };
    }

    // Verify HMAC integrity
    const expectedPayload = `${expectedAnswer}:${timestamp}`;
    const recalculatedSignature = crypto
      .createHmac('sha256', HMAC_SECRET)
      .update(expectedPayload)
      .digest('hex');

    if (recalculatedSignature !== signature) {
      return { valid: false, reason: 'Integritas token gagal diverifikasi.' };
    }

    // Verify numerical answer
    if (parsedUserAnswer !== expectedAnswer) {
      return { valid: false, reason: 'Jawaban verifikasi matematika salah.' };
    }

    return { valid: true };
  } catch {
    return { valid: false, reason: 'Gagal memproses token verifikasi.' };
  }
}

/**
 * Sanitize text to prevent SMTP header injection (CRLF) and control characters.
 */
export function sanitizePlainText(input: string): string {
  return input
    .replace(/[\r\n]+/g, ' ') // remove CR and LF to prevent header injection
    .trim();
}

/**
 * Generic in-memory sliding window rate limiter
 */
interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

export function createRateLimiter(options: RateLimitOptions) {
  const store = new Map<string, { count: number; expiresAt: number }>();

  return function checkLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
    const now = Date.now();
    const record = store.get(key);

    // Garbage collection if map grows too big
    if (store.size > 2000) {
      for (const [k, v] of store.entries()) {
        if (v.expiresAt < now) {
          store.delete(k);
        }
      }
    }

    if (!record || record.expiresAt < now) {
      store.set(key, { count: 1, expiresAt: now + options.windowMs });
      return { allowed: true };
    }

    if (record.count >= options.maxRequests) {
      const retryAfterSeconds = Math.ceil((record.expiresAt - now) / 1000);
      return { allowed: false, retryAfterSeconds };
    }

    record.count += 1;
    return { allowed: true };
  };
}

