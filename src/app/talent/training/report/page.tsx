'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, RefreshCw, Printer, Download, Award, FileText, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';
import { useRouter } from 'next/navigation';

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

export default function TrainingReportPage() {
  const router = useRouter();
  
  // Master lists
  const [plannings, setPlannings] = useState<any[]>([]);
  const [realizations, setRealizations] = useState<any[]>([]);
  const [allParticipants, setAllParticipants] = useState<any[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);

  // Filter states
  const [filterUnit, setFilterUnit] = useState('All');
  const [filterPeriod, setFilterPeriod] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterMandatoryOnly, setFilterMandatoryOnly] = useState(false);
  const [search, setSearch] = useState('');

  // Selected participants for action
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const loadData = async () => {
    const plansRes = await TalentService.getPlannings();
    if (plansRes && plansRes.data) setPlannings(plansRes.data);

    const realsRes = await TalentService.getRealizations();
    if (realsRes && realsRes.data) {
      setRealizations(realsRes.data);
      
      // Load all participants for all realizations
      const tempParticipants: any[] = [];
      const tempEvaluations: any[] = [];
      for (const real of realsRes.data) {
        const parts = await TalentService.getParticipants(real.id);
        if (parts && parts.data) {
          tempParticipants.push(...parts.data);
        }
        const evals = await TalentService.getEvaluations(real.id);
        if (evals && evals.data) {
          tempEvaluations.push(...evals.data);
        }
      }
      setAllParticipants(tempParticipants);
      setEvaluations(tempEvaluations);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered rows
  const reportRows = useMemo(() => {
    return allParticipants.map(part => {
      const real = realizations.find(r => r.id === part.realization_id);
      if (!real) return null;
      const plan = plannings.find(p => p.id === real.planning_id);
      if (!plan) return null;
      const evalObj = evaluations.find(e => e.realization_id === real.id);

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
        recommendation: evalObj ? evalObj.recommendation : '-'
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
    });
  }, [allParticipants, realizations, plannings, evaluations, filterUnit, filterPeriod, filterType, filterMandatoryOnly, search]);

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === reportRows.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(reportRows.map(row => row!.partId));
    }
  };

  const handleExportExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Nama Peserta,Perusahaan,Jabatan,Internal/Eksternal,Judul Pelatihan,Unit,Periode,Jenis Pelatihan,Tanggal,Biaya,Skor,Rekomendasi"]
      .concat(reportRows.map(r => {
        const row = r!;
        return `"${row.name}","${row.company}","${row.position || '-'}","${row.isExternal ? 'Eksternal' : 'Internal'}","${row.title}","${row.unit}","${row.period}","${row.type}","${row.date}",${row.cost},"${row.score}","${row.recommendation}"`;
      })).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `training-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportWord = () => {
    // Generate simple HTML formatted document which MS Word can read
    let htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Laporan Pelatihan Karyawan</title>
      <style>
        body { font-family: Arial; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
      </head>
      <body>
      <h2>LAPORAN PELAKSANAAN PELATIHAN KARYAWAN</h2>
      <p>Tanggal Laporan: ${new Date().toLocaleDateString('id-ID')}</p>
      <table>
        <thead>
          <tr>
            <th>Nama Peserta</th>
            <th>Jabatan</th>
            <th>Judul Pelatihan</th>
            <th>Unit</th>
            <th>Jenis</th>
            <th>Periode</th>
            <th>Skor</th>
            <th>Rekomendasi</th>
          </tr>
        </thead>
        <tbody>
    `;

    reportRows.forEach(r => {
      const row = r!;
      htmlContent += `
        <tr>
          <td>${row.name}</td>
          <td>${row.position || '-'}</td>
          <td>${row.title}</td>
          <td>${row.unit}</td>
          <td>${row.type}</td>
          <td>${row.period}</td>
          <td>${row.score}</td>
          <td>${row.recommendation}</td>
        </tr>
      `;
    });

    htmlContent += `
        </tbody>
      </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `training-report-${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateCertificateRedirect = () => {
    if (selectedIds.length === 0) {
      alert('Pilih minimal satu peserta untuk menerbitkan sertifikat.');
      return;
    }
    // Save selected participant IDs to localStorage so the certificate page can retrieve it
    localStorage.setItem('selected_report_participants', JSON.stringify(selectedIds));
    router.push('/talent/training/certificate');
  };

  return (
    <SectionContainer>
      <Card className="rounded-[28px] border border-border p-6 shadow-sm">
        {/* Filters Panel */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative w-64">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau pelatihan..."
                className="w-full rounded-xl border border-border bg-card py-2 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500"
              />
            </div>
            
            <select
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none"
            >
              <option value="All">Semua Unit</option>
              {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
            </select>

            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none"
            >
              <option value="All">Semua Periode</option>
              {periodOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none"
            >
              <option value="All">Semua Jenis</option>
              {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground select-none cursor-pointer">
              <input 
                type="checkbox"
                checked={filterMandatoryOnly}
                onChange={(e) => setFilterMandatoryOnly(e.target.checked)}
                className="rounded border-border"
              />
              Wajib Saja (Compliance / Safety)
            </label>
          </div>

          {/* Toolbar */}
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
            <Button onClick={handleExportWord} variant="outline" className="rounded-xl">
              <FileText className="h-4 w-4 mr-2" /> Word
            </Button>
            <Button onClick={handleGenerateCertificateRedirect} className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold">
              <Award className="h-4 w-4 mr-2" /> Sertifikat ({selectedIds.length})
            </Button>
          </div>
        </div>

        {/* Selected Counter and bulk controller */}
        <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
          <button 
            onClick={handleToggleSelectAll}
            className="flex items-center gap-2 text-primary hover:underline"
          >
            {selectedIds.length === reportRows.length && reportRows.length > 0 ? (
              <CheckSquare className="h-4 w-4" />
            ) : (
              <Square className="h-4 w-4" />
            )}
            Pilih Semua ({reportRows.length} baris)
          </button>
          {selectedIds.length > 0 && (
            <span className="text-muted-foreground">| Terpilih {selectedIds.length} peserta</span>
          )}
        </div>

        {/* Table list */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4 w-12">Pilih</th>
                <th className="px-6 py-4">Nama Peserta</th>
                <th className="px-6 py-4">Judul Pelatihan</th>
                <th className="px-6 py-4">Unit Kerja</th>
                <th className="px-6 py-4">Periode</th>
                <th className="px-6 py-4">Evaluasi Skor</th>
                <th className="px-6 py-4">Rekomendasi</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportRows.map((r) => {
                const row = r!;
                const isSelected = selectedIds.includes(row.partId);
                return (
                  <tr key={row.partId} className="hover:bg-secondary/40 transition">
                    <td className="px-6 py-4">
                      <button onClick={() => handleToggleSelectOne(row.partId)}>
                        {isSelected ? <CheckSquare className="h-4 w-4 text-brand-500" /> : <Square className="h-4 w-4 text-muted" />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{row.name}</div>
                      <div className="text-xs text-muted-foreground">{row.company} {row.position ? `(${row.position})` : ''}</div>
                    </td>
                    <td className="px-6 py-4 font-medium">{row.title}</td>
                    <td className="px-6 py-4">{row.unit}</td>
                    <td className="px-6 py-4">{row.period}</td>
                    <td className="px-6 py-4 font-semibold">{row.score}</td>
                    <td className="px-6 py-4 text-xs max-w-xs truncate">{row.recommendation}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                        row.realizationStatus === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : row.realizationStatus === 'Ongoing'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {row.realizationStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {reportRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-muted">Tidak ada data laporan pelatihan yang cocok.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </SectionContainer>
  );
}
