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
