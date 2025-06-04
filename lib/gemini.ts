import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGeminiApiKey } from "@/app/api/chat/gemini-config";

// Informasi lengkap tentang pemilik website untuk konteks chatbot
const personalInfo = `
Nama: Ahmad Meijlan Yasir
Pendidikan:
- Sarjana Terapan Instrumentasi Meteorologi Klimatologi dan Geofisika (September 2022 - September 2026, diharapkan lulus) di Sekolah Tinggi Meteorologi Klimatologi dan Geofisika (STMKG), Tangerang, Banten
- Sekolah Menengah Atas – Matematika dan Ilmu Pengetahuan Alam (Juni 2019 - Juni 2022) di MAN Tanjungbalai, lulus sebagai 2nd Best Graduates dengan IPK 91

Pengalaman Profesional:
- Engineer Intern di Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) – Medan, Sumatera Utara (Maret 2025 - Sekarang)
  * Berpartisipasi dalam kalibrasi instrumen meteorologi, klimatologi, dan geofisika
  * Memperoleh pengalaman langsung dalam menafsirkan data kalibrasi
  * Memelihara standar pengukuran nasional
  * Mengembangkan aplikasi berbasis web real-time untuk melacak status kalibrasi instrumen lapangan

- Web Developer di Sekolah Tinggi Meteorologi, Klimatologi, dan Geofisika (STMKG) – Tangerang, Banten (Agustus 2024 - Sekarang)
  * Mengembangkan dan memelihara situs web institusi menggunakan WordPress dan Elementor
  * Mengelola pembaruan konten akademik dan portal layanan mahasiswa

- Chief Financial Officer di Kabagas Keren – Tangerang, Banten (Juni 2024 - Sekarang)
  * Mengelola penganggaran, laporan keuangan, dan alokasi dana untuk proyek-proyek teknologi dan IoT
  * Mengawasi jadwal proyek dan perencanaan sumber daya dari perspektif keuangan

- Web Developer di Kabagas Keren – Tangerang, Banten (Juni 2024 - Sekarang)
  * Merancang dan menyebarkan situs web untuk proyek klien yang berfokus pada teknologi, IoT, dan pendidikan
  * Mengimplementasikan strategi SEO untuk meningkatkan visibilitas dan kinerja pencarian

- Electronics Lab Assistant di STMKG – Tangerang, Banten (November 2023 - Sekarang)
  * Mengelola inventaris instrumen lab dan komponen elektronik
  * Mengawasi serta membimbing siswa selama sesi praktikum
  * Mengembangkan platform berbasis web untuk manajemen inventaris

- Team Manager di AURORA STMKG – Aircraft Division (Megadirga) – Tangerang, Banten (Januari 2023 - Januari 2025)
  * Memimpin kelompok riset mahasiswa yang berfokus pada sistem tanpa awak dan penginderaan jauh

Keterampilan:
- Keterampilan Teknis: HTML, CSS, JavaScript, React.js, TypeScript, Next.js, Tailwind CSS, WordPress, SQL, Python, Node.js, MongoDB, IoT, Git, GitHub, Docker, AWS, Linux, Microsoft Office, Web Development, SEO, Web Content Writing, AI Fundamentals
- Keterampilan Lunak: Project Management, Financial Reporting, Team Coordination, Leadership, Communication, Presentation, Time Management, Collaboration, Empathy, Problem Solving
- Bahasa: Indonesia (Native) dan Inggris (Limited Working Proficiency)

Proyek Utama:
- Real-time, website-based application untuk melacak status kalibrasi instrumen lapangan
- Web Portfolio (https://amymeij.web.id/)
- STMKG Website (https://stmkg.ac.id/)
- Inventro - Electronics Lab Inventory Management System (https://github.com/amymeij22/Inventro/)
- INA-FOREWS – Indonesia Forest Fires Early Warning System (https://forest-fires-ews.web.app/)
- Automatic Chains-D Weather Station (ACWS) (https://acws.vercel.app/)
- IoT-Based Air Quality Monitoring System Using ESP32
- The Carbon Dioxide Filtration System Using Chlorella Pyrenoidosa Microalgae IoT-based
- Radiosonde System Using ESP32 and LoRa Ra-02 Web-Based
- STMKG Regiment Commander Voting Application
- A RFID Based Library Attendance System
- STMKG Chatbot Assistant

Publikasi:
- Radiosonde System Using ESP32 and LoRa Ra-02 Web-Based for Upper-Air Profile Observation (2024) – IEEE
- IoT-Based Air Quality Monitoring System Design and Development Using ESP32 (2024) – IEEE
- Redesign of User Interface and Experience with Brand Identity Enhancement for the STMKG Website through WordPress Implementation (2025) – JoCPES
- PM2.5 Concentration Prediction Model in Jakarta Area Using Random Forest Algorithm (2025) – JoCPES
- The Carbon Dioxide Filtration System Using Chlorella Pyrenoidosa Microalgae IoT-based for Air Quality Improvement (2024) – IEEE
- Model of Lightning Strike Risk to Humans Based on Spatial Analysis and Environmental Factors (2023) – JoCPES

Penghargaan:
- Second Place – National Scientific Writing Competition PIPTK 2024 dari Forum Mahasiswa Kedinasan Indonesia

Sertifikasi:
- Artificial Intelligence Fundamentals – IBM
- CCNA: Switching, Routing, and Wireless Essentials – Cisco
- GitHub Foundations – GitHub
- Basic AI, Data Science, SQL, Project Management – Dicoding Indonesia
- AWS Cloud Practitioner Essentials – Dicoding
- Introduction to Data Science – Cisco
- Fundamental GIT – Progate
- Cybersecurity (Threat Management, Endpoint Security, Network Defense) – Cisco
- UNIX Command Line – Progate

Kepemimpinan:
- Leader di Dewan Musyawarah Taruna STMKG (Januari 2025 - Sekarang)
- Internal Subcommittee di IPTEK dan Jurnalistik STMKG (Oktober 2022 - Sekarang)
- Chair of Social and Political Affairs di Organisasi Siswa Intra Madrasah MAN Tanjungbalai (Juni 2020 - Juni 2021)

Sosial Media dan Kontak:
- Instagram: https://www.instagram.com/amymeij_22/
- LinkedIn: https://www.linkedin.com/in/ahmad-meijlan-yasir-1b950a351/
- Email: yasirahmad220504@gmail.com
- Lokasi: Banten, Indonesia
- Situs Web: https://amymeij.web.id

Kepribadian dan Pola Pikir:
- Struktural & Analitis: Cara berpikir yang sistematis, tidak hanya ingin sesuatu "jadi", tapi ingin tahu alasannya, strukturnya, dan kemungkinan penyederhanaan
- Visioner Praktikal: Memiliki visi ke depan yang realistis, sadar akan batasan alat dan keterampilan yang dimiliki
- Problem Solver: Tidak hanya memiliki ide bagus, tapi langsung memikirkan bentuk implementasinya, dari sistem hingga pengalaman pengguna
- Mandiri tapi Kolaboratif: Mampu bekerja sendiri namun tahu kapan harus berdiskusi atau meminta bantuan
- Terorganisir & Konsisten: Memiliki alur kerja yang tertata, tidak melompat-lompat atau asal memberikan ide
- Komunikasi to the point tapi santai: Gaya komunikasi jelas, langsung, tetapi tetap santai dan terbuka
- Rendah hati tapi percaya diri: Tidak bersikap sok tahu, namun menyadari kemampuan diri sendiri
`;

// Fungsi untuk mendapatkan respons dari Gemini
export async function getGeminiResponse(userInput: string) {
  const apiKey = getGeminiApiKey();
  
  if (!apiKey) {
    console.error("Gemini API key tidak ditemukan");
    return "Maaf, ada kesalahan dalam koneksi ke AI. Silakan coba lagi nanti.";
  }

  try {
    // URL endpoint API Gemini yang baru
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    // Data yang akan dikirim ke API
    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `Kamu adalah asisten virtual untuk Ahmad Meijlan Yasir.
              
Berikut adalah informasi tentang Ahmad Meijlan Yasir yang bisa kamu gunakan untuk menjawab pertanyaan:
${personalInfo}

Berdasarkan informasi di atas, tolong jawab pertanyaan berikut dengan ramah, informatif, dan profesional.
Gunakan gaya bahasa yang santai dan semi-formal (seperti menggunakan "aku", "kamu", "gue", "lo" sesekali tergantung gaya bahasa pengguna), tapi tetap menjaga profesionalisme.
Hindari bahasa yang terlalu kaku atau formal. Jadilah ramah dan approachable, seolah-olah kamu adalah teman yang kebetulan tahu banyak tentang Ahmad Meijlan Yasir.

Pertanyaan: "${userInput}"

Jika ditanya hal yang tidak ada di informasi di atas, katakan kamu tidak memiliki informasi tersebut tetapi bisa menghubungi Ahmad langsung melalui email atau sosial medianya.
Jawaban dibawah 150 kata dan berbahasa Indonesia.`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
        topK: 40,
        topP: 0.95
      }
    };

    // Mengirim permintaan ke API
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`Error API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Mengembalikan teks respons
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Format respons tidak sesuai:", data);
      return "Maaf, saya tidak dapat memproses respons saat ini. Silakan coba lagi nanti.";
    }
  } catch (error) {
    console.error("Error mendapatkan respons dari Gemini:", error);
    return "Maaf, saya mengalami kesalahan. Silakan coba lagi nanti.";
  }
} 