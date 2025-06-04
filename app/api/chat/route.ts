import { NextRequest, NextResponse } from 'next/server';
import { getGeminiResponse } from '@/lib/gemini';
import { isGeminiConfigured, geminiApiInstructions } from './gemini-config';

export async function POST(req: NextRequest) {
  try {
    // Cek apakah Gemini API dikonfigurasi
    if (!isGeminiConfigured()) {
      return NextResponse.json({ 
        response: `API key untuk Gemini tidak ditemukan. ${geminiApiInstructions}` 
      }, { status: 200 });
    }

    // Mendapatkan pesan dari body permintaan
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Pesan tidak boleh kosong' }, { status: 400 });
    }

    // Mendapatkan respons dari Gemini
    const response = await getGeminiResponse(message);

    // Mengembalikan respons sebagai JSON
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error mengelola permintaan chat:', error);
    
    // Menambahkan lebih banyak detail error untuk debugging
    let errorMessage = 'Terjadi kesalahan dalam memproses permintaan Anda';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 