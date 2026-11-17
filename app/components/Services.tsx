"use client"

import { motion } from "framer-motion"
import {
  RiPulseLine,
  RiServerLine,
  RiBrainLine,
  RiTerminalBoxLine,
  RiDatabase2Line,
  RiCheckDoubleLine
} from "react-icons/ri"
import { IoHardwareChipOutline } from "react-icons/io5"

export default function Skills() {
  const domains = [
    {
      id: "instrumentasi",
      title: "Instrumentasi & Pengukuran",
      icon: <RiPulseLine className="w-6 h-6 text-primary" />,
      tagline: "Akuisisi data sensor dan kalibrasi meteorologi",
      description: "Perancangan sistem akuisisi data sensor cuaca, kalibrasi instrumen operasional, perangkat telemetri IoT (ESP32 & LoRa), dan pemantauan real-time kondisi lingkungan.",
      evidence: "Jaringan sensor BME280 & LoRa STMKG, sistem kalibrasi BBMKG Wilayah I Medan.",
      keyTools: ["ESP32 & LoRa", "Sensor Cuaca", "Kalibrasi MKG", "Arduino / C++", "Hardware Interfacing"]
    },
    {
      id: "sistem-digital",
      title: "Sistem Digital & Otomasi",
      icon: <RiServerLine className="w-6 h-6 text-primary" />,
      tagline: "Arsitektur web end-to-end dan pipeline otomasi",
      description: "Pengembangan sistem web modern berbasis Next.js, TypeScript, PostgreSQL, arsitektur workflow multi-peran, dan pipeline otomasi data cloud terjadwal.",
      evidence: "JEJAK (sistem 10 tahap kalibrasi, 7 peran), Inventro (manajemen lab STMKG).",
      keyTools: ["Next.js 16", "TypeScript", "PostgreSQL", "Supabase", "GitHub Actions / Cron"]
    },
    {
      id: "data-riset",
      title: "Data & Riset",
      icon: <RiBrainLine className="w-6 h-6 text-primary" />,
      tagline: "Pemodelan prediktif dan visualisasi geospasial",
      description: "Pemodelan machine learning / deep learning, komputasi biometeorologi kenyamanan termal (PET), dan visualisasi data geospasial interaktif melalui WebGIS.",
      evidence: "WebGIS Prakiraan PET 49 Destinasi Bali, model prediksi konsentrasi PM2.5 (TELKOMNIKA).",
      keyTools: ["Python", "TensorFlow", "Biometeorology (PET)", "WebGIS / GIS", "Applied ML/DL"]
    }
  ]

  const toolCategories = [
    {
      name: "Instrumentasi & Hardware",
      icon: <IoHardwareChipOutline className="w-4 h-4 text-primary" />,
      tools: ["ESP32", "LoRa Ra-02", "Sensor Meteorologi", "Kalibrasi Suhu/Tekanan/Kelembapan", "Linux OS", "Docker"]
    },
    {
      name: "Perangkat Lunak & Basis Data",
      icon: <RiTerminalBoxLine className="w-4 h-4 text-primary" />,
      tools: ["TypeScript", "Next.js", "React", "Tailwind CSS", "PostgreSQL", "Supabase", "Git & GitHub"]
    },
    {
      name: "Data & Sains",
      icon: <RiDatabase2Line className="w-4 h-4 text-primary" />,
      tools: ["Python", "TensorFlow", "Scikit-learn", "Biometeo (PET)", "WebGIS Spasial", "REST API & SSE"]
    }
  ]

  return (
    <section id="fokus" className="relative py-20 sm:py-28 bg-background border-b border-border/50">
      <div id="skills" className="sr-only" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border text-xs font-mono font-medium text-foreground mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>FOKUS & KAPABILITAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Tiga Domain Sistem Terapan
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Menghubungkan pengukuran fisik di lapangan dengan arsitektur perangkat lunak modern dan riset analitik untuk menghasilkan solusi yang teruji.
          </p>
        </div>

        {/* 3 Connected Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative flex flex-col justify-between rounded-2xl bg-card border border-border p-7 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
            >
              <div>
                {/* Domain Icon & Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-border/60 transition-colors group-hover:bg-secondary/70">
                    {domain.icon}
                  </div>
                  <span className="text-xs font-mono font-medium text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {domain.title}
                </h3>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                  {domain.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  {domain.description}
                </p>
              </div>

              <div>
                {/* Evidence Callout */}
                <div className="pt-4 border-t border-border/60 mb-5">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <RiCheckDoubleLine className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span><strong className="text-foreground font-medium">Bukti terapan:</strong> {domain.evidence}</span>
                  </div>
                </div>

                {/* Key Tool Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {domain.keyTools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md bg-secondary/80 border border-border/70 text-[11px] font-mono text-foreground font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Practical Toolsets Overview */}
        <div className="rounded-2xl bg-secondary/40 border border-border p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Alat & Instrumen Praktis</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Teknologi yang digunakan secara nyata dalam perancangan sistem dan riset.
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Teruji dalam Implementasi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolCategories.map((cat) => (
              <div key={cat.name} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-foreground uppercase tracking-wide">
                  {cat.icon}
                  <span>{cat.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-background border border-border text-xs text-foreground font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
