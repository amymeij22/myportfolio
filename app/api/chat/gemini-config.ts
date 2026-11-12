// Konfigurasi Gemini API
// Prioritaskan server-side GEMINI_API_KEY untuk keamanan (agar tidak terbocorkan ke client bundle),
// dengan fallback ke NEXT_PUBLIC_GEMINI_API_KEY untuk kompatibilitas.

export const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash-lite';

export function getGeminiApiKey(): string {
  return process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
}

export function getGeminiModel(): string {
  const configured = (process.env.GEMINI_MODEL || '').trim();
  // Validasi format nama model agar aman dipakai pada path endpoint REST API
  if (configured && /^[a-z0-9._-]+$/i.test(configured)) {
    return configured;
  }
  return DEFAULT_GEMINI_MODEL;
}

export function isGeminiConfigured(): boolean {
  return Boolean(getGeminiApiKey());
}
