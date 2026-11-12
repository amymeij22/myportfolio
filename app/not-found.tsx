import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase">
            Error 404
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tautan yang Anda tuju salah.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/">
            <Button className="w-full sm:w-auto flex items-center gap-2">
              <HomeIcon className="w-4 h-4" />
              Kembali ke Beranda
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
              <ArrowLeftIcon className="w-4 h-4" />
              Lihat Artikel Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

