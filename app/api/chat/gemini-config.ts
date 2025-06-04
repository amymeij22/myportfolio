// Catatan untuk deployment: 
// Tambahkan Gemini API key ke variabel lingkungan dengan nama NEXT_PUBLIC_GEMINI_API_KEY

// Cek apakah API key tersedia
export function isGeminiConfigured(): boolean {
  return process.env.NEXT_PUBLIC_GEMINI_API_KEY ? true : false;
}

// Mendapatkan API key untuk Gemini
export function getGeminiApiKey(): string {
  return process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
}

// Panduan untuk mendapatkan API key
export const geminiApiInstructions = `
Untuk menggunakan fitur chatbot pada website ini:

1. Dapatkan API key dari Google AI Studio:
   - Kunjungi https://ai.google.dev/ 
   - Daftar atau masuk ke akun Google
   - Buat API key baru

2. Tambahkan API key ke file .env.local:
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

3. Restart server development:
   npm run dev
`; 