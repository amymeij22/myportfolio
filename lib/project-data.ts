export interface Project {
  id: number;
  title: string;
  caption: string;
  description: string;
  problem: string;
  contribution: string;
  outcome: string;
  image_url: string;
  category: string;
  demo_url?: string;
  github_url?: string;
  featured: boolean;
  tags: string[];
  created_at: string;
}

export const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Sistem Otomasi Diseminasi Kenyamanan Termal (PET) & WebGIS Pariwisata Bali",
    caption: "Pipeline otomatis prakiraan kenyamanan termal biometeorologi berbasis PET & WebGIS untuk 49 destinasi wisata Bali.",
    problem: "Informasi cuaca konvensional belum menyajikan indeks kenyamanan termal manusia (PET) yang krusial bagi keselamatan dan kenyamanan wisatawan serta sektor pariwisata.",
    contribution: "Merancang arsitektur pipeline komputasi PET otomatis, database spasial, dan WebGIS interaktif tingkat desa/kelurahan.",
    outcome: "Melayani 49 destinasi wisata di 45 desa Bali. Mencapai 179 eksekusi sukses dari 180 jadwal (uptime 99.4%), rata-rata load WebGIS 301.3 ms, dan terdaftar 2 Hak Cipta (No. 001408188 & 001408179).",
    description: "Sistem diseminasi otomatis indeks Physiological Equivalent Temperature (PET) terintegrasi WebGIS untuk 49 destinasi wisata di 45 desa/kelurahan Provinsi Bali. Dibangun dengan integrasi API data cuaca BMKG, pipeline komputasi Python biometeo, basis data Supabase PostgreSQL, dan diseminasi peta tematik interaktif via Vercel.",
    image_url: "https://vzamvjeldyncrwmkasik.supabase.co/storage/v1/object/public/portfolio-assets/projects/p03-ina-forews.webp",
    category: "WebGIS & Otomasi",
    demo_url: "https://pet-bali.web.id",
    github_url: "https://github.com/amymeij22/pet-bali-webgis",
    featured: true,
    tags: ["Next.js", "Python", "WebGIS", "Supabase", "Biometeorology"],
    created_at: "2026-08-01T00:00:00Z"
  },
  {
    id: 2,
    title: "JEJAK — Sistem Informasi Kalibrasi Terpadu BBMKG Wilayah I Medan",
    caption: "Sistem manajemen operasional kalibrasi instrumen MKG yang mendigitalkan 10 alur kerja untuk 7 peran pengguna.",
    problem: "Proses pencatatan kalibrasi peralatan observasi meteorologi, klimatologi, dan geofisika sebelumnya rentan redundansi dan monitoring manual antar-divisi.",
    contribution: "Lead Developer saat magang: merancang model basis data relasional, alur otorisasi 7 peran, dan antarmuka pemantauan status kalibrasi real-time.",
    outcome: "Mendigitalkan 10 tahapan alur kalibrasi secara end-to-end untuk Balai Besar MKG Wilayah I Medan dan dianugerahi Hak Cipta Komputer No. 001451402.",
    description: "Sistem manajemen operasional kalibrasi instrumen MKG terintegrasi. Mengelola alur pendaftaran, inspeksi fisik, kalibrasi teknis, verifikasi mutu, hingga penerbitan sertifikat digital dengan audit trail terverifikasi.",
    image_url: "https://vzamvjeldyncrwmkasik.supabase.co/storage/v1/object/public/portfolio-assets/projects/p02-stmkg-website.webp",
    category: "Sistem Operasional",
    demo_url: "https://jejak-bbmkg1.web.id",
    github_url: "https://github.com/amymeij22/jejak-bbmkg",
    featured: true,
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Hak Cipta"],
    created_at: "2025-07-01T00:00:00Z"
  },
  {
    id: 3,
    title: "Inventro — Sistem Inventaris & Manajemen Alat Laboratorium STMKG",
    caption: "Aplikasi pengelolaan peminjaman, inventarisasi, dan pelacakan status kesiapan alat praktikum Elektronika STMKG.",
    problem: "Pencatatan peminjaman alat ukur osiloskop, multimeter, dan modul praktikum laboratorium masih bergantung pada logbook manual.",
    contribution: "Merancang dan membangun aplikasi inventaris lab dengan autentikasi taruna/dosen dan pelacakan stok komponen real-time.",
    outcome: "Diadopsi di Laboratorium Instrumentasi Elektronika STMKG untuk efisiensi inventarisasi dan pelacakan ratusan unit modul praktikum.",
    description: "Sistem manajemen inventaris laboratorium yang mengintegrasikan pencatatan peminjaman alat, pelacakan riwayat pemeliharaan, serta monitoring kondisi instrumen elektronik berbasis web modern.",
    image_url: "https://vzamvjeldyncrwmkasik.supabase.co/storage/v1/object/public/portfolio-assets/projects/p09-inventro.webp",
    category: "Sistem Web",
    demo_url: "https://inventro-stmkg.vercel.app",
    github_url: "https://github.com/amymeij22/inventro-lab",
    featured: false,
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Lab Management"],
    created_at: "2024-11-01T00:00:00Z"
  },
  {
    id: 4,
    title: "FINARY — Financial Literacy & AI Detection Engine",
    caption: "Capstone proyek AI Cohort Coding Camp DBS Foundation: model Residual MLP dan inferensi API deteksi keuangan.",
    problem: "Kebutuhan analisis cerdas dan deteksi pola literasi finansial masyarakat secara cepat dan akurat.",
    contribution: "Mengembangkan arsitektur model deep learning Residual MLP menggunakan TensorFlow dan membangun REST API inferensi cepat.",
    outcome: "Berhasil menyelesaikan kurikulum AI Engineer Coding Camp dengan predikat lulusan terbaik dan model inferensi berkinerja tinggi.",
    description: "Platform pendukung literasi keuangan dengan engine deteksi berbasis Artificial Intelligence. Mengintegrasikan model Residual MLP untuk klasifikasi pola dan API backend untuk integrasi multi-platform.",
    image_url: "https://vzamvjeldyncrwmkasik.supabase.co/storage/v1/object/public/portfolio-assets/projects/p08-research.webp",
    category: "Applied AI",
    demo_url: "https://finary-app.vercel.app",
    github_url: "https://github.com/amymeij22/finary-backend-ai",
    featured: false,
    tags: ["Python", "TensorFlow", "Deep Learning", "FastAPI"],
    created_at: "2026-07-01T00:00:00Z"
  },
  {
    id: 5,
    title: "Radiosonde ESP32 & LoRa Ra-02 untuk Profiling Udara Atas",
    caption: "Prototipe sistem radiosonde telemetri nirkabel berbasis LoRa untuk pengamatan profil atmosfer atas.",
    problem: "Tingginya biaya operasional instrumen radiosonde konvensional sekali pakai untuk sounding meteorologi.",
    contribution: "Merancang firmware modul sensor suhu, tekanan, dan kelembapan, transmisi frekuensi LoRa 433/915 MHz, dan dashboard penerima ground station.",
    outcome: "Dipublikasikan pada IEEE ICITCOM 2024 (DOI: 10.1109/ICITCOM62788.2024.10762300) dan diuji di lingkungan simulasi atmosfer.",
    description: "Sistem instrumentasi telemetri nirkabel menggunakan mikrokontroler ESP32 dan transceiver LoRa Ra-02. Berfungsi mentransmisikan data vertikal profil atmosfer (suhu, kelembapan, tekanan) ke stasiun bumi secara real-time.",
    image_url: "https://vzamvjeldyncrwmkasik.supabase.co/storage/v1/object/public/portfolio-assets/projects/p01-acws.webp",
    category: "Instrumentasi & IoT",
    demo_url: "https://doi.org/10.1109/ICITCOM62788.2024.10762300",
    github_url: "https://github.com/amymeij22/radiosonde-esp32-lora",
    featured: false,
    tags: ["ESP32", "LoRa", "Telemetri", "IEEE Publication"],
    created_at: "2024-09-01T00:00:00Z"
  }
];
