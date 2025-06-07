// Data pusat untuk semua blog

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content?: string;
}

// Data blog dengan konten lengkap
export const allBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Pengembangan Sistem Pemantauan Cuaca Berbasis IoT",
    author: "Ahmad Meijlan Yasir",
    category: "IoT",
    date: "12 Juni 2023",
    excerpt: "Sistem pemantauan cuaca berbasis Internet of Things (IoT) menjadi semakin penting di era informasi digital saat ini. Dengan menggabungkan sensor cuaca dan konektivitas internet, sistem ini memungkinkan pengumpulan data cuaca secara real-time dan analisis yang lebih akurat...",
    image: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/blog-1-CZKaYm0XhblkEVzHgAW7YGDWahNtmv.jpg",
    content: `
      <h2>Pendahuluan</h2>
      <p>Sistem pemantauan cuaca berbasis Internet of Things (IoT) menjadi semakin penting di era informasi digital saat ini. Dengan menggabungkan sensor cuaca dan konektivitas internet, sistem ini memungkinkan pengumpulan data cuaca secara real-time dan analisis yang lebih akurat untuk berbagai aplikasi seperti pertanian presisi, peringatan dini bencana, dan penelitian iklim.</p>
      
      <h2>Komponen Sistem Pemantauan Cuaca IoT</h2>
      <p>Sebuah sistem pemantauan cuaca IoT yang komprehensif terdiri dari beberapa komponen utama:</p>
      <ul>
        <li><strong>Sensor dan Perangkat Keras</strong>: Termasuk sensor suhu, kelembaban, tekanan barometrik, kecepatan angin, arah angin, curah hujan, dan radiasi matahari.</li>
        <li><strong>Mikrokontroler</strong>: Seperti Arduino, ESP32, atau Raspberry Pi, yang mengumpulkan data dari sensor dan mengirimkannya ke cloud.</li>
        <li><strong>Konektivitas</strong>: Teknologi seperti WiFi, LoRaWAN, atau GSM/GPRS untuk mentransmisikan data.</li>
        <li><strong>Platform Cloud</strong>: Untuk menyimpan, memproses, dan menganalisis data cuaca.</li>
        <li><strong>Aplikasi Pengguna</strong>: Antarmuka web atau mobile yang menampilkan data cuaca dalam format yang mudah dipahami.</li>
      </ul>
      
      <h2>Keuntungan Implementasi IoT dalam Pemantauan Cuaca</h2>
      <p>Penerapan teknologi IoT dalam pemantauan cuaca menawarkan berbagai keuntungan:</p>
      <ul>
        <li><strong>Pemantauan Real-time</strong>: Data cuaca dapat diakses kapan saja dan dari mana saja.</li>
        <li><strong>Cakupan Luas</strong>: Jaringan sensor dapat diperluas untuk mencakup area geografis yang lebih luas.</li>
        <li><strong>Analisis Prediktif</strong>: Integrasi dengan algoritma AI untuk prediksi cuaca yang lebih akurat.</li>
        <li><strong>Efisiensi Biaya</strong>: Pengurangan kebutuhan untuk inspeksi manual dan pemeliharaan.</li>
        <li><strong>Peringatan Dini</strong>: Deteksi cepat kondisi cuaca ekstrem untuk sistem peringatan bencana.</li>
      </ul>
      
      <h2>Tantangan dan Solusi</h2>
      <p>Meskipun menawarkan banyak keuntungan, pengembangan sistem pemantauan cuaca IoT juga menghadapi beberapa tantangan:</p>
      <ul>
        <li><strong>Konsumsi Daya</strong>: Solusi termasuk penggunaan panel surya atau turbin angin kecil untuk perangkat di lokasi terpencil.</li>
        <li><strong>Ketahanan Perangkat</strong>: Desain enclosure tahan cuaca dan material anti-korosi untuk perlindungan sensor.</li>
        <li><strong>Keandalan Koneksi</strong>: Implementasi protokol yang tangguh dan sistem penyimpanan data lokal saat koneksi terputus.</li>
        <li><strong>Keamanan Data</strong>: Penerapan enkripsi dan otentikasi untuk melindungi data dari akses tidak sah.</li>
      </ul>
      
      <h2>Studi Kasus: Implementasi di STMKG</h2>
      <p>Di Sekolah Tinggi Meteorologi Klimatologi dan Geofisika (STMKG), kami telah mengembangkan sistem pemantauan cuaca IoT yang terintegrasi dengan jaringan stasiun cuaca yang ada. Sistem ini menggunakan ESP32 sebagai mikrokontroler utama, sensor BME280 untuk pengukuran suhu, kelembaban, dan tekanan, serta modul komunikasi LoRaWAN untuk transmisi data jarak jauh.</p>
      
      <p>Data dari jaringan sensor ini disimpan dan dianalisis menggunakan platform cloud yang dikembangkan khusus, dengan antarmuka pengguna web yang memungkinkan visualisasi data dalam bentuk grafik dan peta. Sistem ini telah berhasil digunakan untuk mendukung penelitian mahasiswa dan memberikan data cuaca real-time untuk komunitas kampus.</p>
      
      <h2>Kesimpulan</h2>
      <p>Pengembangan sistem pemantauan cuaca berbasis IoT membuka peluang baru dalam pengumpulan dan analisis data meteorologi. Dengan kemajuan teknologi sensor, konektivitas, dan analitik data, sistem ini akan terus berkembang dan memberikan informasi cuaca yang lebih akurat, tepat waktu, dan bermanfaat untuk berbagai aplikasi.</p>
      
      <p>Ke depan, integrasi teknologi seperti machine learning dan AI akan semakin meningkatkan kemampuan prediktif sistem ini, menjadikannya alat yang semakin penting dalam memahami dan merespons perubahan pola cuaca dan iklim.</p>
    `
  },
  {
    id: 2,
    title: "Implementasi Machine Learning dalam Prediksi Cuaca",
    author: "Ahmad Meijlan Yasir",
    category: "AI & ML",
    date: "23 Juli 2023",
    excerpt: "Kemajuan dalam machine learning telah membuka peluang baru dalam memprediksi pola cuaca dengan akurasi yang lebih tinggi. Artikel ini membahas bagaimana algoritma machine learning seperti Random Forest dan LSTM dapat digunakan untuk menganalisis data cuaca historis...",
    image: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/blog-2-8jnHFXz9lDi4fhYcXJr5DuBxcQRQHk.jpg",
    content: `
      <h2>Pendahuluan</h2>
      <p>Kemajuan dalam machine learning telah membuka peluang baru dalam memprediksi pola cuaca dengan akurasi yang lebih tinggi. Penggunaan algoritma seperti Random Forest, Support Vector Machines (SVM), dan jaringan saraf LSTM (Long Short-Term Memory) memungkinkan analisis data cuaca historis yang lebih komprehensif untuk menghasilkan prediksi yang lebih akurat.</p>
      
      <h2>Persiapan Data Cuaca</h2>
      <p>Langkah pertama dalam implementasi machine learning untuk prediksi cuaca adalah persiapan data yang tepat. Data cuaca biasanya mencakup parameter seperti suhu, kelembaban, tekanan udara, kecepatan angin, dan curah hujan. Data ini perlu distandarisasi, dibersihkan dari nilai-nilai yang hilang atau anomali, dan diatur dalam format deret waktu yang sesuai untuk analisis.</p>
      
      <h2>Algoritma Machine Learning untuk Prediksi Cuaca</h2>
      <p>Beberapa algoritma machine learning yang efektif untuk prediksi cuaca meliputi:</p>
      <ul>
        <li><strong>Random Forest</strong>: Algoritma ensemble yang menggabungkan banyak pohon keputusan untuk menghasilkan prediksi yang lebih stabil dan akurat.</li>
        <li><strong>Neural Networks</strong>: Terutama arsitektur LSTM yang dirancang khusus untuk menangani data deret waktu dengan kemampuan untuk "mengingat" pola jangka panjang.</li>
        <li><strong>Gradient Boosting</strong>: Algoritma seperti XGBoost yang secara berurutan memperbaiki model prediksi dengan berfokus pada kesalahan prediksi sebelumnya.</li>
      </ul>
      
      <h2>Implementasi dengan Python</h2>
      <p>Berikut adalah contoh implementasi sederhana menggunakan LSTM untuk prediksi suhu:</p>
      <pre>
      import numpy as np
      import pandas as pd
      from tensorflow.keras.models import Sequential
      from tensorflow.keras.layers import LSTM, Dense
      
      # Persiapan data (contoh)
      data = pd.read_csv('weather_data.csv')
      temp_data = data['temperature'].values.reshape(-1, 1)
      
      # Normalisasi data
      from sklearn.preprocessing import MinMaxScaler
      scaler = MinMaxScaler(feature_range=(0, 1))
      scaled_data = scaler.fit_transform(temp_data)
      
      # Buat dataset deret waktu
      def create_dataset(data, time_step=1):
          X, Y = [], []
          for i in range(len(data)-time_step-1):
              X.append(data[i:(i+time_step), 0])
              Y.append(data[i+time_step, 0])
          return np.array(X), np.array(Y)
      
      time_step = 24  # Menggunakan data 24 jam sebelumnya untuk prediksi
      X, y = create_dataset(scaled_data, time_step)
      X = X.reshape(X.shape[0], X.shape[1], 1)
      
      # Bangun model LSTM
      model = Sequential()
      model.add(LSTM(50, return_sequences=True, input_shape=(time_step, 1)))
      model.add(LSTM(50, return_sequences=False))
      model.add(Dense(1))
      model.compile(optimizer='adam', loss='mean_squared_error')
      
      # Latih model
      model.fit(X, y, batch_size=32, epochs=100)
      
      # Prediksi
      test_input = scaled_data[-time_step:].reshape(1, time_step, 1)
      predicted = model.predict(test_input)
      predicted = scaler.inverse_transform(predicted)
      print(f"Predicted temperature: {predicted[0][0]:.2f}°C")
      </pre>
      
      <h2>Evaluasi Model dan Peningkatan Akurasi</h2>
      <p>Akurasi model prediksi cuaca dapat ditingkatkan melalui beberapa pendekatan:</p>
      <ul>
        <li><strong>Feature Engineering</strong>: Menciptakan fitur baru yang menangkap pola musiman atau siklus cuaca.</li>
        <li><strong>Ensemble Methods</strong>: Menggabungkan prediksi dari beberapa model untuk hasil yang lebih robust.</li>
        <li><strong>Hyperparameter Tuning</strong>: Mengoptimalkan parameter model menggunakan teknik seperti grid search atau optimisasi Bayesian.</li>
        <li><strong>Data Augmentation</strong>: Memperkaya dataset dengan variasi data sintetis untuk meningkatkan generalisasi model.</li>
      </ul>
      
      <h2>Kesimpulan</h2>
      <p>Implementasi machine learning dalam prediksi cuaca menawarkan potensi besar untuk meningkatkan akurasi dan jangkauan prediksi. Dengan kombinasi algoritma yang tepat, persiapan data yang baik, dan evaluasi model yang cermat, kita dapat mengembangkan sistem prediksi cuaca yang lebih andal untuk berbagai aplikasi dari perencanaan pertanian hingga mitigasi bencana.</p>
    `
  },
  {
    id: 3,
    title: "Tantangan Pengembangan Aplikasi Web Modern",
    author: "Ahmad Meijlan Yasir",
    category: "Web Dev",
    date: "5 Agustus 2023",
    excerpt: "Dalam era digital yang terus berkembang, pengembangan aplikasi web modern menghadapi berbagai tantangan seperti performa, keamanan, dan pengalaman pengguna. Artikel ini mengeksplorasi teknologi terkini seperti React, Next.js, dan strategi untuk mengatasi tantangan tersebut...",
    image: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/blog-3-UKZM5MZkSPHxMOFAB6ZAQgY68bP9lU.jpg",
    content: `
      <h2>Pendahuluan</h2>
      <p>Pengembangan aplikasi web modern menghadapi berbagai tantangan yang kompleks, mulai dari performa dan keamanan hingga pengalaman pengguna yang optimal. Artikel ini akan mengeksplorasi tantangan utama yang dihadapi pengembang web saat ini dan strategi untuk mengatasinya menggunakan teknologi seperti React, Next.js, dan praktik terbaik dalam pengembangan web.</p>
      
      <h2>Tantangan Performa</h2>
      <p>Aplikasi web modern diharapkan memiliki waktu pemuatan yang cepat dan respons yang instan. Beberapa tantangan performa utama meliputi:</p>
      <ul>
        <li><strong>Ukuran Bundle</strong>: Kode JavaScript yang besar dapat memperlambat waktu pemuatan halaman.</li>
        <li><strong>Rendering</strong>: Metode rendering yang tidak efisien dapat menyebabkan pengalaman pengguna yang lambat.</li>
        <li><strong>Optimisasi Aset</strong>: Gambar dan media yang tidak dioptimalkan dapat memperlambat situs.</li>
      </ul>
      
      <p>Untuk mengatasi tantangan ini, beberapa strategi yang dapat diterapkan antara lain:</p>
      <ul>
        <li><strong>Code Splitting</strong>: Membagi kode menjadi chunk yang lebih kecil dan dimuat sesuai kebutuhan.</li>
        <li><strong>Server-Side Rendering (SSR)</strong>: Merender halaman di server untuk meningkatkan waktu pemuatan awal.</li>
        <li><strong>Static Site Generation (SSG)</strong>: Pra-rendering halaman statis untuk performa optimal.</li>
        <li><strong>Lazy Loading</strong>: Memuat komponen dan gambar hanya ketika diperlukan.</li>
      </ul>
      
      <h2>Keamanan Web</h2>
      <p>Keamanan tetap menjadi prioritas utama dalam pengembangan web. Beberapa tantangan keamanan meliputi:</p>
      <ul>
        <li><strong>Cross-Site Scripting (XSS)</strong>: Serangan yang menyuntikkan skrip berbahaya ke dalam situs.</li>
        <li><strong>Cross-Site Request Forgery (CSRF)</strong>: Memaksa pengguna yang terautentikasi untuk melakukan tindakan yang tidak diinginkan.</li>
        <li><strong>Injection Attacks</strong>: Serangan yang memanipulasi input untuk mengeksekusi kode berbahaya.</li>
        <li><strong>Data Exposure</strong>: Kebocoran data sensitif melalui API atau respons server.</li>
      </ul>
      
      <p>Strategi untuk meningkatkan keamanan aplikasi web meliputi:</p>
      <ul>
        <li><strong>Input Validation</strong>: Memvalidasi semua input pengguna di sisi klien dan server.</li>
        <li><strong>Content Security Policy (CSP)</strong>: Membatasi sumber daya yang dapat dimuat oleh halaman.</li>
        <li><strong>HTTPS</strong>: Mengenkripsi semua komunikasi antara klien dan server.</li>
        <li><strong>Authentication Best Practices</strong>: Implementasi otentikasi multi-faktor dan pengelolaan sesi yang aman.</li>
      </ul>
      
      <h2>Tantangan UX/UI</h2>
      <p>Pengalaman pengguna yang optimal menjadi kunci keberhasilan aplikasi web. Beberapa tantangan UX/UI meliputi:</p>
      <ul>
        <li><strong>Responsivitas</strong>: Memastikan aplikasi berfungsi dengan baik di berbagai perangkat dan ukuran layar.</li>
        <li><strong>Aksesibilitas</strong>: Membuat aplikasi dapat digunakan oleh semua orang, termasuk pengguna dengan disabilitas.</li>
        <li><strong>Konsistensi</strong>: Menjaga konsistensi desain di seluruh aplikasi.</li>
        <li><strong>Performa yang Dirasakan</strong>: Memastikan aplikasi terasa cepat bahkan ketika sedang melakukan operasi yang berat.</li>
      </ul>
      
      <h2>Teknologi Modern untuk Mengatasi Tantangan</h2>
      <p>Beberapa teknologi dan framework modern yang dapat membantu mengatasi tantangan pengembangan web:</p>
      <ul>
        <li><strong>React</strong>: Library JavaScript untuk membangun antarmuka pengguna dengan pendekatan berbasis komponen.</li>
        <li><strong>Next.js</strong>: Framework React yang menyediakan fitur seperti SSR, SSG, dan optimisasi gambar bawaan.</li>
        <li><strong>Tailwind CSS</strong>: Framework CSS utility-first untuk desain responsif dan konsisten.</li>
        <li><strong>TypeScript</strong>: Superset JavaScript yang menambahkan tipe statis untuk mencegah bug dan meningkatkan maintainability.</li>
      </ul>
      
      <h2>Kesimpulan</h2>
      <p>Pengembangan aplikasi web modern memang menghadapi berbagai tantangan, tetapi dengan pemahaman yang baik tentang tantangan tersebut dan penerapan teknologi serta praktik terbaik yang tepat, pengembang dapat menciptakan aplikasi web yang cepat, aman, dan memberikan pengalaman pengguna yang optimal.</p>
      
      <p>Kunci keberhasilan terletak pada pendekatan yang seimbang antara performa, keamanan, dan UX/UI, dengan memilih teknologi yang tepat sesuai dengan kebutuhan spesifik proyek dan terus mengikuti perkembangan terbaru dalam ekosistem pengembangan web.</p>
    `
  },
  {
    id: 4,
    title: "Optimalisasi Jaringan Sensor Nirkabel untuk Pemantauan Lingkungan",
    author: "Ahmad Meijlan Yasir",
    category: "IoT",
    date: "18 September 2023",
    excerpt: "Jaringan sensor nirkabel (WSN) menjadi komponen penting dalam sistem pemantauan lingkungan modern. Artikel ini membahas teknik optimalisasi untuk meningkatkan efisiensi energi, keandalan komunikasi, dan masa pakai sensor dalam penerapan WSN...",
    image: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/blog-4-RrVVjHU0LfDBDYQTp94dQWzKZRUyJp.jpg"
  },
  {
    id: 5,
    title: "Analisis Data Cuaca Menggunakan Python",
    author: "Ahmad Meijlan Yasir",
    category: "Data Science",
    date: "7 Oktober 2023",
    excerpt: "Python menjadi bahasa pemrograman pilihan untuk analisis data cuaca karena kemudahan penggunaan dan ekosistem pustaka yang kaya. Artikel ini menjelaskan langkah-langkah analisis data cuaca menggunakan pandas, matplotlib, dan pustaka lain yang relevan...",
    image: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/blog-5-mSAkIRsEJ3uJ1Lhy9ZsVg7NzX0HW5o.jpg"
  },
  {
    id: 6,
    title: "Penggunaan NextJS untuk Aplikasi Web Interaktif",
    author: "Ahmad Meijlan Yasir",
    category: "Web Dev",
    date: "15 November 2023",
    excerpt: "Next.js menawarkan pendekatan modern untuk pengembangan aplikasi web dengan fitur-fitur seperti rendering sisi server, routing otomatis, dan optimisasi gambar. Artikel ini mengeksplorasi cara menggunakan Next.js untuk membuat aplikasi web yang cepat dan interaktif...",
    image: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/blog-6-DXjxXXXeDztbmafZDSH4BgxrMxzpoi.jpg"
  },
  {
    id: 7,
    title: "Pentingnya Desain UI/UX dalam Aplikasi Meteorologi",
    author: "Ahmad Meijlan Yasir",
    category: "UI/UX",
    date: "3 Desember 2023",
    excerpt: "Desain antarmuka pengguna yang baik sangat penting dalam aplikasi meteorologi untuk memastikan informasi cuaca yang kompleks dapat diakses dan dipahami dengan mudah. Artikel ini membahas prinsip-prinsip desain UI/UX untuk aplikasi meteorologi...",
    image: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/blog-7-WDCpPZlYe6KdnQQqSUXfNEiOZwvXZ2.jpg"
  },
  {
    id: 8,
    title: "Pengembangan API untuk Layanan Informasi Cuaca",
    author: "Ahmad Meijlan Yasir",
    category: "API",
    date: "19 Januari 2024",
    excerpt: "API (Application Programming Interface) menjadi kunci dalam distribusi data cuaca untuk berbagai aplikasi dan layanan. Artikel ini membahas praktik terbaik dalam merancang, membangun, dan mengelola API untuk layanan informasi cuaca...",
    image: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/blog-8-X8nECRcWAMlKHEgjkTkL9o8y12FLJa.jpg"
  },
  {
    id: 9,
    title: "Keamanan Siber dalam Sistem Pemantauan Cuaca",
    author: "Ahmad Meijlan Yasir",
    category: "Cyber Security",
    date: "28 Februari 2024",
    excerpt: "Keamanan siber menjadi aspek kritis dalam sistem pemantauan cuaca modern yang terhubung ke internet. Artikel ini mengidentifikasi potensi kerentanan dan strategi untuk meningkatkan keamanan dalam sistem pemantauan cuaca...",
    image: "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/blog-9-dkGxzJ4rlQtVzzD2KHYRqnDZDLRnP5.jpg"
  }
];

// Helper untuk mendapatkan 3 blog terbaru
export const getLatestBlogs = (count: number = 3): BlogPost[] => {
  return [...allBlogs]
    .sort((a, b) => {
      // Sortir berdasarkan ID (asumsikan ID yang lebih besar adalah yang lebih baru)
      return b.id - a.id;
    })
    .slice(0, count);
};

// Helper untuk mendapatkan blog berdasarkan ID
export const getBlogById = (id: number): BlogPost | undefined => {
  return allBlogs.find(blog => blog.id === id);
};

// Helper untuk mendapatkan artikel terkait (berdasarkan kategori yang sama)
export const getRelatedBlogs = (currentBlogId: number, count: number = 3): BlogPost[] => {
  const currentBlog = getBlogById(currentBlogId);
  
  if (!currentBlog) return [];
  
  return [...allBlogs]
    .filter(blog => blog.id !== currentBlogId && blog.category === currentBlog.category)
    .sort((a, b) => b.id - a.id)
    .slice(0, count);
};

// Helper untuk mendapatkan blog sebelumnya dan selanjutnya berdasarkan ID
export const getNextAndPrevBlogs = (currentBlogId: number): { prev: BlogPost | null, next: BlogPost | null } => {
  // Mendapatkan semua blog yang diurutkan berdasarkan ID
  const sortedBlogs = [...allBlogs].sort((a, b) => a.id - b.id);
  
  const currentIndex = sortedBlogs.findIndex(blog => blog.id === currentBlogId);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  const prev = currentIndex > 0 ? sortedBlogs[currentIndex - 1] : null;
  const next = currentIndex < sortedBlogs.length - 1 ? sortedBlogs[currentIndex + 1] : null;
  
  return { prev, next };
};

// Helper untuk mendapatkan artikel terbaru kecuali artikel yang sedang dibaca
export const getLatestBlogsExcept = (currentBlogId: number, count: number = 5): BlogPost[] => {
  return [...allBlogs]
    .filter(blog => blog.id !== currentBlogId)
    .sort((a, b) => b.id - a.id)
    .slice(0, count);
};
