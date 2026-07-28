-- SQL schema for Enterprise HRIS Training Module Lifecycle (Phase 2)
-- PT Indocater

-- 1. Training Planning (Proposals)
CREATE TABLE IF NOT EXISTS training_plannings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  planning_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  unit TEXT NOT NULL,
  location TEXT,
  start_date DATE,
  start_time TIME,
  training_type TEXT NOT NULL, -- Safety, Food Safety, HRD, Quality, Technical, Leadership, ISO, Internal, External, Compliance, Other
  provider TEXT,
  trainer TEXT,
  cost NUMERIC DEFAULT 0,
  notes TEXT,
  period TEXT NOT NULL, -- e.g., '2026-Q1', '2026-Q2', etc.
  status TEXT NOT NULL DEFAULT 'Draft', -- Draft, Submitted, Approved, Rejected, Scheduled
  is_archived BOOLEAN DEFAULT false,
  is_cancelled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE training_plannings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_plannings" 
  ON training_plannings TO authenticated USING (true) WITH CHECK (true);

-- 2. Training Approval
CREATE TABLE IF NOT EXISTS training_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  planning_id UUID REFERENCES training_plannings(id) ON DELETE CASCADE NOT NULL,
  approval_status TEXT NOT NULL DEFAULT 'Pending', -- Pending, Approved, Rejected
  approver TEXT,
  approval_date TIMESTAMP WITH TIME ZONE,
  approval_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE training_approvals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_approvals" 
  ON training_approvals TO authenticated USING (true) WITH CHECK (true);

-- 3. Training Realization (Executions)
CREATE TABLE IF NOT EXISTS training_realizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  planning_id UUID REFERENCES training_plannings(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Draft', -- Draft, Ongoing, Completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE training_realizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_realizations" 
  ON training_realizations TO authenticated USING (true) WITH CHECK (true);

-- 4. Training Participants
CREATE TABLE IF NOT EXISTS training_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  realization_id UUID REFERENCES training_realizations(id) ON DELETE CASCADE NOT NULL,
  employee_id TEXT, -- Null if external/other participant
  employee_name TEXT NOT NULL,
  employee_email TEXT,
  company TEXT DEFAULT 'PT Indocater',
  position TEXT,
  is_external BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE training_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_participants" 
  ON training_participants TO authenticated USING (true) WITH CHECK (true);

-- 5. Participant Attendance
CREATE TABLE IF NOT EXISTS training_attendances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES training_participants(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Absent', -- Present, Absent, Late, Excused
  attendance_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE training_attendances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_attendances" 
  ON training_attendances TO authenticated USING (true) WITH CHECK (true);

-- 6. Training Evaluation
CREATE TABLE IF NOT EXISTS training_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  realization_id UUID REFERENCES training_realizations(id) ON DELETE CASCADE NOT NULL,
  score NUMERIC NOT NULL, -- Overall Score
  effectiveness TEXT, -- Training Effectiveness (Sangat Efektif, Efektif, Cukup, Kurang)
  notes TEXT,
  recommendation TEXT,
  document_url TEXT,
  evaluation_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE training_evaluations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_evaluations" 
  ON training_evaluations TO authenticated USING (true) WITH CHECK (true);

-- 7. Training Certificates
CREATE TABLE IF NOT EXISTS training_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  realization_id UUID REFERENCES training_realizations(id) ON DELETE CASCADE NOT NULL,
  participant_id UUID REFERENCES training_participants(id) ON DELETE CASCADE NOT NULL,
  certificate_number TEXT NOT NULL UNIQUE,
  issued_date DATE NOT NULL,
  expiration_date DATE,
  status TEXT NOT NULL DEFAULT 'Valid', -- Valid, Expiring Soon, Expired
  qr_code_url TEXT,
  signature_manager_url TEXT,
  signature_hr_url TEXT,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE training_certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_certificates" 
  ON training_certificates TO authenticated USING (true) WITH CHECK (true);

-- 8. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL, -- Training, Certificate, System, Announcement
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to notifications" 
  ON notifications TO authenticated USING (true) WITH CHECK (true);

-- 9. Activity Log
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  status TEXT NOT NULL, -- Success, Failed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to activity_logs" 
  ON activity_logs TO authenticated USING (true) WITH CHECK (true);

-- 10. Feedback
CREATE TABLE IF NOT EXISTS user_feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- Suggestion, Bug Report, Feature Request
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'Medium', -- Low, Medium, High
  attachment_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE user_feedbacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to user_feedbacks" 
  ON user_feedbacks TO authenticated USING (true) WITH CHECK (true);
