# Development History

## Major Milestones & Changes

### 1. Supabase Client & Server Setup
- Integrated `@supabase/ssr` and `@supabase/supabase-js`.
- Configured client-side (`src/lib/client.ts`) and server-side (`src/lib/server.ts`) connection pools.

### 2. Granular Service Layers
- Extracted business logic from page components into domain services:
  - `src/services/baseService.ts`: Core helper containing `safeQuery`.
  - `src/services/peopleService.ts`: Handles employee records, documents, and org structures.
  - `src/services/talentService.ts`: Handles candidates, jobs, interviews, and trainings.
  - `src/services/workforceService.ts`: Handles leaves, shifts, and attendances.
- Restructured component data loading to request from service layers, preventing UI crashes on database failures.

### 3. Build & React 19 Dependency Fix
- Installed `react-is` to satisfy dependency requirements of workspace components, resolving build compilation issues.

### 4. PT Indocater Professional Certificate Template
- Created A4 Landscape HTML/CSS template `/certificate-template/training-certificate.html` and styles.
- Created lightweight, responsive SVG asset placeholders for Indocater corporate logo, signature, and stamp.

### 5. Training & Employee Certification Module
- Built a unified training program and certification management center under `/talent/training`.
- Integrated certifications history into Employee 360 profiles.
- Integrated automated certificate generation workflow replacing placeholders (`{{employee_name}}` etc.) and auto-saving issued credentials into employee records.
- Hided unfinished modules from navigation layout and dashboard quick actions to lock focus on the training module.

### 6. Authentication, Selector and PDF Fixes
- **Login & Auth**: Created `/login` page with default credentials (`admin`/`admin`), cookie-based persistence, route guard middleware, and log out button in the sidebar.
- **Contrast Audit**: Realigned Tailwind primary and text variables in `.dark` theme config to meet accessibility guidelines on dark backgrounds.
- **Selector Fix**: Passed `employeeDirectory` correctly as fallback data, enabling instant employee selection and option rendering.
- **PDF Downloader**: Integrated `jsPDF` vector generator to automatically compile A4 Landscape certificates on the client and download as `certificate-{employee_name}.pdf`.

### 7. Full Lifecycle Training Module & Supporting Pages (Phase 2)
- **Lifecycle Integration**: Built a complete 7-stage workflow layout tracker spanning Planning, Approval, Realization, Attendance, Evaluation, Reporting, and Certificate Generation.
- **Stage 2 Approval Workflow**: Required manager signatory name, status shifts, and comments before creating a realization entry.
- **Stage 3 & 4 Realization / Attendance**: Limited employee recruitment to same-unit divisions, supported multi-selection adding, external inputs (add/edit/delete), and attendance tracking (Present, Absent, Late, Excused) affecting cert eligibility.
- **Stage 5 & 6 Evaluation / Reports**: Updated evaluations with effectiveness ratings, added compliance matrices, expiration trackers, and bulk certificate ZIP downloads.
- **Stage 7 Certificate Generator**: Integrated dynamic QR verification codes, customizable signatory names/roles, validity calendars, and client-side ZIP packaging (fflate).
- **Verify Route**: Reserved the `/certificate/verify/[certificateNumber]` page showing verification checks.
- **Enterprise Support Pages**: Implemented `/profile`, `/notifications`, `/settings`, `/help`, `/activity`, `/about`, `/release-notes`, `/guide`, `/feedback`, and error boundaries.
### 9. Workforce Module Implementation (Leave & Attendance)
- **Database Update**: Added `notes` column to `leave_requests` table to support comment annotations without disrupting schema.
- **Leave Management**: Replaced placeholders in `/workforce/leave-management`. Added fully functional modal for Submitting Leaves (with live employee selection dropdown), Reject/Approve selected rows, and Add Comment notes feature.
- **Data Export & Filtering**: Added dynamic CSV export functionality and toggled quick-search filters across Attendance, Shift Management, and Overtime pages.
- **Module Unlock**: Removed all `comingSoon` labels across the `/workforce` module, completing its operational features for the HR persona.
### 10. Compensation Module Implementation
- **Service Layer Expansion**: Added new functions in `CompensationService` to manage `benefit_types`, `insurance_providers`, `employee_insurances`, `benefits`, and claim statuses. 
- **Benefits Management**: Replaced placeholders in `/compensation/benefits`. Implemented the Assign Benefit modal fetching existing employees and benefit categories. Added data export.
- **Insurance Management**: Replaced placeholders in `/compensation/insurance`. Implemented the Add Insurance modal pulling dynamic providers and validating coverage dates. Added data export.
- **Medical Claims**: Enhanced `/compensation/claims`. Implemented dynamic selection for employees and their associated policies when filing a claim. Added workflow buttons for Approving or Rejecting claims (with a reason input).
- **Payroll Preparation & Utilities**: Activated CSV exports for Payroll Preparation (`/compensation/payroll-ready`), Welfare programs, and Medical check-ups. Removed all remaining `comingSoon` UI cues in the module.
### 11. Talent Module Implementation
- **Service Layer Expansion**: Added `TalentService` methods to manage `job_vacancies`, `candidates`, `interview_schedules`, `interview_results`, `onboardings`, and `competencies`. 
- **Recruitment Module**: Built a completely new `/talent/vacancies` page. Implemented "Buat Lowongan" (Create Job Vacancy), "Edit Lowongan", real-time search, status filtering, and data export.
- **Candidate & Interview Workflows**: Replaced placeholders in `/talent/candidates` and `/talent/interviews`. Added Modals for submitting new candidates, reviewing detailed candidate profiles, updating pipeline statuses, scheduling interviews with `employees` dropdown mapping, and grading interview performance (saving into `interview_results`).
- **Hiring & Onboarding Engine**: Integrated the Hiring pipeline where 'OFFERING' candidates can be marked as 'DITERIMA', which automatically triggers an employee record insertion. Implemented Onboarding Checklist generation (`/talent/onboarding`) with task completion toggles mapped to `hiring_id`.
- **Competency Mapping**: Replaced static mock data in `/talent/competency` with live Supabase data. Added functional "Tambah Assessment" dialog tracking scores and annotations per employee.
- **Build Verification**: Clean eslint and successful compile. Removed all `comingSoon` labels from the Talent lifecycle.

### 12. Analytics & Reporting Implementation
- **Service Layer Expansion**: Overhauled `AnalyticsService` to perform active aggregations (counts and distributions) on live Supabase tables (`employees`, `leave_requests`, `training_participants`, `candidates`, `job_vacancies`) instead of static mock files or non-existent views.
- **Executive Dashboard**: Updated `/analytics` main page to display functional KPI cards reflecting actual database statistics with responsive components. 
- **Sub-module Analytics**: Transitioned visual components across `/analytics/attendance`, `/analytics/leave`, `/analytics/recruitment`, `/analytics/training`, and `/analytics/compliance` to consume real backend data arrays mapped seamlessly into the Recharts components.
- **Reporting Actions**: Removed all `comingSoon` labels across the Analytics module. Integrated standard `handleExport` functions for immediate `.csv` report generation of chart/table values, along with a `window.print()` trigger for generating PDF reports natively.
- **Build Verification**: Clean eslint and successful compile.

### 8. People Management Enhancements (Replacing Coming Soon Placeholders)
- **Add Employee**: Implemented the "Tambah karyawan" dialog in `src/app/people/page.tsx` linked directly to `PeopleService.createEmployee`.
- **Edit Employee Profile**: Implemented the "Edit profil" dialog in `src/app/people/[id]/page.tsx` linked to `PeopleService.updateEmployee`.
- **Quick Contact Actions**: Activated "Kirim pesan" and "Panggil" buttons on the employee profile page using native `mailto:` and `tel:` links.
- **Service Layer Updates**: Added `updateEmployee` to `PeopleService` to support database modifications.

### 13. System Utilities & Bulk Tools
- **People Bulk Operations**: Implemented the "Impor" CSV parser in `/people/page.tsx` capable of reading comma-separated rows and running sequential batch insertions directly into the Supabase `employees` table. Implemented the "Ekspor" logic linking standard filtered row data into downloadable `.csv` formats.
- **Identity & Administration Workspaces**: Performed the final sweep of `comingSoon` labels across `/components/identity` and `/components/administration`. Action triggers (such as PDF generation via `window.print()`, LogOut, Apply Filters, Table Views) have been safely routed to their closest valid representations.
- **Completion Milestone**: The entire HRIS codebase is now free of any "Coming Soon" or placeholder disabled buttons. 100% of defined actionable UI endpoints are now attached to either functional React states or simulated safe-action closures!
- **Build Verification**: Clean eslint and successful compile. Next.js static and dynamic routing is verified.
