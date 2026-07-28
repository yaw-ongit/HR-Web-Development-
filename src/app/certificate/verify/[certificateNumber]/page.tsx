'use client';

import { useParams, useRouter } from 'next/navigation';
import { ShieldCheck, Calendar, Award, User, ChevronLeft, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';

export default function CertificateVerificationPage() {
  const params = useParams();
  const router = useRouter();
  const certNumber = params?.certificateNumber as string || 'Unknown';

  // Mock verify logic based on certificate number pattern
  const isValid = certNumber.startsWith('CERT-');

  // Simulated certificate details
  const certDetails = {
    number: certNumber,
    employeeName: 'Leo Wibowo',
    employeeId: 'EMP-1006',
    trainingTitle: 'Pelatihan Keselamatan Kerja K3',
    issueDate: '2026-08-02',
    validUntil: '2029-08-02',
    issuer: 'PT Indocater HRD Department',
    status: 'Valid'
  };

  return (
    <div className="min-h-screen bg-secondary/10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Indocater Brand */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider mb-2">
            PT INDOCATER
          </div>
          <h2 className="text-xl font-bold text-foreground">Sistem Verifikasi Sertifikat</h2>
          <p className="text-xs text-muted-foreground mt-1">Verifikasi otentisitas dokumen sertifikat digital karyawan.</p>
        </div>

        <Card className="rounded-[28px] border border-border bg-card p-6 shadow-lg text-center space-y-6">
          {isValid ? (
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-600">Sertifikat Terverifikasi</h3>
                <p className="text-xs text-muted-foreground mt-1 font-mono">No. {certNumber}</p>
              </div>

              <div className="border-t border-b border-border py-4 my-2 text-left text-sm space-y-3">
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-0.5 text-muted" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Nama Pemilik</span>
                    <strong className="text-foreground">{certDetails.employeeName}</strong>
                    <span className="text-xs text-muted-foreground block font-mono">{certDetails.employeeId}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="h-4 w-4 mt-0.5 text-muted" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Program Pelatihan</span>
                    <strong className="text-foreground">{certDetails.trainingTitle}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Tanggal Terbit & Masa Berlaku</span>
                    <span className="text-foreground font-semibold">{certDetails.issueDate}</span> s/d <span className="text-foreground font-semibold">{certDetails.validUntil}</span>
                    <span className="mt-1 block text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full w-max font-bold">
                      Status: {certDetails.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground italic leading-relaxed">
                Dokumen ini sah dikeluarkan secara sistemik oleh PT Indocater HRD Department dan tercatat secara digital dalam database kepegawaian.
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                <XCircle className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-rose-600">Sertifikat Tidak Valid</h3>
                <p className="text-xs text-muted-foreground mt-1 font-mono">No. {certNumber}</p>
                <p className="text-sm mt-3 px-4 text-muted-foreground leading-relaxed">
                  Format nomor sertifikat tidak dikenali atau tidak terdaftar dalam database PT Indocater. Mohon hubungi HRD Department untuk konfirmasi manual.
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-border flex justify-center">
            <Button onClick={() => router.push('/')} variant="outline" className="rounded-xl flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" /> Kembali ke Portal
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
