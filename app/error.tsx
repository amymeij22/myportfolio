'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon } from 'lucide-react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <span className="text-sm font-semibold tracking-wider text-destructive uppercase">
            Terjadi Kesalahan
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Sistem Mengalami Kendala
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Mohon maaf, halaman gagal dimuat dengan benar. Silakan coba muat ulang atau kembali ke halaman beranda.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button onClick={() => reset()} className="flex items-center gap-2">
            <RefreshCwIcon className="w-4 h-4" />
            Coba Lagi
          </Button>
          <Link href="/">
            <Button variant="outline">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

