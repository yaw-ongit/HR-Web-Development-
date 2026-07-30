-- Seed Script for Enterprise HRIS (Indonesian Demo Data)
-- Dependency Order: companies > branches > business_units > divisions > departments > sections > job_grades > positions > employment_types > employees > ...

BEGIN;

-- 1. Foundation / Reference Data
INSERT INTO companies (id, code, name, legal_name) VALUES 
('c0000000-0000-0000-0000-000000000001', 'COMP01', 'Indocater', 'PT Indocater Nusantara')
ON CONFLICT DO NOTHING;

INSERT INTO branches (id, company_id, code, name, branch_type, is_remote_site) VALUES
('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'JKT-HQ', 'Jakarta Pusat', 'HEAD_OFFICE', false),
('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'SBY-BR', 'Surabaya', 'BRANCH', false)
ON CONFLICT DO NOTHING;

INSERT INTO business_units (id, company_id, code, name) VALUES
('bu000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'BU-CORP', 'Corporate')
ON CONFLICT DO NOTHING;

INSERT INTO divisions (id, business_unit_id, code, name) VALUES
('d0000000-0000-0000-0000-000000000001', 'bu000000-0000-0000-0000-000000000001', 'DIV-HR', 'Human Resources')
ON CONFLICT DO NOTHING;

INSERT INTO departments (id, branch_id, division_id, code, name) VALUES
('dept0000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'D-SDM', 'Sumber Daya Manusia'),
('dept0000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'D-TI', 'Teknologi Informasi')
ON CONFLICT DO NOTHING;

INSERT INTO sections (id, department_id, code, name) VALUES
('sec00000-0000-0000-0000-000000000001', 'dept0000-0000-0000-0000-000000000001', 'SEC-REC', 'Rekrutmen')
ON CONFLICT DO NOTHING;

INSERT INTO job_grades (id, code, name, level_order, base_salary_min, base_salary_max) VALUES
('jg000000-0000-0000-0000-000000000001', 'JG-1', 'Staff', 1, 5000000, 10000000),
('jg000000-0000-0000-0000-000000000002', 'JG-2', 'Manager', 2, 15000000, 30000000)
ON CONFLICT DO NOTHING;

INSERT INTO positions (id, department_id, section_id, job_grade_id, code, title, is_managerial) VALUES
('pos00000-0000-0000-0000-000000000001', 'dept0000-0000-0000-0000-000000000001', 'sec00000-0000-0000-0000-000000000001', 'jg000000-0000-0000-0000-000000000002', 'P-HRM', 'HR Manager', true),
('pos00000-0000-0000-0000-000000000002', 'dept0000-0000-0000-0000-000000000002', 'sec00000-0000-0000-0000-000000000001', 'jg000000-0000-0000-0000-000000000001', 'P-SDE', 'Software Engineer', false)
ON CONFLICT DO NOTHING;

INSERT INTO employment_types (id, code, name, is_permanent) VALUES
('et000000-0000-0000-0000-000000000001', 'ET-TETAP', 'Tetap', true),
('et000000-0000-0000-0000-000000000002', 'ET-KONTRAK', 'Kontrak', false)
ON CONFLICT DO NOTHING;

INSERT INTO leave_types (id, code, name, default_days_per_year, is_paid, requires_document) VALUES
('lt000000-0000-0000-0000-000000000001', 'LT-TAHUNAN', 'Cuti Tahunan', 12, true, false),
('lt000000-0000-0000-0000-000000000002', 'LT-SAKIT', 'Cuti Sakit', 14, true, true)
ON CONFLICT DO NOTHING;

-- 2. Employee Data
INSERT INTO employees (id, company_id, branch_id, business_unit_id, division_id, department_id, employment_type_id, position_id, employee_number, full_name, email, birth_date, employee_status, hire_date) VALUES
('emp00000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'bu000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'dept0000-0000-0000-0000-000000000001', 'et000000-0000-0000-0000-000000000001', 'pos00000-0000-0000-0000-000000000001', 'NIK-001', 'Budi Santoso', 'budi.santoso@indocater.co.id', '1985-05-15', 'AKTIF', '2015-01-10'),
('emp00000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'bu000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'dept0000-0000-0000-0000-000000000002', 'et000000-0000-0000-0000-000000000001', 'pos00000-0000-0000-0000-000000000002', 'NIK-002', 'Siti Rahmawati', 'siti.rahmawati@indocater.co.id', '1992-08-22', 'AKTIF', '2020-03-01'),
('emp00000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'bu000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'dept0000-0000-0000-0000-000000000002', 'et000000-0000-0000-0000-000000000002', 'pos00000-0000-0000-0000-000000000002', 'NIK-003', 'Agus Pratama', 'agus.pratama@indocater.co.id', '1995-12-10', 'AKTIF', '2022-07-15')
ON CONFLICT DO NOTHING;

-- 3. Leave Requests
INSERT INTO leave_requests (id, employee_id, leave_type_id, start_date, end_date, total_days, reason, status) VALUES
('lr000000-0000-0000-0000-000000000001', 'emp00000-0000-0000-0000-000000000002', 'lt000000-0000-0000-0000-000000000001', '2026-08-10', '2026-08-12', 3, 'Menghadiri acara keluarga di Bandung', 'DISETUJUI'),
('lr000000-0000-0000-0000-000000000002', 'emp00000-0000-0000-0000-000000000003', 'lt000000-0000-0000-0000-000000000002', '2026-07-28', '2026-07-29', 2, 'Pemulihan pasca sakit demam berdarah', 'MENUNGGU')
ON CONFLICT DO NOTHING;

COMMIT;
