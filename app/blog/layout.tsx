import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Ahmad Meijlan Yasir",
  description: "Kumpulan artikel dan tulisan terbaru dari Ahmad Meijlan Yasir tentang teknologi, IoT, machine learning, dan pengembangan web.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
    </main>
  )
} 