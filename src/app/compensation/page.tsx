'use client';

import Link from 'next/link';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Shield, Heart, FileText, TrendingUp, AlertCircle, Download, Plus, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { compensationKpi, benefitDistributionData, insuranceCoverageData, medicalComplianceData, claimTrendData, departmentComparisonData } from '@/lib/compensation-data';

export default function CompensationDashboard() {
  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Core Modules</p>
            <h1 className="text-3xl font-semibold text-slate-900">Compensation & Services</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Manage employee benefits, insurance, medical records, welfare programs, and payroll readiness across the organization.
            </p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-500">
            Back to dashboard
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Employees Covered</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{compensationKpi.employeesCovered}</p>
              <p className="mt-2 text-sm text-emerald-600">↑ 12 this month</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Active Insurance</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{compensationKpi.activeInsurance}</p>
              <p className="mt-2 text-sm text-slate-400">Policies active</p>
            </div>
            <Shield className="h-8 w-8 text-emerald-600" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Medical Due</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{compensationKpi.medicalDue}</p>
              <p className="mt-2 text-sm text-amber-600">Next 30 days</p>
            </div>
            <Heart className="h-8 w-8 text-amber-600" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Claims Pending</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{compensationKpi.claimsPending}</p>
              <p className="mt-2 text-sm text-blue-600">Awaiting approval</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Benefit Utilization</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{compensationKpi.benefitUtilization}%</p>
              <p className="mt-2 text-sm text-emerald-600">Of eligible benefits</p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-600" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Certs Expiring</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{compensationKpi.certificatesExpiring}</p>
              <p className="mt-2 text-sm text-rose-600">In next 60 days</p>
            </div>
            <AlertCircle className="h-8 w-8 text-rose-600" />
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/compensation/benefits" className="group">
          <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-5 shadow-card transition group-hover:border-blue-500 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-slate-900">Quick Actions</p>
              <span className="text-xs text-blue-600">→</span>
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50/50 hover:text-blue-600">
                <Plus className="h-4 w-4" /> Assign Benefit
              </button>
              <button className="w-full flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50/50 hover:text-blue-600">
                <FileText className="h-4 w-4" /> Submit Claim
              </button>
              <button className="w-full flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50/50 hover:text-blue-600">
                <Clock className="h-4 w-4" /> Schedule Medical
              </button>
              <button className="w-full flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50/50 hover:text-blue-600">
                <Download className="h-4 w-4" /> Export Benefits
              </button>
            </div>
          </Card>
        </Link>

        <div className="grid gap-4">
          <Link href="/compensation/benefits" className="group">
            <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-5 shadow-card transition group-hover:border-blue-500 cursor-pointer">
              <p className="text-sm font-semibold text-slate-900 mb-3">Modules</p>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/compensation/benefits" className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-blue-50/50 hover:text-blue-600">
                  Benefits
                </Link>
                <Link href="/compensation/insurance" className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-blue-50/50 hover:text-blue-600">
                  Insurance
                </Link>
                <Link href="/compensation/medical" className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-blue-50/50 hover:text-blue-600">
                  Medical
                </Link>
                <Link href="/compensation/claims" className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-blue-50/50 hover:text-blue-600">
                  Claims
                </Link>
                <Link href="/compensation/welfare" className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-blue-50/50 hover:text-blue-600">
                  Welfare
                </Link>
                <Link href="/compensation/payroll-ready" className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-blue-50/50 hover:text-blue-600">
                  Payroll
                </Link>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Analytics</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">Benefit Distribution</h2>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={benefitDistributionData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {benefitDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Analytics</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">Insurance Coverage</h2>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insuranceCoverageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #64748b' }} />
                <Legend />
                <Bar dataKey="active" fill="#10b981" name="Active" />
                <Bar dataKey="expired" fill="#ef4444" name="Expired" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Analytics</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">Medical Compliance Trend</h2>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={medicalComplianceData}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOverdue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #64748b' }} />
                <Legend />
                <Area type="monotone" dataKey="completed" stroke="#10b981" fillOpacity={1} fill="url(#colorCompleted)" name="Completed" />
                <Area type="monotone" dataKey="overdue" stroke="#ef4444" fillOpacity={1} fill="url(#colorOverdue)" name="Overdue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Analytics</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">Claim Trend Analysis</h2>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={claimTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #64748b' }} />
                <Legend />
                <Line type="monotone" dataKey="submitted" stroke="#0ea5e9" strokeWidth={2} name="Submitted" />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} name="Approved" />
                <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} name="Rejected" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Analytics</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">Department Comparison</h2>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="department" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #64748b' }} />
              <Legend />
              <Bar dataKey="employees" fill="#0ea5e9" name="Employees" />
              <Bar dataKey="coverage" fill="#10b981" name="Coverage %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
