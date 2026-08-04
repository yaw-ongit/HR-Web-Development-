'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Plus, Upload, Download, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { PageHeader } from '@/components/ui/page-header';
import { FilterBar, SearchInput, SelectFilter } from '@/components/ui/filter-bar';
import { SectionContainer } from '@/components/layout/section-container';
import { NoKaryawansEmptyState } from '@/components/ui/empty-state';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { PeopleService } from '@/lib/services';
import {
  departmentOptions, positionOptions, statusOptions,
  contractOptions, branchOptions, locationOptions, genderOptions, KaryawanRecord,
} from '@/lib/people-data';

export default function PeopleDirectoryPage() {
  const [employees, setEmployees] = useState<KaryawanRecord[]>([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [position, setPosition] = useState('All');
  const [status, setStatus] = useState('All');
  const [contractType, setContractType] = useState('All');
  const [branch, setBranch] = useState('All');
  const [sorting, setSorting] = useState<any[]>([]);
  const [rowSelection, setRowSelection] = useState({});

  const { addToast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [refData, setRefData] = useState<any>(null);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    national_id_number: '',
    gender: 'L',
    marital_status: 'BELUM_KAWIN',
    birth_date: '1990-01-01',
    join_date: new Date().toISOString().split('T')[0],
    department_id: '',
    position_id: '',
    employment_type_id: ''
  });

  const loadData = () => {
    PeopleService.getEmployees().then((result) => {
      if (Array.isArray(result.data)) {
        setEmployees(result.data as unknown as KaryawanRecord[]);
      }
    });
  };

  useEffect(() => {
    loadData();
    PeopleService.getReferenceData().then(setRefData);
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refData) return;
    const payload = {
      ...form,
      employee_number: 'NIK-' + Math.floor(1000 + Math.random() * 9000),
      employee_status: 'AKTIF',
      company_id: refData.defaultComp,
      branch_id: refData.defaultBranch,
      business_unit_id: refData.defaultBu,
      division_id: refData.defaultDiv,
      section_id: refData.defaultSec,
      job_grade_id: refData.defaultJg
    };
    const { error } = await PeopleService.createEmployee(payload);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal menambah karyawan: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Karyawan baru berhasil ditambahkan!', variant: 'success' });
      setIsAddOpen(false);
      loadData();
    }
  };

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();
    return employees.filter((e) => {
      const matchSearch = !q || e.fullName.toLowerCase().includes(q) || e.employeeId.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.department.toLowerCase().includes(q);
      return matchSearch
        && (department === 'All' || e.department === department)
        && (position === 'All' || e.position === position)
        && (status === 'All' || e.status === status)
        && (contractType === 'All' || e.contractType === contractType)
        && (branch === 'All' || e.branch === branch);
    });
  }, [employees, search, department, position, status, contractType, branch]);

  const columns = useMemo<ColumnDef<KaryawanRecord>[]>(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <input type="checkbox" aria-label="Select all rows" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()}
          className="h-4 w-4 rounded border-slate-400 bg-secondary text-primary focus:ring-brand-500" />
      ),
      cell: ({ row }) => (
        <input type="checkbox" aria-label={`Select ${row.original.fullName}`} checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()}
          className="h-4 w-4 rounded border-slate-400 bg-secondary text-primary focus:ring-brand-500" />
      ),
    },
    {
      id: 'employee',
      accessorFn: (r) => r.fullName,
      header: 'Karyawan',
      enableSorting: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary" aria-hidden="true">
            {row.original.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{row.original.fullName}</p>
            <p className="text-xs text-muted">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    { accessorKey: 'employeeId', header: 'ID', enableSorting: true },
    { accessorKey: 'department', header: 'Departemen', enableSorting: true },
    { accessorKey: 'position', header: 'Jabatan', enableSorting: true },
    {
      accessorKey: 'status', header: 'Status', enableSorting: true,
      cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
    { accessorKey: 'joinDate', header: 'Tanggal bergabung', enableSorting: true },
    { accessorKey: 'contractType', header: 'Kontrak' },
    { accessorKey: 'manager', header: 'Manajer' },
    {
      id: 'actions', header: 'Aksi',
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Link href={`/people/${row.original.id}`}
            className="rounded-full border border-border bg-surface/90 px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500">
            Profil
          </Link>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: filteredData, columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    initialState: { pagination: { pageSize: 15 } },
  });

  const deptOptions = [{ value: 'All', label: 'Semua departemen' }, ...departmentOptions.map((o) => ({ value: o, label: o }))];
  const posOptions = [{ value: 'All', label: 'Semua jabatan' }, ...positionOptions.map((o) => ({ value: o, label: o }))];
  const stOptions = [{ value: 'All', label: 'Semua status' }, ...statusOptions.map((o) => ({ value: o, label: o }))];
  const ctOptions = [{ value: 'All', label: 'Semua kontrak' }, ...contractOptions.map((o) => ({ value: o, label: o }))];
  const brOptions = [{ value: 'All', label: 'Semua cabang' }, ...branchOptions.map((o) => ({ value: o, label: o }))];

  const handleExportTable = () => {
    const rows = table.getFilteredRowModel().rows;
    if (rows.length === 0) return;
    const headers = ['employeeId', 'fullName', 'email', 'department', 'position', 'status', 'joinDate', 'contractType', 'branch'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(header => `"${String(row.getValue(header) || (row.original as any)[header] || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'employee-directory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [importResults, setImportResults] = useState<{success: number, failed: number, errors: string[]}>({ success: 0, failed: 0, errors: [] });
  const [importPhase, setImportPhase] = useState<'upload' | 'preview' | 'result'>('upload');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportFile(file);
    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    if (lines.length > 1) {
      const rows = lines.slice(1).map(line => {
        const cols = line.split(',').map(s => s.replace(/"/g, '').trim());
        return {
          empId: cols[0] || '',
          fullName: cols[1] || '',
          email: cols[2] || '',
          department: cols[3] || '',
          position: cols[4] || '',
          unit: cols[5] || '',
          joinDate: cols[6] || '',
          status: cols[7] || 'Aktif',
          isValid: !!cols[1] && !!cols[2] && cols[2].includes('@'),
          error: (!cols[1] ? 'Nama kosong. ' : '') + (!cols[2] || !cols[2].includes('@') ? 'Email tidak valid.' : '')
        };
      });
      setParsedRows(rows);
      setImportPhase('preview');
    }
  };

  const handleImportSubmit = async () => {
    let successCount = 0;
    let failedCount = 0;
    let errors: string[] = [];
    
    for (const row of parsedRows) {
      if (!row.isValid) {
        failedCount++;
        errors.push(`Row (${row.fullName || 'Unknown'}): ${row.error}`);
        continue;
      }
      
      const payload = {
        employee_number: row.empId || ('NIK-' + Math.floor(1000 + Math.random() * 9000)),
        full_name: row.fullName,
        email: row.email,
        company_id: refData?.defaultComp || '10000000-0000-0000-0000-000000000001',
        branch_id: refData?.defaultBranch || '11000000-0000-0000-0000-000000000001',
        business_unit_id: refData?.defaultBu || '12000000-0000-0000-0000-000000000001',
        division_id: refData?.defaultDiv || '14000000-0000-0000-0000-000000000001',
        department_id: refData?.departments?.[0]?.id || '13000000-0000-0000-0000-000000000001',
        section_id: refData?.defaultSec || '16000000-0000-0000-0000-000000000001',
        position_id: refData?.positions?.[0]?.id || '15000000-0000-0000-0000-000000000001',
        job_grade_id: refData?.defaultJg || '17000000-0000-0000-0000-000000000001',
        employment_type_id: refData?.employmentTypes?.[0]?.id || '18000000-0000-0000-0000-000000000001',
        gender: 'Male',
        birth_date: '1990-01-01',
        national_id_number: '0000000000000000'
      };
      
      const { error } = await PeopleService.createEmployee(payload);
      if (error) {
        failedCount++;
        errors.push(`Row (${row.fullName}): ${error}`);
      } else {
        successCount++;
      }
    }
    
    setImportResults({ success: successCount, failed: failedCount, errors });
    setImportPhase('result');
    loadData();
  };

  return (
    <div className="space-y-6 py-6">
      <PageHeader
        breadcrumbs={[{ label: 'Data Karyawan', href: '/people' }, { label: 'Direktori' }]}
        title="Data Karyawan"
        description="Sumber utama profil karyawan, konteks organisasi, dan wawasan operasional."
        actions={
          <>
            <Button variant="primary" size="md" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsAddOpen(true)}>Tambah karyawan</Button>
            <Button variant="secondary" size="md" leftIcon={<Upload className="h-4 w-4" />} onClick={() => setIsImportOpen(true)}>Impor</Button>
            <Button variant="ghost" size="md" leftIcon={<Download className="h-4 w-4" />} onClick={handleExportTable}>Ekspor</Button>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <FilterBar>
            <SearchInput value={search} onChange={setSearch} placeholder="Cari nama, ID, email, departemen…" className="min-w-[260px] flex-1" label="Cari karyawan" />
            <SelectFilter label="Filter departemen" value={department} onChange={setDepartment} options={deptOptions} className="w-44" />
            <SelectFilter label="Filter jabatan" value={position} onChange={setPosition} options={posOptions} className="w-44" />
            <SelectFilter label="Filter status" value={status} onChange={setStatus} options={stOptions} className="w-40" />
            <SelectFilter label="Filter kontrak" value={contractType} onChange={setContractType} options={ctOptions} className="w-40" />
            <SelectFilter label="Filter cabang" value={branch} onChange={setBranch} options={brOptions} className="w-40" />
          </FilterBar>

          <SectionContainer title="Direktori karyawan" description={`Menampilkan ${filteredData.length} catatan`}>
            {filteredData.length === 0 ? (
              <NoKaryawansEmptyState onAdd={() => setIsAddOpen(true)} />
            ) : (
              <DataTable table={table} caption="Tabel direktori karyawan" />
            )}
          </SectionContainer>
        </div>

        {/* Sidebar summary */}
        <aside className="space-y-4" aria-label="Ringkasan modul People">
          <Card title="Area karyawan" description="Statistik singkat dan tindakan modul cepat.">
            <div className="mt-2 grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-card/80 p-4">
                <p className="text-xs text-muted">Total Karyawan</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{employees.length}</p>
              </div>
              <div className="rounded-2xl bg-card/80 p-4">
                <p className="text-xs text-muted">Cabang</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{branchOptions.length}</p>
              </div>
            </div>
          </Card>
          <Card title="Aksi modul">
            <nav aria-label="Tindakan area People">
              <ul className="space-y-2">
                {[
                  { label: 'Struktur organisasi', href: '/people/org-structure' },
                  { label: 'Pusat dokumen', href: '/people/documents' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="flex items-center justify-between rounded-2xl border border-border bg-surface/90 px-4 py-3 text-sm text-foreground transition hover:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500">
                      <span>{link.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Card>
        </aside>
      </div>
      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} title="Tambah Karyawan" description="Masukkan data karyawan baru.">
        <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Nama Lengkap</label>
              <input required type="text" value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Email</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Telepon</label>
              <input required type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Nomor KTP</label>
              <input required type="text" value={form.national_id_number} onChange={e => setForm({...form, national_id_number: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Departemen</label>
              <select required value={form.department_id} onChange={e => setForm({...form, department_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Departemen</option>
                {refData?.departments.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Jabatan</label>
              <select required value={form.position_id} onChange={e => setForm({...form, position_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Jabatan</option>
                {refData?.positions.map((p: any) => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Tipe Pegawai</label>
              <select required value={form.employment_type_id} onChange={e => setForm({...form, employment_type_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Tipe</option>
                {refData?.employmentTypes.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Simpan</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={isImportOpen} onClose={() => { setIsImportOpen(false); setImportPhase('upload'); setParsedRows([]); setImportFile(null); }} title="Impor Data Karyawan" description="Unggah file CSV untuk menambahkan data karyawan secara massal.">
        <div className="mt-4">
          {importPhase === 'upload' && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Pilih File (.csv)</label>
              <input required type="file" accept=".csv" onChange={handleFileChange} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              <p className="text-[10px] text-muted-foreground mt-2">Format yang diterima: ID, Nama Lengkap, Email, Departemen, Jabatan, Unit, Tanggal Gabung, Status</p>
            </div>
          )}
          
          {importPhase === 'preview' && (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              <p className="text-sm font-semibold">Preview Data ({parsedRows.length} baris)</p>
              <div className="space-y-2">
                {parsedRows.map((row, i) => (
                  <div key={i} className={`p-3 rounded-xl border text-sm ${row.isValid ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-rose-500/20 bg-rose-500/10'}`}>
                    <p className="font-semibold">{row.fullName || 'Tanpa Nama'} <span className="text-xs font-normal text-muted-foreground ml-2">{row.email}</span></p>
                    {!row.isValid && <p className="text-xs text-rose-500 mt-1">{row.error}</p>}
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="ghost" onClick={() => setImportPhase('upload')}>Kembali</Button>
                <Button variant="primary" onClick={handleImportSubmit}>Jalankan Impor</Button>
              </div>
            </div>
          )}

          {importPhase === 'result' && (
            <div className="space-y-3">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center">
                  <p className="text-3xl font-semibold text-emerald-500">{importResults.success}</p>
                  <p className="text-xs text-emerald-500 uppercase mt-1">Berhasil</p>
                </div>
                <div className="flex-1 bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-center">
                  <p className="text-3xl font-semibold text-rose-500">{importResults.failed}</p>
                  <p className="text-xs text-rose-500 uppercase mt-1">Gagal</p>
                </div>
              </div>
              {importResults.errors.length > 0 && (
                <div className="max-h-40 overflow-y-auto bg-card rounded-xl p-3 text-xs text-rose-400 space-y-1">
                  {importResults.errors.map((err, i) => <p key={i}>{err}</p>)}
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="primary" onClick={() => { setIsImportOpen(false); setImportPhase('upload'); }}>Selesai</Button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}
