'use client';

import { ShieldAlert, ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full rounded-[28px] border border-border p-8 text-center space-y-6 shadow-card">
        <div className="mx-auto w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
          <ShieldAlert className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Akses Ditolak (403)</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Maaf, Anda tidak memiliki izin otorisasi yang cukup untuk mengakses halaman ini. Hubungi administrator HRIS jika Anda merasa ini adalah kesalahan.
          </p>
        </div>
        <div className="pt-4 border-t border-border flex justify-center">
          <Button onClick={() => router.push('/')} className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 flex items-center gap-2 font-semibold">
            <ChevronLeft className="h-4 w-4" /> Kembali ke Dasbor
          </Button>
        </div>
      </Card>
    </div>
  );
}
