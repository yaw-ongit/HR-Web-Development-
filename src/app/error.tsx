'use client';

import { AlertTriangle, ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full rounded-[28px] border border-border p-8 text-center space-y-6 shadow-card">
        <div className="mx-auto w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Kesalahan Sistem (500)</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Terjadi kesalahan teknis pada server portal HRIS. Silakan klik tombol di bawah untuk memuat ulang halaman atau kembali ke dasbor.
          </p>
        </div>
        <div className="pt-4 border-t border-border flex justify-center gap-2">
          <Button onClick={() => reset()} variant="outline" className="rounded-xl">
            Muat Ulang
          </Button>
          <Button onClick={() => router.push('/')} className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 flex items-center gap-2 font-semibold">
            <ChevronLeft className="h-4 w-4" /> Kembali ke Dasbor
          </Button>
        </div>
      </Card>
    </div>
  );
}
