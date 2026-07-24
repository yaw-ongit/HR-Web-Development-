# Project Context: Enterprise HRIS Foundation

## Project Background
Enterprise HRIS Foundation is a comprehensive Human Resource Information System (HRIS) designed to streamline personnel tracking, workforce planning, talent acquisition, performance review, compensation/benefits management, and security logs.

## Business Context
Modern organizations require centralized platforms to handle employee lifecycles. This system integrates:
- Core Employee Records & Org Structure (People module)
- Recruitment & Learning Management (Talent module)
- Shift & Attendance tracking (Workforce module)
- Claims, Benefits & Payroll Ready data (Compensation module)
- Access Logs & Multi-factor configs (Identity module)
- System Workflows & Audit Logs (Administration module)
- Dashboard KPIs & interactive charts (Analytics module)

## Main Objective
Deliver a production-ready, highly interactive HRIS frontend dashboard, backed by a granular Supabase database service layer with robust mock-data fallback logic.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI & Styling**: Tailwind CSS, Tailwind Merge, Lucide React, Shadcn-like customized primitives (dialog, badge, card, data-table, etc.)
- **State & Tables**: TanStack Table v8, React 19
- **Data Visualizations**: Recharts v3
- **Backend & Auth**: Supabase (via `@supabase/ssr` and `@supabase/supabase-js`)
- **Language**: TypeScript

## Architecture Overview
- `/src/app`: Page components and routing using Next.js App Router.
- `/src/components`: UI primitives (badge, card, table, filters) and page-specific workspaces.
- `/src/lib`: Shared utilities, mockup data fallback constants, Supabase clients (`client.ts`, `server.ts`), and middleware.
- `/src/services`: Granular service layers (e.g., `peopleService.ts`, `talentService.ts`, `workforceService.ts`) providing unified interfaces to components.

## Important Decisions
- **Fallback Pattern**: Database calls utilize a `safeQuery` wrapper. If Supabase keys are missing or requests fail, the application falls back gracefully to high-quality mock data, ensuring offline usability.
- **Client Separation**: Separate browser-safe and server-only Supabase clients via `@supabase/ssr`.

## User Requirements & Constraints
- Keep page structures clean, organized, and highly interactive.
- Preserve existing Tailwind styling conventions.
- Maintain compatibility with Next.js 15 & React 19.
