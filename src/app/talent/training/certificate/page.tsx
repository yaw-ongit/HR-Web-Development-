'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, RefreshCw, Award, CheckSquare, Square, Download, Eye, FileText, Upload, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';
import { useToast } from '@/components/ui/toast';
import { jsPDF } from 'jspdf';
import { zipSync } from 'fflate';

export default function TrainingCertificatePage() { 
  const { addToast } = useToast();
  const [plannings, setPlannings] = useState<any[]>([]);
  const [realizations, setRealizations] = useState<any[]>([]);
  const [selectedRealizationId, setSelectedRealizationId] = useState('');
  const [participants, setParticipants] = useState<any[]>([]);
  const [attendances, setAttendances] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [selectedPartIds, setSelectedPartIds] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Signatory controls
  const [signatoryManager, setSignatoryManager] = useState('Budi Santoso');
  const [signatoryManagerTitle, setSignatoryManagerTitle] = useState('Training Manager');
  const [signatoryHR, setSignatoryHR] = useState('Fitri Novita');
  const [signatoryHRTitle, setSignatoryHRTitle] = useState('Director HRD');
  const [useSignatureStamp, setUseSignatureStamp] = useState(true);

  // Expire years options
  const [validityYears, setValidityYears] = useState('3');

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

  // Fetch participants, attendance and certificate status
  useEffect(() => {
    if (selectedRealizationId) {
      // Load participants
      TalentService.getParticipants(selectedRealizationId).then((res: any) => {
        if (res && res.data) {
          setParticipants(res.data);
          setSelectedPartIds([]);
        }
      });
      // Load attendances
      TalentService.getAttendances(selectedRealizationId).then((res: any) => {
        if (res && res.data) setAttendances(res.data);
      });
      // Load generated certificates info
      TalentService.getCertificatesByRealization(selectedRealizationId).then((res: any) => {
        if (res && res.data) setCertificates(res.data);
      });
    } else {
      setParticipants([]);
      setAttendances([]);
      setCertificates([]);
      setSelectedPartIds([]);
    }
  }, [selectedRealizationId]);

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

  // Map participant attendance status
  const participantsWithAttendance = useMemo(() => {
    return participants.map(part => {
      const att = attendances.find(a => a.participant_id === part.id || a.participant_id?.id === part.id);
      return {
        ...part,
        attendanceStatus: att ? att.status : 'Absent',
        attendanceNotes: att ? att.notes : ''
      };
    });
  }, [participants, attendances]);

  // Pre-select only present participants
  const eligibleParticipants = useMemo(() => {
    return participantsWithAttendance.filter(p => p.attendanceStatus === 'Present');
  }, [participantsWithAttendance]);

  const handleToggleSelectOne = (id: string) => {
    setSelectedPartIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedPartIds.length === eligibleParticipants.length) {
      setSelectedPartIds([]);
    } else {
      setSelectedPartIds(eligibleParticipants.map(p => p.id));
    }
  };

  const drawOfflineQRCode = (doc: any, x: number, y: number, size: number) => {
    // Draw outer border
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.rect(x, y, size, size);

    // Helper to draw alignment patterns
    const drawCorner = (cx: number, cy: number) => {
      doc.setFillColor(0, 0, 0);
      doc.rect(cx, cy, 5, 5, 'F');
      doc.setFillColor(255, 255, 255);
      doc.rect(cx + 1, cy + 1, 3, 3, 'F');
      doc.setFillColor(0, 0, 0);
      doc.rect(cx + 1.8, cy + 1.8, 1.4, 1.4, 'F');
    };

    drawCorner(x + 1, y + 1); // Top Left
    drawCorner(x + size - 6, y + 1); // Top Right
    drawCorner(x + 1, y + size - 6); // Bottom Left

    // Pseudo-random noise for code content
    doc.setFillColor(0, 0, 0);
    const cells = 15;
    const cellSize = (size - 2) / cells;
    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        // Skip corner alignment grids
        if ((r < 6 && c < 6) || (r < 6 && c > 8) || (r > 8 && c < 6)) continue;
        // Pseudo random matrix generator
        if (((r * 4 + c * 9) % 7 === 0) || ((r + c) % 3 === 0)) {
          doc.rect(x + 1 + (c * cellSize), y + 1 + (r * cellSize), cellSize, cellSize, 'F');
        }
      }
    }
  };

  const generatePDFBytes = (participant: any, certNum: string) => {
    if (!selectedRealizationDetail) return null;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const w = 297;
    const h = 210;

    // Navy Border
    doc.setDrawColor(10, 37, 64);
    doc.setLineWidth(3);
    doc.rect(8, 8, w - 16, h - 16);

    // Gold Border
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.8);
    doc.rect(10, 10, w - 20, h - 20);

    // Corner Accents
    const drawAccents = () => {
      doc.setDrawColor(10, 37, 64);
      doc.setLineWidth(2.5);
      doc.line(8, 8, 38, 8); doc.line(8, 8, 8, 38);
      doc.setDrawColor(163, 0, 0); doc.setLineWidth(0.8);
      doc.line(12, 12, 32, 12); doc.line(12, 12, 12, 32);

      doc.setDrawColor(10, 37, 64); doc.setLineWidth(2.5);
      doc.line(w - 8, 8, w - 38, 8); doc.line(w - 8, 8, w - 8, 38);
      doc.setDrawColor(163, 0, 0); doc.setLineWidth(0.8);
      doc.line(w - 12, 12, w - 32, 12); doc.line(w - 12, 12, w - 12, 32);

      doc.setDrawColor(10, 37, 64); doc.setLineWidth(2.5);
      doc.line(8, h - 8, 38, h - 8); doc.line(8, h - 8, 8, h - 38);
      doc.setDrawColor(163, 0, 0); doc.setLineWidth(0.8);
      doc.line(12, h - 12, 32, h - 12); doc.line(12, h - 12, 12, h - 32);

      doc.setDrawColor(10, 37, 64); doc.setLineWidth(2.5);
      doc.line(w - 8, h - 8, w - 38, h - 8); doc.line(w - 8, h - 8, w - 8, h - 38);
      doc.setDrawColor(163, 0, 0); doc.setLineWidth(0.8);
      doc.line(w - 12, h - 12, w - 32, h - 12); doc.line(w - 12, h - 12, w - 12, h - 32);
    };
    drawAccents();

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
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(7.5);
    doc.text(`Certificate Number: ${certNum}`, 22, 158);
    doc.text(`Issued Date: ${new Date().toISOString().split('T')[0]}`, 22, 163);
    const expDate = new Date();
    expDate.setFullYear(expDate.getFullYear() + Number(validityYears));
    doc.text(`Expiration Date: ${expDate.toISOString().split('T')[0]}`, 22, 168);

    // Footer center (Official Seal Stamp & QR Code)
    const stampX = w / 2 - 25;
    const stampY = 160;
    
    // Draw seal
    doc.setDrawColor(163, 0, 0);
    doc.setLineWidth(0.8);
    doc.circle(stampX, stampY, 12, 'D');
    doc.setTextColor(163, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.5);
    doc.text("PT INDOCATER", stampX, stampY - 4, { align: 'center' });
    doc.setFontSize(6);
    doc.text("HR DEPT", stampX, stampY + 1, { align: 'center' });
    doc.setFontSize(4.5);
    doc.text("OFFICIAL SEAL", stampX, stampY + 5, { align: 'center' });

    // Draw QR Code (Offline representation)
    const qrX = w / 2 + 10;
    const qrY = 146;
    drawOfflineQRCode(doc, qrX, qrY, 24);
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(5);
    doc.text("Scan to Verify", qrX + 12, qrY + 27, { align: 'center' });

    // Footer right (Signatures)
    const sigX = w - 68;
    const sigY = 145;
    if (useSignatureStamp) {
      doc.setDrawColor(26, 54, 93);
      doc.setLineWidth(0.8);
      doc.line(sigX + 10, sigY + 8, sigX + 16, sigY + 2);
      doc.line(sigX + 16, sigY + 2, sigX + 22, sigY + 10);
      doc.line(sigX + 22, sigY + 10, sigX + 30, sigY + 4);
      doc.line(sigX + 30, sigY + 4, sigX + 38, sigY + 8);
    }
    doc.setDrawColor(163, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(sigX, sigY + 12, sigX + 46, sigY + 12);
    
    doc.setTextColor(10, 37, 64);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(signatoryManager, sigX + 12, sigY + 16, { align: 'center' });
    doc.text(signatoryHR, sigX + 35, sigY + 16, { align: 'center' });
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(6.5);
    doc.text(signatoryManagerTitle, sigX + 12, sigY + 20, { align: 'center' });
    doc.text(signatoryHRTitle, sigX + 35, sigY + 20, { align: 'center' });

    return doc.output('arraybuffer');
  };

  const handleGenerateSinglePdf = (part: any) => {
    if (!selectedRealizationDetail) return;
    const lastNum = certificates.length + 1;
    const certNum = `CERT-2026-${String(lastNum).padStart(6, '0')}`;
    
    const pdfBytes = generatePDFBytes(part, certNum);
    if (!pdfBytes) return;

    // Trigger local download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Certificate_${part.employee_name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Save certificate
    const exp = new Date();
    exp.setFullYear(exp.getFullYear() + Number(validityYears));
    TalentService.generateCertificate({
      realization_id: selectedRealizationId,
      participant_id: part.id,
      certificate_number: certNum,
      issued_date: new Date().toISOString().split('T')[0],
      expiration_date: exp.toISOString().split('T')[0],
      status: 'Valid',
      qr_code_url: `${certNum}|${part.employee_id || 'EXT'}|${selectedRealizationDetail.planningTitle}|${new Date().toISOString().split('T')[0]}`,
      download_count: 1
    }).then(() => {
      // Reload certificates
      TalentService.getCertificatesByRealization(selectedRealizationId).then((res: any) => {
        if (res && res.data) setCertificates(res.data);
      });
    });
  };

  const handleGenerateZip = async () => {
    if (selectedPartIds.length === 0 || !selectedRealizationDetail) {
      addToast({ title: 'Notifikasi', description: 'Pilih minimal satu peserta untuk membuat sertifikat.', variant: 'success' });
      return;
    }

    setIsGenerating(true);
    try {
      const zipFiles: Record<string, Uint8Array> = {};
      let index = 1;

      for (const partId of selectedPartIds) {
        const part = participants.find(p => p.id === partId);
        if (!part) continue;

        const lastNum = certificates.length + index;
        const certNum = `CERT-2026-${String(lastNum).padStart(6, '0')}`;

        // Generate PDF bytes
        const pdfBytes = generatePDFBytes(part, certNum);
        if (!pdfBytes) continue;

        const nameCleaned = part.employee_name.replace(/\s+/g, '_');
        zipFiles[`${nameCleaned}_sertifikat.pdf`] = new Uint8Array(pdfBytes);

        // Save certificate entry to database/mock database
        const exp = new Date();
        exp.setFullYear(exp.getFullYear() + Number(validityYears));
        await TalentService.generateCertificate({
          realization_id: selectedRealizationId,
          participant_id: part.id,
          certificate_number: certNum,
          issued_date: new Date().toISOString().split('T')[0],
          expiration_date: exp.toISOString().split('T')[0],
          status: 'Valid',
          qr_code_url: `${certNum}|${part.employee_id || 'EXT'}|${selectedRealizationDetail.planningTitle}|${new Date().toISOString().split('T')[0]}`,
          download_count: 1
        });
        index++;
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

      addToast({ title: 'Notifikasi', description: `Penerbitan masal selesai! ${selectedPartIds.length} sertifikat telah dikompresi ke dalam ZIP.`, variant: 'success' });
      
      // Reload data and certificates
      loadData();
      TalentService.getCertificatesByRealization(selectedRealizationId).then((res: any) => {
        if (res && res.data) setCertificates(res.data);
      });
      setSelectedPartIds([]);
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', description: 'Gagal membuat ZIP sertifikat.', variant: 'danger' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SectionContainer>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: Choose completed realization & configurations */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="rounded-[28px] border border-border p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-semibold text-foreground">Pilih Realisasi Pelatihan</h3>
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
              <div className="border-t border-border pt-4 space-y-3 text-sm">
                <div>
                  <strong className="block text-xs text-muted-foreground">Judul Pelatihan</strong>
                  {selectedRealizationDetail.planningTitle}
                </div>
                <div>
                  <strong className="block text-xs text-muted-foreground">Unit Kerja</strong>
                  {selectedRealizationDetail.planningUnit}
                </div>
                <div>
                  <strong className="block text-xs text-muted-foreground">Tanggal</strong>
                  {selectedRealizationDetail.planningDate}
                </div>
              </div>
            )}
          </Card>

          {/* Signatory Settings */}
          <Card className="rounded-[28px] border border-border p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-semibold text-foreground">Pengaturan Tanda Tangan</h3>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Training Manager</label>
              <input
                type="text"
                value={signatoryManager}
                onChange={(e) => setSignatoryManager(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
              />
              <input
                type="text"
                value={signatoryManagerTitle}
                onChange={(e) => setSignatoryManagerTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs outline-none text-muted-foreground"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Director HRD</label>
              <input
                type="text"
                value={signatoryHR}
                onChange={(e) => setSignatoryHR(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
              />
              <input
                type="text"
                value={signatoryHRTitle}
                onChange={(e) => setSignatoryHRTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs outline-none text-muted-foreground"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Masa Berlaku Sertifikat (Tahun)</label>
              <select
                value={validityYears}
                onChange={(e) => setValidityYears(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
              >
                <option value="1">1 Tahun</option>
                <option value="2">2 Tahun</option>
                <option value="3">3 Tahun</option>
                <option value="5">5 Tahun</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground select-none cursor-pointer">
              <input 
                type="checkbox"
                checked={useSignatureStamp}
                onChange={(e) => setUseSignatureStamp(e.target.checked)}
                className="rounded border-border"
              />
              Gunakan Gambar Tanda Tangan (Stamp)
            </label>
          </Card>
        </div>

        {/* Right column: Participant selector and Generate ZIP */}
        <div className="lg:col-span-2">
          {selectedRealizationId ? (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Pembuatan Sertifikat Masal</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hanya menampilkan peserta yang hadir (Present).
                  </p>
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
                  {selectedPartIds.length === eligibleParticipants.length && eligibleParticipants.length > 0 ? (
                    <CheckSquare className="h-4 w-4" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  Pilih Semua ({eligibleParticipants.length} Peserta Hadir)
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4 w-12">Pilih</th>
                      <th className="px-6 py-4">Nama Lengkap</th>
                      <th className="px-6 py-4">Perusahaan</th>
                      <th className="px-6 py-4">Status Sertifikat</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {participantsWithAttendance.map((part) => {
                      const isEligible = part.attendanceStatus === 'Present';
                      const isSelected = selectedPartIds.includes(part.id);
                      const generatedCert = certificates.find(c => c.participant_id === part.id);
                      return (
                        <tr key={part.id} className={`hover:bg-secondary/40 transition ${!isEligible ? 'opacity-50' : ''}`}>
                          <td className="px-6 py-4">
                            {isEligible ? (
                              <button onClick={() => handleToggleSelectOne(part.id)}>
                                {isSelected ? <CheckSquare className="h-4 w-4 text-brand-500" /> : <Square className="h-4 w-4 text-muted" />}
                              </button>
                            ) : (
                              <div className="text-[10px] font-bold text-rose-500">Absent</div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-foreground">{part.employee_name}</div>
                            <div className="text-xs text-muted-foreground">{part.company} {part.position ? `(${part.position})` : ''}</div>
                          </td>
                          <td className="px-6 py-4 text-xs">
                            Kehadiran: <span className="font-bold text-primary">{part.attendanceStatus}</span>
                          </td>
                          <td className="px-6 py-4 text-xs">
                            {generatedCert ? (
                              <span className="inline-flex rounded-full px-2.5 py-0.5 font-mono text-[9px] font-semibold bg-emerald-500/10 text-emerald-500">
                                {generatedCert.certificate_number}
                              </span>
                            ) : (
                              <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-500">
                                Belum Terbit
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {isEligible && (
                              <Button
                                size="sm"
                                onClick={() => handleGenerateSinglePdf(part)}
                                className="rounded-xl bg-slate-800 text-white text-xs"
                              >
                                Unduh PDF
                              </Button>
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
              <p className="text-sm mt-1 max-w-sm">Pilih salah satu realisasi pelatihan di sebelah kiri untuk mengonfigurasi dan mencetak sertifikat digital.</p>
            </Card>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
