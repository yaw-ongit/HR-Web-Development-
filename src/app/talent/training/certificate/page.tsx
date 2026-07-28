'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, RefreshCw, Award, CheckSquare, Square, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';
import { jsPDF } from 'jspdf';
import { zipSync } from 'fflate';

export default function TrainingCertificatePage() {
  const [plannings, setPlannings] = useState<any[]>([]);
  const [realizations, setRealizations] = useState<any[]>([]);
  const [selectedRealizationId, setSelectedRealizationId] = useState('');
  const [participants, setParticipants] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [selectedPartIds, setSelectedPartIds] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadData = async () => {
    const plansRes = await TalentService.getPlannings();
    if (plansRes && plansRes.data) setPlannings(plansRes.data);

    const realsRes = await TalentService.getRealizations();
    if (realsRes && realsRes.data) {
      setRealizations(realsRes.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Fetch participants and certificate status for selected realization
  useEffect(() => {
    if (selectedRealizationId) {
      // Load participants
      TalentService.getParticipants(selectedRealizationId).then((res: any) => {
        if (res && res.data) {
          setParticipants(res.data);

          // Check if there are pre-selected IDs from report page in localStorage
          const stored = localStorage.getItem('selected_report_participants');
          if (stored) {
            try {
              const ids = JSON.parse(stored);
              // Filter to only those matching current realization participants
              const matchingIds = res.data.filter((p: any) => ids.includes(p.id)).map((p: any) => p.id);
              if (matchingIds.length > 0) {
                setSelectedPartIds(matchingIds);
              }
              // Clear localStorage after reading to prevent sticky state
              localStorage.removeItem('selected_report_participants');
            } catch (err) {
              console.error('Error reading localStorage:', err);
            }
          } else {
            setSelectedPartIds([]);
          }
        }
      });
      // Load generated certificates info
      TalentService.getCertificatesByRealization(selectedRealizationId).then((res: any) => {
        if (res && res.data) setCertificates(res.data);
      });
    } else {
      setParticipants([]);
      setCertificates([]);
      setSelectedPartIds([]);
    }
  }, [selectedRealizationId]);

  const matchedPlanning = useMemo(() => {
    if (!selectedRealizationId) return null;
    const real = realizations.find(r => r.id === selectedRealizationId);
    if (!real) return null;
    return plannings.find(p => p.id === real.planning_id) || null;
  }, [selectedRealizationId, realizations, plannings]);

  const selectedRealizationDetail = useMemo(() => {
    if (!selectedRealizationId) return null;
    const real = realizations.find(r => r.id === selectedRealizationId);
    if (!real) return null;
    const plan = plannings.find(p => p.id === real.planning_id);
    return {
      ...real,
      planningTitle: plan ? plan.title : '',
      planningUnit: plan ? plan.unit : '',
      planningPeriod: plan ? plan.period : '',
      planningTrainer: plan ? plan.trainer : '',
      planningProvider: plan ? plan.provider : '',
      planningDate: plan ? plan.start_date : '',
      planningLocation: plan ? plan.location : '',
      planningType: plan ? plan.training_type : ''
    };
  }, [selectedRealizationId, realizations, plannings]);

  const handleToggleSelectOne = (id: string) => {
    setSelectedPartIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedPartIds.length === participants.length) {
      setSelectedPartIds([]);
    } else {
      setSelectedPartIds(participants.map(p => p.id));
    }
  };

  const generatePDFBytes = (participant: any) => {
    if (!selectedRealizationDetail) return null;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const w = 297;
    const h = 210;

    // Drawing highly stylized official certificate layout
    // Navy Border
    doc.setDrawColor(10, 37, 64);
    doc.setLineWidth(3);
    doc.rect(8, 8, w - 16, h - 16);

    // Gold Border
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.8);
    doc.rect(10, 10, w - 20, h - 20);

    // Corner Accents
    doc.setDrawColor(10, 37, 64);
    doc.setLineWidth(2.5);
    doc.line(8, 8, 38, 8);
    doc.line(8, 8, 8, 38);
    doc.setDrawColor(163, 0, 0);
    doc.setLineWidth(0.8);
    doc.line(12, 12, 32, 12);
    doc.line(12, 12, 12, 32);

    doc.setDrawColor(10, 37, 64);
    doc.setLineWidth(2.5);
    doc.line(w - 8, 8, w - 38, 8);
    doc.line(w - 8, 8, w - 8, 38);
    doc.setDrawColor(163, 0, 0);
    doc.setLineWidth(0.8);
    doc.line(w - 12, 12, w - 32, 12);
    doc.line(w - 12, 12, w - 12, 32);

    doc.setDrawColor(10, 37, 64);
    doc.setLineWidth(2.5);
    doc.line(8, h - 8, 38, h - 8);
    doc.line(8, h - 8, 8, h - 38);
    doc.setDrawColor(163, 0, 0);
    doc.setLineWidth(0.8);
    doc.line(12, h - 12, 32, h - 12);
    doc.line(12, h - 12, 12, h - 32);

    doc.setDrawColor(10, 37, 64);
    doc.setLineWidth(2.5);
    doc.line(w - 8, h - 8, w - 38, h - 8);
    doc.line(w - 8, h - 8, w - 8, h - 38);
    doc.setDrawColor(163, 0, 0);
    doc.setLineWidth(0.8);
    doc.line(w - 12, h - 12, w - 32, h - 12);
    doc.line(w - 12, h - 12, w - 12, h - 32);

    // Logo Block in Header
    const logoX = (w - 70) / 2;
    const logoY = 18;
    doc.setFillColor(10, 37, 64);
    doc.roundedRect(logoX, logoY, 70, 18, 1, 1, 'F');
    doc.setFillColor(163, 0, 0);
    doc.triangle(logoX + 4, logoY + 14, logoX + 9, logoY + 4, logoX + 14, logoY + 14, 'F');
    doc.setFillColor(255, 215, 0);
    doc.triangle(logoX + 6, logoY + 13, logoX + 9, logoY + 7, logoX + 12, logoY + 13, 'F');
    doc.setFillColor(10, 37, 64);
    doc.circle(logoX + 9, logoY + 11, 1.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("PT INDOCATER", logoX + 18, logoY + 8);
    doc.setTextColor(255, 215, 0);
    doc.setFontSize(5);
    doc.text("ENTERPRISE HR SERVICES", logoX + 18, logoY + 13);

    // Header texts
    doc.setTextColor(10, 37, 64);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("PT INDOCATER", w / 2, 42, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(32);
    doc.text("CERTIFICATE", w / 2, 54, { align: 'center' });

    doc.setTextColor(163, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("OF TRAINING COMPLETION", w / 2, 60, { align: 'center' });

    // Presentation text
    doc.setTextColor(100, 100, 100);
    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.text("This certificate is proudly presented to:", w / 2, 72, { align: 'center' });

    // Recipient Name
    doc.setTextColor(10, 37, 64);
    doc.setFont('times', 'bold');
    doc.setFontSize(26);
    doc.text(participant.employee_name, w / 2, 85, { align: 'center' });

    // Gold line under name
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.8);
    doc.line(w / 2 - 60, 88, w / 2 + 60, 88);

    // Recipient Details
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(`Company: ${participant.company} | Position: ${participant.position || '-'}`, w / 2, 93, { align: 'center' });

    // Completion text
    doc.setFontSize(10.5);
    doc.text("for successfully completing the training program:", w / 2, 104, { align: 'center' });

    // Training Title
    doc.setTextColor(163, 0, 0);
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.text(selectedRealizationDetail.planningTitle, w / 2, 114, { align: 'center' });

    // Metadata box (gray bg)
    const boxX = w / 2 - 90;
    const boxY = 122;
    const boxW = 180;
    const boxH = 10;
    doc.setFillColor(248, 249, 250);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.roundedRect(boxX, boxY, boxW, boxH, 1, 1, 'FD');

    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    const colW = boxW / 4;
    doc.text(`Unit: ${selectedRealizationDetail.planningUnit}`, boxX + 6, boxY + 6.5);
    doc.text(`Date: ${selectedRealizationDetail.planningDate}`, boxX + colW + 6, boxY + 6.5);
    doc.text(`Provider: ${selectedRealizationDetail.planningProvider}`, boxX + (colW * 2) + 6, boxY + 6.5);
    doc.text(`Trainer: ${selectedRealizationDetail.planningTrainer}`, boxX + (colW * 3) + 6, boxY + 6.5);

    // Footer left (Details)
    const certNum = `CERT-INDC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(7.5);
    doc.text(`Certificate Number: ${certNum}`, 22, 158);
    doc.text(`Issued Date: ${new Date().toISOString().split('T')[0]}`, 22, 163);
    doc.text(`Unit: ${selectedRealizationDetail.planningUnit}`, 22, 168);

    // Footer center (Official Seal Stamp)
    const stampX = w / 2;
    const stampY = 162;
    doc.setDrawColor(163, 0, 0);
    doc.setLineWidth(0.8);
    doc.circle(stampX, stampY, 14, 'D');
    doc.setLineWidth(0.2);
    doc.circle(stampX, stampY, 12, 'D');
    doc.setTextColor(163, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5);
    doc.text("PT INDOCATER", stampX, stampY - 5, { align: 'center' });
    doc.setFontSize(6.5);
    doc.text("HR DEPT", stampX, stampY + 1.5, { align: 'center' });
    doc.setFontSize(5);
    doc.text("OFFICIAL SEAL", stampX, stampY + 6, { align: 'center' });

    // Footer right (Signatures)
    const sigX = w - 68;
    const sigY = 145;
    doc.setDrawColor(26, 54, 93);
    doc.setLineWidth(0.8);
    doc.line(sigX + 10, sigY + 8, sigX + 16, sigY + 2);
    doc.line(sigX + 16, sigY + 2, sigX + 22, sigY + 10);
    doc.line(sigX + 22, sigY + 10, sigX + 30, sigY + 4);
    doc.line(sigX + 30, sigY + 4, sigX + 38, sigY + 8);
    doc.setDrawColor(163, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(sigX, sigY + 12, sigX + 46, sigY + 12);
    doc.setTextColor(10, 37, 64);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text("Training Manager", sigX + 23, sigY + 16, { align: 'center' });
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(7);
    doc.text("HUMAN RESOURCE DEPARTMENT", sigX + 23, sigY + 20, { align: 'center' });

    return {
      pdfBytes: doc.output('arraybuffer'),
      certNum
    };
  };

  const handleGenerateZip = async () => {
    if (selectedPartIds.length === 0 || !selectedRealizationDetail) {
      alert('Pilih minimal satu peserta untuk membuat sertifikat.');
      return;
    }

    setIsGenerating(true);
    try {
      const zipFiles: Record<string, Uint8Array> = {};

      for (const partId of selectedPartIds) {
        const part = participants.find(p => p.id === partId);
        if (!part) continue;

        // Generate PDF bytes
        const genResult = generatePDFBytes(part);
        if (!genResult) continue;

        const { pdfBytes, certNum } = genResult;
        const nameCleaned = part.employee_name.replace(/\s+/g, '_');
        zipFiles[`${nameCleaned}_sertifikat.pdf`] = new Uint8Array(pdfBytes);

        // Save certificate entry to database/mock database
        await TalentService.generateCertificate({
          realization_id: selectedRealizationId,
          participant_id: part.id,
          certificate_number: certNum,
          issued_date: new Date().toISOString().split('T')[0],
          document_url: `Generated PDF: ${certNum}`
        });
      }

      // Zip files using fflate
      const zipData = zipSync(zipFiles);
      const blob = new Blob([zipData], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `certificates-${selectedRealizationDetail.planningTitle.replace(/\s+/g, '_')}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(`Penerbitan masal selesai! ${selectedPartIds.length} sertifikat telah dikompresi ke dalam ZIP.`);
      
      // Reload page state
      loadData();
      // Refresh certificates
      TalentService.getCertificatesByRealization(selectedRealizationId).then((res: any) => {
        if (res && res.data) setCertificates(res.data);
      });
      setSelectedPartIds([]);
    } catch (err) {
      console.error(err);
      alert('Gagal membuat ZIP sertifikat.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SectionContainer>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: Choose completed realization */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="rounded-[28px] border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 font-semibold text-foreground">Pilih Realisasi Pelatihan</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Pilih Pelaksanaan (Realization)</label>
                <select
                  value={selectedRealizationId}
                  onChange={(e) => setSelectedRealizationId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                >
                  <option value="">-- Pilih Realisasi --</option>
                  {realizations.map(r => {
                    const plan = plannings.find(p => p.id === r.planning_id);
                    return (
                      <option key={r.id} value={r.id}>
                        {plan ? plan.title : 'Judul Tidak Ditemukan'} [{r.status}]
                      </option>
                    );
                  })}
                </select>
              </div>

              {selectedRealizationDetail && (
                <div className="border-t border-border pt-4 mt-4 space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Judul Pelatihan</label>
                    <div className="text-sm font-semibold text-foreground mt-1">{selectedRealizationDetail.planningTitle}</div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Unit Kerja</label>
                    <div className="text-sm font-semibold text-foreground mt-1">{selectedRealizationDetail.planningUnit}</div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Trainer & Provider</label>
                    <div className="text-sm font-semibold text-foreground mt-1">{selectedRealizationDetail.planningTrainer} ({selectedRealizationDetail.planningProvider})</div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Tanggal Pelaksanaan</label>
                    <div className="text-sm font-semibold text-foreground mt-1">{selectedRealizationDetail.planningDate}</div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right column: Participant selector and Generate ZIP */}
        <div className="lg:col-span-2">
          {selectedRealizationId ? (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Pembuatan Sertifikat Masal</h3>
                  <p className="text-xs text-muted-foreground mt-1">Pilih peserta untuk menghasilkan PDF sertifikat dan unduh sebagai file ZIP.</p>
                </div>
                <div>
                  <Button
                    onClick={handleGenerateZip}
                    disabled={selectedPartIds.length === 0 || isGenerating}
                    className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold flex items-center gap-2"
                  >
                    <Award className="h-4 w-4" /> 
                    {isGenerating ? 'Membuat ZIP...' : `Generate ZIP (${selectedPartIds.length})`}
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
                <button 
                  onClick={handleToggleSelectAll}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  {selectedPartIds.length === participants.length && participants.length > 0 ? (
                    <CheckSquare className="h-4 w-4" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  Pilih Semua ({participants.length} Peserta)
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4 w-12">Pilih</th>
                      <th className="px-6 py-4">Nama Lengkap</th>
                      <th className="px-6 py-4">Perusahaan</th>
                      <th className="px-6 py-4">Jabatan</th>
                      <th className="px-6 py-4">Status Sertifikat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {participants.map((part) => {
                      const isSelected = selectedPartIds.includes(part.id);
                      const generatedCert = certificates.find(c => c.participant_id === part.id);
                      return (
                        <tr key={part.id} className="hover:bg-secondary/40 transition">
                          <td className="px-6 py-4">
                            <button onClick={() => handleToggleSelectOne(part.id)}>
                              {isSelected ? <CheckSquare className="h-4 w-4 text-brand-500" /> : <Square className="h-4 w-4 text-muted" />}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-foreground">{part.employee_name}</div>
                            {part.employee_email && <div className="text-xs text-muted-foreground">{part.employee_email}</div>}
                          </td>
                          <td className="px-6 py-4">{part.company}</td>
                          <td className="px-6 py-4">{part.position || '-'}</td>
                          <td className="px-6 py-4">
                            {generatedCert ? (
                              <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] bg-emerald-500/10 text-emerald-500">
                                Diterbitkan ({generatedCert.certificate_number})
                              </span>
                            ) : (
                              <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] bg-amber-500/10 text-amber-500">
                                Belum Terbit
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {participants.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-muted">Belum ada peserta dalam realisasi ini.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm flex flex-col items-center justify-center min-h-[400px] text-center text-muted">
              <Award className="h-12 w-12 text-muted mb-4 opacity-40" />
              <p className="font-semibold">Realisasi Pelatihan Belum Terpilih</p>
              <p className="text-sm mt-1 max-w-sm">Pilih salah satu realisasi pelatihan di sebelah kiri untuk menghasilkan sertifikat kelulusan.</p>
            </Card>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
