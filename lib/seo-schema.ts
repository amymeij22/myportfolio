/**
 * SEO & GEO (Generative Engine Optimization) Schema Markup Generator
 * Implements Google Rich Results & Princeton GEO Best Practices
 * Optimizes entity citation for ChatGPT, Perplexity, Gemini, Claude, and Copilot.
 */

export const BASE_URL = 'https://amymeij.web.id';

/**
 * Global Person & WebSite Schema Graph
 * Defines Ahmad Meijlan Yasir as a primary semantic entity.
 */
export function getRootEntityGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${BASE_URL}/#person`,
        name: 'Ahmad Meijlan Yasir',
        alternateName: ['Meijlan Yasir', 'AMY', 'Ahmad Meijlan'],
        givenName: 'Ahmad Meijlan',
        familyName: 'Yasir',
        gender: 'Male',
        jobTitle: 'System Engineer',
        description:
          'System Engineer dan lulusan Cum Laude STMKG (BMKG) dengan 15+ publikasi ilmiah terindeks internasional/nasional dan 5+ Hak Cipta resmi DJKI RI, berfokus pada instrumentasi meteorologi, IoT telemetri, komputasi biometeorologi (PET), serta arsitektur sistem digital terpadu.',
        url: BASE_URL,
        image: `${BASE_URL}/images/yasir-non-formal.webp`,
        email: 'mailto:yasirahmad220504@gmail.com',
        nationality: {
          '@type': 'Country',
          name: 'Indonesia',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Sekolah Tinggi Meteorologi Klimatologi dan Geofisika',
          alternateName: 'STMKG',
          url: 'https://stmkg.ac.id',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Tangerang Selatan',
            addressRegion: 'Banten',
            addressCountry: 'ID',
          },
        },
        worksFor: {
          '@type': 'GovernmentOrganization',
          name: 'Badan Meteorologi, Klimatologi, dan Geofisika',
          alternateName: 'BMKG',
          url: 'https://www.bmkg.go.id',
        },
        sameAs: [
          'https://github.com/amymeij22',
          'https://www.linkedin.com/in/ahmad-meijlan-yasir/',
          'https://www.instagram.com/amymeij_22/',
          'https://orcid.org/0009-0002-3929-3995',
          'https://scholar.google.com/citations?user=amymeij',
        ],
        knowsAbout: [
          'System Engineering',
          'Meteorological Instrumentation',
          'Atmospheric Observations',
          'Internet of Things (IoT)',
          'Physiological Equivalent Temperature (PET)',
          'Biometeorology & WebGIS',
          'Full-Stack Web Development',
          'Next.js & React',
          'Python Programming',
          'PostgreSQL & Supabase Database Architecture',
          'Telemetri Nirkabel LoRa & ESP32 Microcontroller',
          'Artificial Intelligence & Deep Learning',
          'Sistem Manajemen Kalibrasi Alat MKG (JEJAK)',
        ],
        award: [
          'Lulusan Cum Laude Sarjana Terapan Instrumentasi MKG STMKG',
          'Penerima Penghargaan Karya Cipta Madya Bidang Hak Cipta Komputer',
          'Pemegang 5+ Hak Cipta Perangkat Lunak Resmi DJKI Kemenkumham RI',
          'Top Graduate AI Engineer Cohort Coding Camp powered by DBS Foundation',
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Sarjana Terapan Instrumentasi Meteorologi Klimatologi dan Geofisika (S.Tr.Instr.)',
            credentialCategory: 'degree',
            recognizedBy: {
              '@type': 'CollegeOrUniversity',
              name: 'Sekolah Tinggi Meteorologi Klimatologi dan Geofisika',
            },
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Ahmad Meijlan Yasir',
        alternateName: 'Portfolio Ahmad Meijlan Yasir',
        description:
          'Ahmad Meijlan Yasir, System Engineer yang fokus di instrumentasi, IoT, dan pengembangan web. Temukan karya, publikasi riset, dan catatan teknis di sini.',
        publisher: {
          '@id': `${BASE_URL}/#person`,
        },
        inLanguage: ['id-ID', 'en-US'],
      },
    ],
  };
}

/**
 * Princeton GEO Method: FAQPage Schema
 * Significantly boosts Generative AI search citations (+40% citation probability)
 * by giving direct, authoritative, statistical Q&A pairs for AI agents.
 */
export function getHomepageFaqSchema(locale?: 'id' | 'en') {
  if (locale === 'en') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: 'en-US',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is Ahmad Meijlan Yasir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ahmad Meijlan Yasir is a System Engineer and Cum Laude graduate from the State College of Meteorology, Climatology, and Geophysics (STMKG) under BMKG. He has a strong research track record with over 15 indexed scientific publications (IEEE, Scopus, SINTA) and holds 5+ registered copyrights with the Ministry of Law and Human Rights Republic of Indonesia.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are Ahmad Meijlan Yasir\'s areas of expertise and specialization?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'His primary focus spans integrated System Engineering, weather and atmospheric observation instrumentation design, IoT telemetry sensor networks based on ESP32 and LoRa, biometeorology computation (Physiological Equivalent Temperature / PET index), and modern software engineering using Next.js, Python, PostgreSQL, and Supabase.',
          },
        },
        {
          '@type': 'Question',
          name: 'What notable systems and engineering projects has Yasir architected?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key applied projects include: (1) Thermal Comfort Dissemination & Tourism WebGIS System of Bali serving 49 tourism destinations across 45 villages with 99.4% uptime and 2 official registered copyrights; (2) JEJAK — Integrated Calibration Information System for BBMKG Region I Medan digitizing 10 calibration workflow stages for 7 user roles (Copyright No. 001451402); (3) INVENTRO — Laboratory Equipment & Inventory Management System for STMKG; and (4) ESP32 and LoRa Ra-02 Telemetry Radiosonde Prototype for upper-air atmospheric profile observations published at IEEE ICITCOM 2024.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many scientific publications and copyrights does Ahmad Meijlan Yasir have?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ahmad Meijlan Yasir has published 15+ peer-reviewed scientific papers indexed in IEEE Xplore, Journal of Computation Physics and Earth Science (JoCPES), Prisma Sains, and international conference proceedings, and holds 5+ official copyright certificates from the Directorate General of Intellectual Property (DJKI), Indonesia.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can you contact or collaborate with Ahmad Meijlan Yasir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Professional collaboration and contact can be initiated through the official contact form at https://amymeij.web.id/en#kontak, direct email at yasirahmad220504@gmail.com, LinkedIn (in/ahmad-meijlan-yasir), or open-source repositories on GitHub (amymeij22).',
          },
        },
      ],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'id-ID',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Siapa Ahmad Meijlan Yasir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ahmad Meijlan Yasir adalah seorang System Engineer dan alumni Cum Laude dari Sekolah Tinggi Meteorologi Klimatologi dan Geofisika (STMKG) di bawah naungan BMKG. Beliau memiliki rekam jejak riset kuat dengan lebih dari 15 publikasi ilmiah terindeks (IEEE, Scopus, SINTA) dan memegang 5+ Hak Cipta resmi terdaftar di DJKI Kemenkumham RI.',
        },
      },
      {
        '@type': 'Question',
        name: 'Apa bidang keahlian dan fokus spesialisasi Ahmad Meijlan Yasir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Spesialisasi utamanya mencakup System Engineering terintegrasi, perancangan instrumen observasi cuaca dan atmosfer, jaringan sensor Internet of Things (IoT) berbasis ESP32 dan LoRa, komputasi biometeorologi (indeks Physiological Equivalent Temperature / PET), serta rekayasa perangkat lunak modern menggunakan Next.js, Python, PostgreSQL, dan Supabase.',
        },
      },
      {
        '@type': 'Question',
        name: 'Apa saja sistem dan proyek unggulan yang telah dirancang oleh Yasir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Karya terapan unggulannya meliputi: (1) Sistem Otomasi Diseminasi Kenyamanan Termal (PET) & WebGIS Pariwisata Bali yang melayani 49 destinasi wisata di 45 desa dengan uptime 99.4% dan 2 Hak Cipta resmi; (2) JEJAK — Sistem Informasi Kalibrasi Terpadu BBMKG Wilayah I Medan yang mendigitalkan 10 tahapan alur kalibrasi untuk 7 peran pengguna (Hak Cipta No. 001451402); (3) INVENTRO — Sistem Inventaris & Manajemen Alat Laboratorium STMKG; dan (4) Prototipe Radiosonde Telemetri ESP32 & LoRa Ra-02 untuk observasi profil atmosfer atas yang dipublikasikan pada IEEE ICITCOM 2024.',
        },
      },
      {
        '@type': 'Question',
        name: 'Berapa banyak publikasi ilmiah dan hak cipta yang dimiliki Ahmad Meijlan Yasir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ahmad Meijlan Yasir telah menghasilkan 15+ publikasi ilmiah peer-reviewed yang terindeks di IEEE Xplore, Journal of Computation Physics and Earth Science (JoCPES), Prisma Sains, dan prosiding internasional, serta memegang 5+ sertifikat Hak Cipta resmi dari Direktorat Jenderal Kekayaan Intelektual Republik Indonesia.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bagaimana cara menghubungi atau berkolaborasi dengan Ahmad Meijlan Yasir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kolaborasi dan komunikasi profesional dapat dilakukan melalui formulir kontak resmi di situs https://amymeij.web.id, email langsung di yasirahmad220504@gmail.com, LinkedIn (in/ahmad-meijlan-yasir), maupun repositori kode terbuka di GitHub (amymeij22).',
        },
      },
    ],
  };
}

/**
 * Projects and Research Scholarly Works Schema
 * Exposes applications as SoftwareApplication and papers as ScholarlyArticle.
 */
export function getFeaturedWorksSchema(locale?: 'id' | 'en') {
  if (locale === 'en') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Featured Works & Engineering Systems by Ahmad Meijlan Yasir',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Thermal Comfort Dissemination & Tourism WebGIS Automation System of Bali',
            applicationCategory: 'Geographic Information System, Meteorology Application',
            operatingSystem: 'Web Browser',
            description:
              'Automated biometeorological thermal comfort forecasting pipeline (PET) & WebGIS for 49 Bali tourism destinations across 45 villages with 99.4% uptime and 2 official registered copyrights (No. 001408188 & 001408179).',
            url: 'https://pet-bali.web.id',
            author: { '@id': `${BASE_URL}/#person` },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'JEJAK — Integrated Calibration Information System for BBMKG Region I Medan',
            applicationCategory: 'Operations Management System, Calibration Portal',
            operatingSystem: 'Web Browser',
            description:
              'Integrated MKG instrument calibration operations system digitizing 10 workflow phases across 7 user roles for Balai Besar MKG Region I Medan (Copyright No. 001451402).',
            url: 'https://jejak-bbmkg1.web.id',
            author: { '@id': `${BASE_URL}/#person` },
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'ScholarlyArticle',
            headline:
              'Radiosonde System Using ESP32 and LoRa Ra-02 with Surface Pressure-Based Altitude Estimation Algorithm',
            name: 'Radiosonde System Using ESP32 and LoRa Ra-02 with Surface Pressure-Based Altitude Estimation Algorithm',
            sameAs: 'https://doi.org/10.1109/ICITCOM62788.2024.10762300',
            publication: {
              '@type': 'PublicationEvent',
              name: '2024 2nd International Conference on Information Technology and Computing (ICITCOM)',
            },
            author: { '@id': `${BASE_URL}/#person` },
            datePublished: '2024-09-01',
          },
        },
      ],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Karya Unggulan & Sistem Terapan Ahmad Meijlan Yasir',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Sistem Otomasi Diseminasi Kenyamanan Termal (PET) & WebGIS Pariwisata Bali',
          applicationCategory: 'Geographic Information System, Meteorology Application',
          operatingSystem: 'Web Browser',
          description:
            'Pipeline otomatis prakiraan kenyamanan termal biometeorologi berbasis PET & WebGIS untuk 49 destinasi wisata Bali dengan uptime 99.4% dan 2 Hak Cipta resmi DJKI RI (No. 001408188 & 001408179).',
          url: 'https://pet-bali.web.id',
          author: { '@id': `${BASE_URL}/#person` },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'SoftwareApplication',
          name: 'JEJAK — Sistem Informasi Kalibrasi Terpadu BBMKG Wilayah I Medan',
          applicationCategory: 'Operations Management System, Calibration Portal',
          operatingSystem: 'Web Browser',
          description:
            'Sistem operasional kalibrasi instrumen MKG terintegrasi yang mendigitalkan 10 tahapan alur kerja untuk 7 peran pengguna di Balai Besar MKG Wilayah I Medan (Hak Cipta No. 001451402).',
          url: 'https://jejak-bbmkg1.web.id',
          author: { '@id': `${BASE_URL}/#person` },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'ScholarlyArticle',
          headline:
            'Radiosonde System Using ESP32 and LoRa Ra-02 with Surface Pressure-Based Altitude Estimation Algorithm',
          name: 'Radiosonde System Using ESP32 and LoRa Ra-02 with Surface Pressure-Based Altitude Estimation Algorithm',
          sameAs: 'https://doi.org/10.1109/ICITCOM62788.2024.10762300',
          publication: {
            '@type': 'PublicationEvent',
            name: '2024 2nd International Conference on Information Technology and Computing (ICITCOM)',
          },
          author: { '@id': `${BASE_URL}/#person` },
          datePublished: '2024-09-01',
        },
      },
    ],
  };
}

/**
 * Blog Index CollectionPage Schema
 */
export function getBlogCollectionSchema(blogs: Array<{ id: number; title: string; excerpt?: string; date: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Catatan & Gagasan — Ahmad Meijlan Yasir',
    description:
      'Kumpulan artikel, catatan teknis, analisis kecerdasan buatan, IoT, dan gagasan rekayasa sistem oleh Ahmad Meijlan Yasir.',
    url: `${BASE_URL}/blog`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#person` },
    hasPart: (blogs || []).map((blog) => ({
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.excerpt,
      url: `${BASE_URL}/blog/${blog.id}`,
      datePublished: blog.date,
      author: { '@id': `${BASE_URL}/#person` },
    })),
  };
}

/**
 * Standard BreadcrumbList Schema Generator
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
