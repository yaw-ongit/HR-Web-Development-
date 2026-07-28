'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, RefreshCw, Printer, Download, Award, FileText, CheckSquare, Square, Check, X, ShieldAlert, BadgeAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';
import { employeeDirectory } from '@/lib/people-data';
import { jsPDF } from 'jspdf';
import { zipSync } from 'fflate';

const unitOptions = ['SDM', 'Teknologi', 'Penjualan', 'Keuangan', 'Produk', 'Hukum', 'Layanan Pelanggan', 'Production', 'Operations'];
const periodOptions = ['2026-Q1', '2026-Q2', '2026-Q3', '2026-Q4', '2027-Q1', '2027-Q2', '2027-Q3', '2027-Q4'];
const typeOptions = [
  'Safety',
  'Food Safety',
  'HRD',
  'Quality',
  'Technical',
  'Leadership',
  'ISO',
  'Internal Training',
  'External Training',
  'Compliance',
  'Other'
];

type ReportType = 'summary' | 'attendance' | 'matrix' | 'certificate' | 'card' | 'report_card';

export default function TrainingReportPage() {
  // Master lists
  const [plannings, setPlannings] = useState<any[]>([]);
  const [realizations, setRealizations] = useState<any[]>([]);
  const [allParticipants, setAllParticipants] = useState<any[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [attendances, setAttendances] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);

  // Active Report Type
  const [activeReport, setActiveReport] = useState<ReportType>('summary');

  // Filter states
  const [filterUnit, setFilterUnit] = useState('All');
  const [filterPeriod, setFilterPeriod] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterMandatoryOnly, setFilterMandatoryOnly] = useState(false);
  const [search, setSearch] = useState('');

  // Selected participants for action
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadData = async () => {
    const plansRes = await TalentService.getPlannings();
    if (plansRes && plansRes.data) setPlannings(plansRes.data);

    const realsRes = await TalentService.getRealizations();
    if (realsRes && realsRes.data) {
      setRealizations(realsRes.data);
      
      const tempParticipants: any[] = [];
      const tempEvaluations: any[] = [];
      const tempAttendances: any[] = [];
      const tempCerts: any[] = [];
      
      for (const real of realsRes.data) {
        const parts = await TalentService.getParticipants(real.id);
        if (parts && parts.data) {
          tempParticipants.push(...parts.data);
        }
        const evals = await TalentService.getEvaluations(real.id);
        if (evals && evals.data) {
          tempEvaluations.push(...evals.data);
        }
        const atts = await TalentService.getAttendances(real.id);
        if (atts && atts.data) {
          tempAttendances.push(...atts.data);
        }
        const certs = await TalentService.getCertificatesByRealization(real.id);
        if (certs && certs.data) {
          tempCerts.push(...certs.data);
        }
      }
      setAllParticipants(tempParticipants);
      setEvaluations(tempEvaluations);
      setAttendances(tempAttendances);
      setCertificates(tempCerts);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Map participant structures
  const mappedParticipants = useMemo(() => {
    return allParticipants.map(part => {
      const real = realizations.find(r => r.id === part.realization_id);
      if (!real) return null;
      const plan = plannings.find(p => p.id === real.planning_id);
      if (!plan) return null;
      const evalObj = evaluations.find(e => e.realization_id === real.id);
      const att = attendances.find(a => a.participant_id === part.id || a.participant_id?.id === part.id);
      const cert = certificates.find(c => c.participant_id === part.id);

      // Expiry calculation
      let daysRemaining = null;
      let expiryStatus = 'No Cert';
      if (cert && cert.expiration_date) {
        const diff = new Date(cert.expiration_date).getTime() - new Date().getTime();
        daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
        if (daysRemaining < 0) {
          expiryStatus = 'Expired';
        } else if (daysRemaining <= 30) {
          expiryStatus = 'Expiring Soon';
        } else {
          expiryStatus = 'Valid';
        }
      }

      return {
        partId: part.id,
        employeeId: part.employee_id,
        name: part.employee_name,
        email: part.employee_email,
        company: part.company,
        position: part.position,
        isExternal: part.is_external,
        realizationId: real.id,
        realizationStatus: real.status,
        planId: plan.id,
        title: plan.title,
        unit: plan.unit,
        period: plan.period,
        type: plan.training_type,
        trainer: plan.trainer,
        provider: plan.provider,
        date: plan.start_date,
        cost: plan.cost,
        score: evalObj ? evalObj.score : '-',
        recommendation: evalObj ? evalObj.recommendation : '-',
        attendance: att ? att.status : 'Absent',
        attendanceNotes: att ? att.notes : '',
        certificateNumber: cert ? cert.certificate_number : null,
        expirationDate: cert ? cert.expiration_date : null,
        daysRemaining,
        expiryStatus
      };
    }).filter(row => {
      if (!row) return false;
      const matchUnit = filterUnit === 'All' || row.unit === filterUnit;
      const matchPeriod = filterPeriod === 'All' || row.period === filterPeriod;
      const matchType = filterType === 'All' || row.type === filterType;
      const matchMandatory = !filterMandatoryOnly || row.type === 'Compliance' || row.type === 'Safety';
      const matchSearch = row.name.toLowerCase().includes(search.toLowerCase()) || 
                          row.title.toLowerCase().includes(search.toLowerCase());
      return matchUnit && matchPeriod && matchType && matchMandatory && matchSearch;
    }) as any[];
  }, [allParticipants, realizations, plannings, evaluations, attendances, certificates, filterUnit, filterPeriod, filterType, filterMandatoryOnly, search]);

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === eligibleReportCardParticipants.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(eligibleReportCardParticipants.map(row => row.partId));
    }
  };

  // Only present participants are eligible for certificates
  const eligibleReportCardParticipants = useMemo(() => {
    return mappedParticipants.filter(row => row && row.attendance === 'Present');
  }, [mappedParticipants]);

  // Mandatory Training Matrix Calculation
  const matrixData = useMemo(() => {
    // List of active employees in unit/dept
    const matchEmployees = employeeDirectory.filter(emp => filterUnit === 'All' || emp.department === filterUnit);
    
    // We assume 'Safety Training' and 'Food Safety' are mandatory
    const mandatoryTrainings = ['Pelatihan Keselamatan Kerja K3', 'Food Safety Management'];

    return matchEmployees.map(emp => {
      const completionList = mandatoryTrainings.map(t => {
        // Find if they have a completed realization
        const match = mappedParticipants.find(row => 
          row && 
          row.employeeId === emp.id && 
          row.title.includes(t) && 
          row.attendance === 'Present'
        );
        return {
          title: t,
          status: match ? 'Completed' : 'Needed',
          expiry: match ? match.expiryStatus : 'N/A'
        };
      });

      return {
        empId: emp.id,
        name: emp.fullName,
        department: emp.department,
        completions: completionList
      };
    });
  }, [mappedParticipants, filterUnit]);

  // Bulk generate ZIP certificates
  const handleBulkGenerate = async () => {
    if (selectedIds.length === 0) {
      alert('Pilih minimal satu peserta.');
      return;
    }
    setIsGenerating(true);
    try {
      const zipFiles: Record<string, Uint8Array> = {};
      let index = 1;

      for (const partId of selectedIds) {
        const row = mappedParticipants.find(r => r && r.partId === partId);
        if (!row) continue;

        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const w = 297, h = 210;

        // Draw basic cert structure
        doc.setDrawColor(10, 37, 64); doc.setLineWidth(3); doc.rect(8, 8, w-16, h-16);
        doc.setDrawColor(212, 175, 55); doc.setLineWidth(0.8); doc.rect(10, 10, w-20, h-20);
        doc.setTextColor(10, 37, 64); doc.setFont('times', 'bold'); doc.setFontSize(26);
        doc.text(row.name, w/2, 85, { align: 'center' });
        doc.setFontSize(18); doc.text(row.title, w/2, 114, { align: 'center' });
        
        const certNum = row.certificateNumber || `CERT-2026-${String(certificates.length + index).padStart(6, '0')}`;
        doc.setFontSize(8); doc.text(`Certificate Number: ${certNum}`, 22, 160);

        const pdfBytes = doc.output('arraybuffer');
        zipFiles[`${row.name.replace(/\s+/g, '_')}_sertifikat.pdf`] = new Uint8Array(pdfBytes);
        index++;
      }

      const zipData = zipSync(zipFiles);
      const blob = new Blob([zipData], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Bulk_Certificates_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(`Penerbitan masal selesai! ${selectedIds.length} sertifikat berhasil diunduh dalam ZIP.`);
      setSelectedIds([]);
      loadData();
    } catch (err) {
      console.error(err);
      alert('Gagal menerbitkan sertifikat.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Nama Peserta,Jabatan,Pelatihan,Unit,Jenis,Periode,Kehadiran,Skor Evaluasi,Sertifikat,Status Expiry"]
      .concat(mappedParticipants.map(r => {
        const row = r!;
        return `"${row.name}","${row.position || '-'}","${row.title}","${row.unit}","${row.type}","${row.period}","${row.attendance}","${row.score}","${row.certificateNumber || '-'}","${row.expiryStatus}"`;
      })).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `training-report-${activeReport}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <SectionContainer>
      <Card className="rounded-[28px] border border-border p-6 shadow-sm">
        {/* Report tabs */}
        <div className="flex flex-wrap gap-1 rounded-xl bg-secondary p-1 mb-6 max-w-3xl">
          {(['summary', 'attendance', 'matrix', 'certificate', 'report_card'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveReport(tab);
                setSelectedIds([]);
              }}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeReport === tab ? 'bg-card text-foreground shadow font-bold' : 'text-muted hover:text-muted-foreground'
              }`}
            >
              {tab === 'summary' ? 'Summary' : tab === 'attendance' ? 'Kehadiran' : tab === 'matrix' ? 'Matrix' : tab === 'certificate' ? 'Sertifikat' : 'Report Card / Bulk'}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative w-64">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari..."
                className="w-full rounded-xl border border-border bg-card py-2 pl-11 pr-4 text-sm outline-none focus:border-brand-500"
              />
            </div>
            
            <select value={filterUnit} onChange={(e) => setFilterUnit(e.target.value)} className="rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none">
              <option value="All">Semua Unit</option>
              {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
            </select>

            <select value={filterPeriod} onChange={(e) => setFilterPeriod(e.target.value)} className="rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none">
              <option value="All">Semua Periode</option>
              {periodOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none">
              <option value="All">Semua Jenis</option>
              {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="flex gap-2">
            <Button onClick={loadData} variant="outline" className="rounded-xl">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button onClick={handlePrint} variant="outline" className="rounded-xl">
              <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
            <Button onClick={handleExportExcel} variant="outline" className="rounded-xl">
              <Download className="h-4 w-4 mr-2" /> Excel
            </Button>
            {activeReport === 'report_card' && (
              <Button onClick={handleBulkGenerate} disabled={selectedIds.length === 0 || isGenerating} className="rounded-xl bg-brand-600 text-white hover:bg-brand-700">
                <Award className="h-4 w-4 mr-2" /> Cetak ZIP ({selectedIds.length})
              </Button>
            )}
          </div>
        </div>

        {/* Tab contents */}
        {activeReport === 'summary' && (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Nama Peserta</th>
                  <th className="px-6 py-4">Judul Pelatihan</th>
                  <th className="px-6 py-4">Unit Kerja</th>
                  <th className="px-6 py-4">Biaya</th>
                  <th className="px-6 py-4">Skor Evaluasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mappedParticipants.map((row, idx) => row && (
                  <tr key={idx} className="hover:bg-secondary/40 transition">
                    <td className="px-6 py-4 font-semibold">{row.name}</td>
                    <td className="px-6 py-4">{row.title}</td>
                    <td className="px-6 py-4">{row.unit}</td>
                    <td className="px-6 py-4">Rp {Number(row.cost || 0).toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 font-bold">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeReport === 'attendance' && (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Nama Peserta</th>
                  <th className="px-6 py-4">Pelatihan</th>
                  <th className="px-6 py-4">Status Kehadiran</th>
                  <th className="px-6 py-4">Catatan Absen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mappedParticipants.map((row, idx) => row && (
                  <tr key={idx} className="hover:bg-secondary/40 transition">
                    <td className="px-6 py-4 font-semibold">{row.name}</td>
                    <td className="px-6 py-4">{row.title}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                        row.attendance === 'Present' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        {row.attendance}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">{row.attendanceNotes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeReport === 'matrix' && (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Nama Karyawan</th>
                  <th className="px-6 py-4">Departemen</th>
                  <th className="px-6 py-4">Pelatihan K3</th>
                  <th className="px-6 py-4">Food Safety</th>
                  <th className="px-6 py-4">Status Kelayakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {matrixData.map((row) => {
                  const hasK3 = row.completions.find(c => c.title.includes('K3'))?.status === 'Completed';
                  const hasFood = row.completions.find(c => c.title.includes('Food Safety'))?.status === 'Completed';
                  const isCompliant = hasK3 && hasFood;
                  return (
                    <tr key={row.empId} className="hover:bg-secondary/40 transition">
                      <td className="px-6 py-4 font-semibold">{row.name}</td>
                      <td className="px-6 py-4">{row.department}</td>
                      <td className="px-6 py-4">
                        {hasK3 ? (
                          <span className="flex items-center gap-1 text-emerald-500 text-xs font-semibold"><Check className="h-4 w-4" /> Completed</span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-500 text-xs font-semibold"><X className="h-4 w-4" /> Needed</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {hasFood ? (
                          <span className="flex items-center gap-1 text-emerald-500 text-xs font-semibold"><Check className="h-4 w-4" /> Completed</span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-500 text-xs font-semibold"><X className="h-4 w-4" /> Needed</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isCompliant ? (
                          <span className="inline-flex rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-500">Fully Compliant</span>
                        ) : (
                          <span className="inline-flex rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase bg-amber-500/10 text-amber-500">Action Required</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeReport === 'certificate' && (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Nama Pemilik</th>
                  <th className="px-6 py-4">Pelatihan</th>
                  <th className="px-6 py-4">No. Sertifikat</th>
                  <th className="px-6 py-4">Berlaku Sampai</th>
                  <th className="px-6 py-4">Sisa Hari</th>
                  <th className="px-6 py-4">Status Expiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mappedParticipants.filter(row => row && row.certificateNumber).map((row, idx) => row && (
                  <tr key={idx} className="hover:bg-secondary/40 transition">
                    <td className="px-6 py-4 font-semibold">{row.name}</td>
                    <td className="px-6 py-4">{row.title}</td>
                    <td className="px-6 py-4 font-mono text-xs">{row.certificateNumber}</td>
                    <td className="px-6 py-4 text-xs">{row.expirationDate || '-'}</td>
                    <td className="px-6 py-4 font-semibold text-xs">
                      {row.daysRemaining !== null ? `${row.daysRemaining} hari` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        row.expiryStatus === 'Valid'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : row.expiryStatus === 'Expired'
                          ? 'bg-rose-500/10 text-rose-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {row.expiryStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeReport === 'report_card' && (
          <div>
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold select-none">
              <button onClick={handleToggleSelectAll} className="flex items-center gap-2 text-primary hover:underline">
                {selectedIds.length === eligibleReportCardParticipants.length && eligibleReportCardParticipants.length > 0 ? (
                  <CheckSquare className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                Pilih Semua ({eligibleReportCardParticipants.length} Hadir)
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4 w-12">Pilih</th>
                    <th className="px-6 py-4">Nama Lengkap</th>
                    <th className="px-6 py-4">Pelatihan</th>
                    <th className="px-6 py-4">Unit Kerja</th>
                    <th className="px-6 py-4">Status Kehadiran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {eligibleReportCardParticipants.map((row) => (
                    <tr key={row.partId} className="hover:bg-secondary/40 transition">
                      <td className="px-6 py-4">
                        <button onClick={() => handleToggleSelectOne(row.partId)}>
                          {selectedIds.includes(row.partId) ? <CheckSquare className="h-4 w-4 text-brand-500" /> : <Square className="h-4 w-4 text-muted" />}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-semibold">{row.name}</td>
                      <td className="px-6 py-4">{row.title}</td>
                      <td className="px-6 py-4">{row.unit}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-500">{row.attendance}</span>
                      </td>
                    </tr>
                  ))}
                  {eligibleReportCardParticipants.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted">Tidak ada peserta yang hadir untuk dicetak sertifikat.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>
    </SectionContainer>
  );
}
