'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Briefcase, BookOpen, CalendarDays, CheckCircle2, ClipboardList, HeartPulse, Mail, MapPin, Phone, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getEmployeeProfile } from '@/lib/people-data';

interface EmployeePageProps {
  params: {
    id: string;
  };
}

export default function EmployeeProfilePage({ params }: EmployeePageProps) {
  const profile = getEmployeeProfile(params.id);
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Employment', 'Attendance', 'Leave', 'Training', 'Medical', 'Benefits', 'Insurance', 'Claims', 'Welfare', 'Payroll', 'Documents', 'Timeline', 'Activity Log'];

  const stats = useMemo(
    () => [
      { label: 'Attendance rate', value: profile?.stats.attendanceRate ?? '—', icon: CalendarDays },
      { label: 'Remaining leave', value: profile?.stats.remainingLeave ?? '—', icon: CheckCircle2 },
      { label: 'Training completed', value: profile?.stats.trainingCompleted ?? '—', icon: BookOpen },
      { label: 'Benefits', value: profile?.stats.benefits ?? '—', icon: HeartPulse },
      { label: 'Years of service', value: profile?.stats.yearsOfService ?? '—', icon: Star },
      { label: 'Performance', value: profile?.stats.performance ?? '—', icon: ClipboardList },
    ],
    [profile],
  );

  if (!profile) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 text-slate-100">
        <div className="rounded-[28px] border border-white/10 bg-slate-900/90 p-10 text-center shadow-card">
          <p className="text-xl font-semibold">Employee not found</p>
          <p className="mt-3 text-sm text-slate-400">The requested employee profile does not exist in the People directory.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-[2rem] bg-slate-950/90 text-3xl font-semibold text-slate-100">
                {profile.photo}
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-semibold text-slate-100">{profile.fullName}</h1>
                  <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-400">{profile.status}</span>
                </div>
                <div className="grid gap-2 text-sm text-slate-400 sm:grid-cols-2 lg:grid-cols-3">
                  <p>{profile.employeeId}</p>
                  <p>{profile.department}</p>
                  <p>{profile.position}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <Mail className="h-4 w-4" /> Message
              </Button>
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <Phone className="h-4 w-4" /> Call
              </Button>
              <Button variant="primary" className="rounded-full px-5 py-3">
                <ArrowRight className="h-4 w-4" /> Edit profile
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Manager', value: profile.manager, icon: Users },
              { label: 'Branch', value: profile.branch, icon: MapPin },
              { label: 'Location', value: profile.location, icon: MapPin },
              { label: 'Email', value: profile.email, icon: Mail },
              { label: 'Phone', value: profile.phone, icon: Phone },
              { label: 'Contract', value: profile.contractType, icon: Briefcase },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-slate-950/80 p-5">
                <div className="flex items-center gap-3 text-slate-400">
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.3em]">{item.label}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-100">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="rounded-[28px] border border-white/10 bg-slate-900/95 p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-3xl bg-sky-500/15 text-sky-300">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-100">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Employee 360</p>
            <h2 className="text-2xl font-semibold text-slate-100">{activeTab}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab ? 'bg-sky-500 text-slate-950' : 'bg-slate-900/80 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Overview' && (
          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6">
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Summary</p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-100">Professional snapshot</h3>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-400">{profile.summary}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Work mode', value: profile.workMode },
                    { label: 'Hire date', value: profile.hireDate },
                    { label: 'Emergency contact', value: `${profile.emergencyContact.name} • ${profile.emergencyContact.relationship}` },
                    { label: 'Office', value: profile.location },
                  ].map((item) => (
                    <div key={item.label} className="rounded-3xl bg-slate-950/80 p-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                      <p className="mt-3 text-sm font-semibold text-slate-100">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Organization</p>
                <div className="mt-5 rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
                  <div className="space-y-4">
                    <div className="rounded-3xl bg-slate-900/90 p-4">
                      <p className="text-sm text-slate-400">Manager</p>
                      <p className="mt-2 text-base font-semibold text-slate-100">{profile.manager}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900/90 p-4">
                      <p className="text-sm text-slate-400">Department</p>
                      <p className="mt-2 text-base font-semibold text-slate-100">{profile.department}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Employment information</p>
                <div className="mt-5 grid gap-4">
                  {profile.employmentHistory.map((item) => (
                    <div key={item.period} className="rounded-3xl bg-slate-950/80 p-4">
                      <p className="text-sm text-slate-400">{item.period}</p>
                      <p className="mt-2 text-base font-semibold text-slate-100">{item.role}</p>
                      <p className="text-sm text-slate-500">{item.department} • {item.location}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Contract summary</p>
                <div className="mt-5 space-y-4">
                  <p className="text-sm text-slate-400">{profile.contractType} contract in place since {profile.hireDate}.</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {profile.leaveBalance.map((leave) => (
                      <div key={leave.type} className="rounded-3xl bg-slate-950/80 p-4">
                        <p className="text-sm text-slate-400">{leave.type}</p>
                        <p className="mt-2 text-base font-semibold text-slate-100">{leave.remaining} remaining</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab !== 'Overview' && (
          <section className="space-y-6">
            {activeTab === 'Employment' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Employment history</p>
                <div className="mt-6 space-y-4">
                  {profile.employmentHistory.map((item) => (
                    <div key={item.period} className="rounded-3xl bg-slate-950/80 p-5">
                      <p className="text-sm text-slate-400">{item.period}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-100">{item.role}</p>
                      <p className="text-sm text-slate-500">{item.department} • {item.location}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Attendance' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Attendance details</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm text-slate-400">Attendance rate</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-100">{profile.stats.attendanceRate}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm text-slate-400">Last review</p>
                    <p className="mt-3 text-xl font-semibold text-slate-100">April 2026</p>
                  </div>
                </div>
                <div className="mt-6 rounded-3xl bg-slate-950/80 p-5 text-sm text-slate-400">
                  Attendance is measured against the regional performance benchmark and includes remote site days.
                </div>
              </Card>
            )}

            {activeTab === 'Leave' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Leave balance</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {profile.leaveBalance.map((leave) => (
                    <div key={leave.type} className="rounded-3xl bg-slate-950/80 p-5">
                      <p className="text-sm text-slate-400">{leave.type}</p>
                      <p className="mt-3 text-xl font-semibold text-slate-100">{leave.remaining} days remaining</p>
                      <p className="text-sm text-slate-500">{leave.used} days used</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Training' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Training progress</p>
                <div className="mt-6 space-y-4">
                  {profile.trainingRecords.map((training) => (
                    <div key={training.title} className="rounded-3xl bg-slate-950/80 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-slate-100">{training.title}</p>
                          <p className="mt-2 text-sm text-slate-400">{training.status}</p>
                        </div>
                        <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">Due {training.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Medical' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Medical compliance</p>
                <div className="mt-6 space-y-4">
                  {profile.medicalRecords.map((record) => (
                    <div key={record.label} className="rounded-3xl bg-slate-950/80 p-5">
                      <p className="text-lg font-semibold text-slate-100">{record.label}</p>
                      <p className="mt-2 text-sm text-slate-400">Status: {record.status}</p>
                      <p className="mt-2 text-sm text-slate-500">Expires {record.expires}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Benefits' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Benefits overview</p>
                <div className="mt-6 space-y-4">
                  {profile.benefitSummary.map((benefit) => (
                    <div key={benefit.name} className="rounded-3xl bg-slate-950/80 p-5">
                      <p className="text-lg font-semibold text-slate-100">{benefit.name}</p>
                      <p className="mt-2 text-sm text-slate-400">{benefit.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Insurance' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Insurance policies</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-lg font-semibold text-slate-100">Health Insurance</p>
                    <p className="mt-2 text-sm text-slate-400">Active • PT Asuransi Kesehatan Indonesia</p>
                    <p className="mt-3 text-sm text-slate-500">Coverage: Self + Dependents • Expires: 2026-01-14</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-lg font-semibold text-slate-100">Life Insurance</p>
                    <p className="mt-2 text-sm text-slate-400">Active • PT Asuransi Jiwa Bersama</p>
                    <p className="mt-3 text-sm text-slate-500">Coverage: 500% annual salary • Expires: 2026-01-14</p>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'Claims' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Claims history</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-100">Medical - Hospitalization</p>
                        <p className="mt-2 text-sm text-slate-400">Rp 15.0M • May 2026</p>
                      </div>
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Approved</span>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-100">Medical - Preventive Care</p>
                        <p className="mt-2 text-sm text-slate-400">Rp 0.8M • June 2026</p>
                      </div>
                      <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Pending</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'Welfare' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Enrolled programs</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-lg font-semibold text-slate-100">Fitness & Wellness Program</p>
                    <p className="mt-2 text-sm text-slate-400">Active enrollment</p>
                    <p className="mt-3 text-sm text-slate-500">Gym membership & health monitoring via Elite Fitness Centers</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-lg font-semibold text-slate-100">Employee Meal Vouchers</p>
                    <p className="mt-2 text-sm text-slate-400">Active enrollment</p>
                    <p className="mt-3 text-sm text-slate-500">Daily meal vouchers at PT Indocater Catering for operational staff</p>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'Payroll' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Payroll configuration</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm text-slate-400">Basic Salary</p>
                    <p className="mt-3 text-xl font-semibold text-slate-100">Rp 12.0M</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm text-slate-400">Employment Type</p>
                    <p className="mt-3 text-xl font-semibold text-slate-100">Permanent</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm text-slate-400">Bank Account</p>
                    <p className="mt-3 text-xl font-semibold text-slate-100">1234567890</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm text-slate-400">Bank</p>
                    <p className="mt-3 text-xl font-semibold text-slate-100">Bank Mandiri</p>
                  </div>
                </div>
                <div className="mt-6 rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Payroll status</p>
                  <p className="mt-3 text-base font-semibold text-emerald-300">Ready for integration</p>
                </div>
              </Card>
            )}

            {activeTab === 'Documents' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Employee documents</p>
                <div className="mt-6 space-y-4">
                  {profile.documents.map((doc) => (
                    <div key={doc.title} className="rounded-3xl bg-slate-950/80 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-slate-100">{doc.title}</p>
                          <p className="mt-2 text-sm text-slate-400">{doc.category}</p>
                        </div>
                        <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">{doc.status}</span>
                      </div>
                      <p className="mt-3 text-sm text-slate-500">Added {doc.date}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Timeline' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Timeline</p>
                <div className="mt-6 space-y-4">
                  {profile.timeline.map((event) => (
                    <div key={event.date} className="rounded-3xl bg-slate-950/80 p-5">
                      <p className="text-sm font-semibold text-slate-100">{event.date}</p>
                      <p className="mt-2 text-base text-slate-200">{event.label}</p>
                      <p className="mt-1 text-sm text-slate-400">{event.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Activity Log' && (
              <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Activity log</p>
                <div className="mt-6 space-y-4">
                  {profile.activityLog.map((entry) => (
                    <div key={entry.time} className="rounded-3xl bg-slate-950/80 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-base font-semibold text-slate-100">{entry.description}</p>
                        <span className="text-sm text-slate-400">{entry.category}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{entry.time}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </section>
        )}
      </section>
    </div>
  );
}
