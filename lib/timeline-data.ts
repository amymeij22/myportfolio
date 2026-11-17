export interface JourneyDetail {
  points: string[];
  tags: string[];
  link?: {
    url: string;
    label: string;
  };
}

export interface JourneyEntry {
  id: string;
  year: string;
  period: string;
  title: string;
  organization: string;
  category: "Pendidikan" | "Kepemimpinan" | "Pengalaman" | "Pengembangan";
  iconType: "education" | "team" | "lab" | "web" | "finance" | "leadership" | "intern" | "ai";
  summary: string;
  details: JourneyDetail;
}

// Verified journey ordered in reverse-chronological order (newest to oldest: 2026 -> 2022) - Indonesian
export const verifiedJourney: JourneyEntry[] = [
  {
    id: "coding-camp-ai",
    year: "2026",
    period: "Feb — Agu 2026",
    title: "AI Engineer Cohort",
    organization: "Coding Camp powered by DBS Foundation",
    category: "Pengembangan",
    iconType: "ai",
    summary: "Capstone machine learning dan implementasi model inference API.",
    details: {
      points: [
        "Menyelesaikan jalur pembelajaran intensif AI Engineering: Machine Learning, Deep Learning (TensorFlow), CV, dan NLP.",
        "Merancang arsitektur model deep learning Residual Multi-Layer Perceptron (Residual MLP) berbasis TensorFlow.",
        "Membangun REST API performa tinggi untuk inferensi model prediksi dan mengintegrasikannya ke platform aplikasi FINARY."
      ],
      tags: ["TensorFlow", "Residual MLP", "Model Inference API", "FINARY"]
    }
  },
  {
    id: "bbmkg-intern",
    year: "2025",
    period: "Mar — Jul 2025",
    title: "Engineer Intern • Instrumentasi & Kalibrasi",
    organization: "BBMKG Wilayah I",
    category: "Pengalaman",
    iconType: "intern",
    summary: "Keterlibatan dalam kalibrasi, inspeksi, pengujian, dan interpretasi data instrumen.",
    details: {
      points: [
        "Terlibat langsung dalam operasional kalibrasi, inspeksi presisi, pengujian modul, dan pemeliharaan alat ukur BMKG.",
        "Menganalisis dan memvalidasi rekaman data kalibrasi instrumen stasiun meteorologi, klimatologi, dan geofisika.",
        "Merancang dan mendeploy JEJAK (Sistem Informasi Kalibrasi Terpadu), mendigitalkan 10 tahapan alur kalibrasi untuk 7 peran pengguna.",
        "JEJAK resmi terdaftar dalam Hak Cipta Komputer No. 001451402 pada Pangkalan Data Kekayaan Intelektual."
      ],
      tags: ["JEJAK", "Kalibrasi BMKG", "Hak Cipta Komputer", "Sistem Terpadu"]
    }
  },
  {
    id: "ketua-demustar",
    year: "2025",
    period: "Jan 2025 — Jan 2026",
    title: "Ketua Dewan Musyawarah Taruna",
    organization: "STMKG",
    category: "Kepemimpinan",
    iconType: "leadership",
    summary: "Koordinasi program kerja, kolaborasi organisasi, dan kaderisasi.",
    details: {
      points: [
        "Memimpin Dewan Musyawarah Taruna (Demustar) STMKG sebagai badan legislatif tertinggi dan representasi resmi seluruh taruna STMKG.",
        "Menginisiasi dan mengesahkan nota kesepahaman (MoU) kemitraan dengan Resimen Taruna dan Polisi Taruna STMKG.",
        "Mengawasi pelaksanaan program kerja organisasi kemahasiswaan dan merumuskan regulasi tata kehidupan taruna.",
        "Menyelenggarakan Latihan Dasar Kepemimpinan (LDK) untuk kaderisasi dan pembinaan calon pengurus dewan baru."
      ],
      tags: ["Badan Legislatif", "MoU Organisasi", "Kepemimpinan Taruna", "Kaderisasi"]
    }
  },
  {
    id: "kabagas-keren",
    year: "2024",
    period: "Jun 2024 — Sep 2026",
    title: "Web Developer & Chief Financial Officer",
    organization: "Kabagas Keren",
    category: "Pengalaman",
    iconType: "finance",
    summary: "Pengembangan web, perencanaan anggaran, dan koordinasi sumber daya.",
    details: {
      points: [
        "Mengembangkan dan mengelola platform web organisasi serta infrastruktur digital pendukung kegiatan.",
        "Menyusun perencanaan anggaran, arus kas (cash flow), dan pertanggungjawaban keuangan organisasi secara transparan.",
        "Mengkoordinasikan alokasi logistik dan kolaborasi antar-divisi dalam penyelenggaraan program kerja."
      ],
      tags: ["Fullstack Web", "Financial Planning", "Resource Management", "Operasional"]
    }
  },
  {
    id: "web-dev-stmkg",
    year: "2023",
    period: "Nov 2023 — Sep 2026",
    title: "Web Developer",
    organization: "STMKG",
    category: "Pengalaman",
    iconType: "web",
    summary: "Pengembangan ulang dan pemeliharaan website institusi.",
    details: {
      points: [
        "Membangun ulang dan memodernisasi portal web resmi kampus (stmkg.ac.id) untuk memulihkan kehadiran online institusi.",
        "Mengembangkan modul konten, layout responsif, dan optimasi performa akses informasi dinas.",
        "Mengelola pembaruan berkala pengumuman resmi kedinasan, agenda akademik, dan publikasi kegiatan kampus."
      ],
      tags: ["Web Development", "Portal Institusi", "CMS", "Frontend"]
    }
  },
  {
    id: "lab-assistant",
    year: "2023",
    period: "Nov 2023 — Sep 2026",
    title: "Asisten Laboratorium Elektronika",
    organization: "STMKG",
    category: "Pengalaman",
    iconType: "lab",
    summary: "Pengelolaan inventaris, dokumentasi, SOP, dan pendampingan praktikum.",
    details: {
      points: [
        "Mengembangkan platform Inventro: sistem manajemen inventaris dan sirkulasi peminjaman alat laboratorium elektronika.",
        "Mengelola pencatatan suku cadang komponen, instrumen ukur, dan modul mikrokontroler praktikum secara berkala.",
        "Menyusun dan memperbarui Standar Operasional Prosedur (SOP) keselamatan praktikum laboratorium.",
        "Mendampingi taruna junior dalam praktikum rangkaian analog, sistem digital, dan interfacing mikrokontroler."
      ],
      tags: ["Inventro", "Manajemen Lab", "Elektronika", "SOP Praktikum"]
    }
  },
  {
    id: "aurora-manager",
    year: "2023",
    period: "Jan 2023 — Jan 2025",
    title: "Team Manager",
    organization: "AURORA STMKG · Aircraft Division (Megadirga)",
    category: "Kepemimpinan",
    iconType: "team",
    summary: "Koordinasi tim riset sistem nirawak dan penginderaan jauh.",
    details: {
      points: [
        "Mengkoordinasikan tim riset mahasiswa pada wahana nirawak (UAV) dan sistem penginderaan jauh atmosfer.",
        "Mengelola target capaian teknis, jadwal kerja litbang, dan pembagian modul sistem avionik.",
        "Mendukung perencanaan proyek rekayasa serta pelaksanaan uji terbang (flight-testing) di lapangan."
      ],
      tags: ["UAV Research", "Penginderaan Jauh", "Team Management", "Avionik"]
    }
  },
  {
    id: "stmkg-degree",
    year: "2022",
    period: "Sep 2022 — Sep 2026",
    title: "Sarjana Terapan Instrumentasi MKG",
    organization: "STMKG",
    category: "Pendidikan",
    iconType: "education",
    summary: "Pendidikan kedinasan berfokus pada instrumentasi meteorologi, kalibrasi sensor, dan sistem akuisisi data otomatis.",
    details: {
      points: [
        "Mendalami instrumentasi meteorologi, kalibrasi sensor fisis, elektronika terapan, mikrokontroler, dan sistem akuisisi data dinas.",
        "Menyelesaikan masa studi kedinasan 4 tahun dengan fokus pada instrumentasi operasional dan rekayasa perangkat lunak.",
        "Dianugerahi penghargaan Karya Cipta Madya atas kontribusi riset dan inovasi terapan dalam instrumentasi."
      ],
      tags: ["Instrumentasi MKG", "Kalibrasi Sensor", "Elektronika Terapan", "Sistem Akuisisi Data"]
    }
  }
];

// Verified journey ordered in reverse-chronological order (newest to oldest: 2026 -> 2022) - English
export const verifiedJourneyEn: JourneyEntry[] = [
  {
    id: "coding-camp-ai",
    year: "2026",
    period: "Feb — Aug 2026",
    title: "AI Engineer Cohort",
    organization: "Coding Camp powered by DBS Foundation",
    category: "Pengembangan",
    iconType: "ai",
    summary: "Machine learning capstone and inference API model implementation.",
    details: {
      points: [
        "Completed intensive AI Engineering track: Machine Learning, Deep Learning (TensorFlow), Computer Vision, and NLP.",
        "Engineered Residual Multi-Layer Perceptron (Residual MLP) deep learning architectures with TensorFlow.",
        "Built high-performance REST APIs for predictive inference and integrated them into the FINARY application platform."
      ],
      tags: ["TensorFlow", "Residual MLP", "Model Inference API", "FINARY"]
    }
  },
  {
    id: "bbmkg-intern",
    year: "2025",
    period: "Mar — Jul 2025",
    title: "Engineering Intern • Instrumentation & Calibration",
    organization: "BBMKG Region I",
    category: "Pengalaman",
    iconType: "intern",
    summary: "Hands-on calibration, precision inspection, modular testing, and instrument data interpretation.",
    details: {
      points: [
        "Engaged directly in calibration operations, precision inspections, module testing, and maintenance of BMKG measuring instruments.",
        "Analyzed and validated calibration datasets from meteorological, climatological, and geophysical stations.",
        "Architected and deployed JEJAK (Integrated Calibration Information System), digitizing 10 workflow phases across 7 user roles.",
        "JEJAK officially registered under Computer Program Copyright No. 001451402 in the National Intellectual Property Database."
      ],
      tags: ["JEJAK", "BMKG Calibration", "Computer Copyright", "Integrated Systems"]
    }
  },
  {
    id: "ketua-demustar",
    year: "2025",
    period: "Jan 2025 — Jan 2026",
    title: "President of Cadet Deliberative Council",
    organization: "STMKG",
    category: "Kepemimpinan",
    iconType: "leadership",
    summary: "Program coordination, inter-organizational synergy, and institutional leadership development.",
    details: {
      points: [
        "Led the Cadet Deliberative Council (Demustar) STMKG as the highest legislative body and official representation of all cadets.",
        "Initiated and ratified strategic Memorandums of Understanding (MoU) with the Cadet Regiment and Cadet Police Corps.",
        "Supervised execution of student body programs and formulated cadet institutional conduct regulations.",
        "Organized Basic Leadership Training (LDK) for cadet cadre development and succession planning."
      ],
      tags: ["Legislative Body", "Institutional MoU", "Cadet Leadership", "Cadre Development"]
    }
  },
  {
    id: "kabagas-keren",
    year: "2024",
    period: "Jun 2024 — Sep 2026",
    title: "Web Developer & Chief Financial Officer",
    organization: "Kabagas Keren",
    category: "Pengalaman",
    iconType: "finance",
    summary: "Web platform development, budget forecasting, and operational resource coordination.",
    details: {
      points: [
        "Developed and maintained organizational web platforms and digital operational infrastructure.",
        "Formulated budgetary planning, cash flow projections, and transparent financial accountability.",
        "Coordinated logistical distribution and cross-divisional collaboration for organizational programs."
      ],
      tags: ["Full-Stack Web", "Financial Planning", "Resource Management", "Operations"]
    }
  },
  {
    id: "web-dev-stmkg",
    year: "2023",
    period: "Nov 2023 — Sep 2026",
    title: "Web Developer",
    organization: "STMKG",
    category: "Pengalaman",
    iconType: "web",
    summary: "Institutional website redesign, maintenance, and performance optimization.",
    details: {
      points: [
        "Redesigned and modernized the official campus web portal (stmkg.ac.id) to restore institutional online presence.",
        "Developed content modules, responsive layouts, and performance optimizations for public agency information access.",
        "Managed scheduled updates of official government announcements, academic schedules, and campus publications."
      ],
      tags: ["Web Development", "Campus Portal", "CMS", "Frontend"]
    }
  },
  {
    id: "lab-assistant",
    year: "2023",
    period: "Nov 2023 — Sep 2026",
    title: "Electronics Laboratory Teaching Assistant",
    organization: "STMKG",
    category: "Pengalaman",
    iconType: "lab",
    summary: "Inventory management, SOP documentation, and laboratory practicum guidance.",
    details: {
      points: [
        "Developed Inventro: an inventory management and equipment loan tracking platform for the electronics laboratory.",
        "Maintained systematic tracking of electronic spare parts, measuring instruments, and microcontroller training kits.",
        "Drafted and revised Standard Operating Procedures (SOP) for laboratory safety and equipment handling.",
        "Mentored junior cadets in analog circuitry, digital systems, and microcontroller hardware interfacing."
      ],
      tags: ["Inventro", "Lab Management", "Applied Electronics", "Practicum SOP"]
    }
  },
  {
    id: "aurora-manager",
    year: "2023",
    period: "Jan 2023 — Jan 2025",
    title: "Team Manager",
    organization: "AURORA STMKG · Aircraft Division (Megadirga)",
    category: "Kepemimpinan",
    iconType: "team",
    summary: "Coordinating student research teams in unmanned aerial vehicles and remote sensing.",
    details: {
      points: [
        "Coordinated student research teams focusing on unmanned aerial vehicles (UAV) and atmospheric remote sensing systems.",
        "Managed engineering milestone targets, R&D timelines, and avionics subsystem task allocations.",
        "Supported flight planning, mission architecture, and field flight-testing operations."
      ],
      tags: ["UAV Research", "Remote Sensing", "Team Management", "Avionics"]
    }
  },
  {
    id: "stmkg-degree",
    year: "2022",
    period: "Sep 2022 — Sep 2026",
    title: "Bachelor of Applied Science in MKG Instrumentation",
    organization: "STMKG",
    category: "Pendidikan",
    iconType: "education",
    summary: "Government cadet education focused on meteorological instrumentation, sensor calibration, and automated data acquisition systems.",
    details: {
      points: [
        "Completed rigorous study in meteorological instrumentation, physical sensor calibration, applied electronics, microcontrollers, and official DAQ systems.",
        "Completed 4-year government scholarship curriculum specializing in operational instrumentation and software engineering.",
        "Conferred the Karya Cipta Madya Award for applied research excellence and instrumentation software innovations."
      ],
      tags: ["MKG Instrumentation", "Sensor Calibration", "Applied Electronics", "Data Acquisition"]
    }
  }
];

export function getVerifiedJourney(locale?: string): JourneyEntry[] {
  if (locale === "en") {
    return verifiedJourneyEn;
  }
  return verifiedJourney;
}

// Backward-compatible fallback for any legacy consumers
export interface TimelineEvent {
  id: number;
  title: string;
  organization: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  location: string;
  type: "Pendidikan" | "Pengalaman" | "Kepemimpinan";
  created_at: string;
}

export const fallbackTimeline: TimelineEvent[] = verifiedJourney.map((item, index) => ({
  id: index + 1,
  title: item.title,
  organization: item.organization,
  start_date: item.period.split("—")[0].trim(),
  end_date: item.period.split("—")[1]?.trim() || "",
  is_current: false,
  description: item.summary,
  location: "Indonesia",
  type: item.category === "Pendidikan" ? "Pendidikan" : item.category === "Kepemimpinan" ? "Kepemimpinan" : "Pengalaman",
  created_at: new Date().toISOString()
}));
