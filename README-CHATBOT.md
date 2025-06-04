# Fitur Chatbot - "KNOW ME MORE!"

Fitur chatbot "KNOW ME MORE!" adalah asisten virtual yang memungkinkan pengunjung website berinteraksi dan mendapatkan informasi tentang Ahmad Meijlan Yasir secara langsung.

## Cara Kerja

1. **Floating Tag**: Tombol "KNOW ME MORE!" muncul di sisi kanan halaman setelah pengunjung melakukan scroll atau setelah 3 detik.

2. **Window Chat**: Saat tombol diklik, window chat akan muncul dari sisi kanan dengan animasi yang menarik.

3. **Interaksi**: Pengunjung dapat mengirim pesan dan akan mendapatkan respons dari asisten virtual berdasarkan informasi yang telah disediakan tentang Ahmad Meijlan Yasir.

4. **Berbasis AI**: Chatbot memanfaatkan Gemini AI dari Google untuk memberikan respons yang relevan dan natural.

## Teknologi yang Digunakan

- **Next.js**: Framework React untuk aplikasi web
- **Framer Motion**: Untuk animasi yang halus dan menarik
- **Tailwind CSS**: Untuk styling yang responsif dan modern
- **Gemini 2.0 Flash**: Model AI dari Google untuk pemrosesan bahasa alami

## Pengaturan API Key

Untuk mengaktifkan fitur chatbot, Anda perlu mendapatkan API key dari Google AI Studio:

1. Kunjungi [Google AI Studio](https://ai.google.dev/)
2. Daftar/login dan buat API key baru
3. Tambahkan API key ke file `.env.local`:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Restart server development: `npm run dev`

## Komponen Utama

1. **ChatButton.tsx**: Komponen utama yang menampilkan tombol floating dan window chat
2. **ChatbotWrapper.tsx**: Wrapper Client Component yang mengatasi masalah SSR
3. **lib/gemini.ts**: Integrasi dengan Gemini API
4. **app/api/chat/route.ts**: API endpoint untuk meneruskan pesan ke Gemini API

## Implementasi Teknis

Chatbot menggunakan Gemini 2.0 Flash API dengan endpoint:
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
```

Parameter utama yang digunakan:
- **temperature**: 0.7 (keberagaman output)
- **maxOutputTokens**: 800 (panjang maksimum respons)
- **topK**: 40 dan **topP**: 0.95 (parameter sampling untuk kualitas teks)

## Kustomisasi

Anda dapat mengkustomisasi chatbot dengan:

1. Mengubah informasi pribadi di `lib/gemini.ts`
2. Menyesuaikan desain dengan mengedit CSS di `ChatButton.tsx`
3. Mengubah prompt yang dikirim ke Gemini di `lib/gemini.ts`
4. Menyesuaikan parameter generasi di `lib/gemini.ts` untuk mengubah gaya respons

## Responsif

Chatbot dirancang untuk bekerja dengan baik di semua ukuran layar:
- Pada desktop: Window chat yang lebih lebar dengan tombol yang terlihat jelas
- Pada mobile: Window chat yang menyesuaikan lebar layar dan UX yang tetap nyaman

## Troubleshooting

Jika Anda mengalami masalah:

1. Pastikan API key sudah dikonfigurasi dengan benar di `.env.local`
2. Periksa console browser untuk error API atau permintaan jaringan
3. Verifikasi bahwa Next.js API route `/api/chat` berfungsi dengan benar
4. Periksa kuota API Gemini Anda jika respons tidak muncul
5. Pada mode development, coba restart server dengan `npm run dev` jika ada perubahan pada file konfigurasi 