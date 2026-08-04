'use client';
import { StatusBadge } from '@/components/ui/status-badge';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Award, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { TalentService } from '@/lib/services';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { employeeDirectory } from '@/lib/people-data';

export default function TalentCertificationPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { addToast } = useToast();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadEmployee, setUploadEmployee] = useState('');
  const [uploadCertType, setUploadCertType] = useState('');
  const [uploadIssuedDate, setUploadIssuedDate] = useState('');
  const [uploadExpiryDate, setUploadExpiryDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        addToast({ title: 'Error', description: 'Hanya file PDF yang diperbolehkan', variant: 'danger' });
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        addToast({ title: 'Error', description: 'Ukuran file maksimal 5MB', variant: 'danger' });
        e.target.value = '';
        return;
      }
      setUploadFile(file);
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadFile || !uploadEmployee || !uploadCertType || !uploadIssuedDate || !uploadExpiryDate) {
      addToast({ title: 'Error', description: 'Mohon lengkapi semua field', variant: 'danger' });
      return;
    }
    setIsUploading(true);
    try {
      const uploadRes = await TalentService.uploadCertificateDocument(uploadFile);
      if (uploadRes.error) {
        addToast({ title: 'Error', description: uploadRes.error, variant: 'danger' });
        setIsUploading(false);
        return;
      }

      const emp = employeeDirectory.find(e => e.id === uploadEmployee);
      
      const newCertData = {
        employee_id: emp?.employeeId || uploadEmployee,
        employee: emp?.fullName || uploadEmployee,
        certification: uploadCertType,
        category: 'Umum',
        issuer: 'External',
        credentialId: `EXT-${Date.now()}`,
        issuedDate: uploadIssuedDate,
        expiryDate: uploadExpiryDate,
        status: 'Aktif',
        document_url: uploadRes.data
      };

      const dbRes = await TalentService.createCertification(newCertData);
      if (dbRes.error) {
        addToast({ title: 'Error', description: typeof dbRes.error === 'string' ? dbRes.error : dbRes.error.message, variant: 'danger' });
      } else {
        addToast({ title: 'Sukses', description: 'Sertifikat berhasil diunggah', variant: 'success' });
        setIsUploadOpen(false);
        const listRes = await TalentService.getCertifications();
        if (listRes.data) setDataList(listRes.data);
      }
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', description: 'Terjadi kesalahan sistem', variant: 'danger' });
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    TalentService.getCertifications().then((result) => {
      if (result && Array.isArray(result.data)) {
        setDataList(result.data);
      }
    });
  }, []);

  const handleExportTable = () => {
    const rows = table.getFilteredRowModel().rows;
    if (rows.length === 0) return;
    const headers = ['employee', 'certification', 'category', 'issuer', 'issuedDate', 'expiryDate', 'status'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(header => `"${String(row.getValue(header) || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'certifications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCerts = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((cert) => {
      const matchesSearch =
        cert.employee.toLowerCase().includes(query) ||
        cert.certification.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || cert.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [dataList, search, status]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'employee', header: 'Karyawan' },
      { accessorKey: 'certification', header: 'Certification' },
      { accessorKey: 'issuer', header: 'Issuer' },
      { accessorKey: 'issuedDate', header: 'Issued date' },
      { accessorKey: 'expiryDate', header: 'Expiry date' },
      { accessorKey: 'credentialId', header: 'Credential ID' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
      },
      {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => (
          <div className="flex gap-2">
            {row.original.document_url && (
              <a href={row.original.document_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand-500">
                Lihat Sertifikat
              </a>
            )}
            <Link href="/talent/certification" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand-500">
              View <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredCerts,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const metrics = [
    { label: 'Sertifikat aktif', value: '156', subtext: 'Saat ini valid' },
    { label: 'Segera kedaluwarsa', value: '3', subtext: '90 hari ke depan' },
    { label: 'Kedaluwarsa', value: '1', subtext: 'Tindakan diperlukan' },
    { label: 'Tingkat perpanjangan', value: '92%', subtext: 'Historis' },
  ];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Talent / Sertifikasi</p>
            <h1 className="text-3xl font-semibold text-foreground">Manajemen sertifikasi</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Lacak sertifikasi karyawan, tanggal kedaluwarsa, dan kebutuhan perpanjangan.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setIsUploadOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-transparent bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
              <Award className="h-4 w-4" /> Upload Sertifikat
            </Button>
            <Link href="/talent" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-500">
              Kembali ke Talent
            </Link>
          </div>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item) => (
          <Card key={item.label} className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{item.value}</p>
            <p className="mt-2 text-sm text-muted">{item.subtext}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-3xl border border-amber-500/20 bg-amber-500/5 p-4">
            <AlertCircle className="h-5 w-5 mt-0.5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-200">Segera kedaluwarsa</p>
              <p className="text-sm text-amber-100 mt-1">Sertifikasi CSPO Zoe Kim kedaluwarsa pada 20-11-2026 (147 hari lagi).</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-3xl border border-rose-500/20 bg-rose-500/5 p-4">
            <AlertCircle className="h-5 w-5 mt-0.5 text-rose-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-rose-200">Kedaluwarsa</p>
              <p className="text-sm text-rose-100 mt-1">Sertifikat SHRM Maya Thompson kedaluwarsa pada 2026-05-10. Disarankan memperbarui.</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Certification table</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">All certifications</h2>
          </div>
            <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" className="rounded-full px-5 py-3" onClick={handleExportTable}>
              <Download className="h-4 w-4" /> Ekspor
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3" onClick={() => document.getElementById('search-cert')?.focus()}>
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="search-cert"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employee, certification, or issuer"
              className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">Semua status</option>
            <option value="Active">Aktif</option>
            <option value="Expiring">Segera Kedaluwarsa</option>
            <option value="Expired">Kedaluwarsa</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>

      <Dialog open={isUploadOpen} onClose={() => setIsUploadOpen(false)} title="Upload Sertifikat Baru">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-muted-foreground">Karyawan</label>
            <select value={uploadEmployee} onChange={e => setUploadEmployee(e.target.value)} className="w-full mt-1 rounded-xl border border-border p-2 bg-card text-foreground outline-none">
              <option value="">Pilih Karyawan</option>
              {employeeDirectory.map(e => (
                <option key={e.id} value={e.id}>{e.fullName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-muted-foreground">Jenis Sertifikasi</label>
            <select value={uploadCertType} onChange={e => setUploadCertType(e.target.value)} className="w-full mt-1 rounded-xl border border-border p-2 bg-card text-foreground outline-none">
              <option value="">Pilih Sertifikasi</option>
              <option value="AWS Certified Solutions Architect">AWS Certified Solutions Architect</option>
              <option value="Certified Scrum Product Owner">Certified Scrum Product Owner</option>
              <option value="SHRM Certified Professional">SHRM Certified Professional</option>
              <option value="Kubernetes Application Developer">Kubernetes Application Developer</option>
              <option value="Google Cloud Associate Cloud Engineer">Google Cloud Associate Cloud Engineer</option>
              <option value="ISO 9001:2015 Quality Lead Auditor">ISO 9001:2015 Quality Lead Auditor</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Tanggal Terbit</label>
              <input type="date" value={uploadIssuedDate} onChange={e => setUploadIssuedDate(e.target.value)} className="w-full mt-1 rounded-xl border border-border p-2 bg-card text-foreground outline-none" />
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Tanggal Berakhir</label>
              <input type="date" value={uploadExpiryDate} onChange={e => setUploadExpiryDate(e.target.value)} className="w-full mt-1 rounded-xl border border-border p-2 bg-card text-foreground outline-none" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-muted-foreground">Dokumen Sertifikat (PDF, maks 5MB)</label>
            <input type="file" accept=".pdf" onChange={handleFileChange} className="w-full mt-1 rounded-xl border border-border p-2 bg-card text-foreground outline-none" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" onClick={() => setIsUploadOpen(false)}>Batal</Button>
            <Button className="bg-brand-600 text-white" disabled={isUploading} onClick={handleUploadSubmit}>
              {isUploading ? 'Mengunggah...' : 'Upload'}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
