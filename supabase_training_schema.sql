-- SQL schema for Enterprise HRIS Training Module Lifecycle
-- PT Indocater

-- 1. Training Planning (Proposals)
CREATE TABLE IF NOT EXISTS training_plannings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  unit TEXT NOT NULL,
  location TEXT,
  start_date DATE,
  start_time TIME,
  training_type TEXT NOT NULL, -- e.g., 'Internal Training', 'External Training', 'Compliance', etc.
  provider TEXT,
  trainer TEXT,
  cost NUMERIC DEFAULT 0,
  notes TEXT,
  period TEXT NOT NULL, -- e.g., '2026-Q1', '2026-Q2', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE training_plannings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_plannings" 
  ON training_plannings TO authenticated USING (true) WITH CHECK (true);

-- 2. Training Realization (Executions)
CREATE TABLE IF NOT EXISTS training_realizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  planning_id UUID REFERENCES training_plannings(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Draft', -- Draft, Ongoing, Completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE training_realizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_realizations" 
  ON training_realizations TO authenticated USING (true) WITH CHECK (true);

-- 3. Training Participants (Belongs ONLY to Realization)
CREATE TABLE IF NOT EXISTS training_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  realization_id UUID REFERENCES training_realizations(id) ON DELETE CASCADE NOT NULL,
  employee_id TEXT, -- Optional, null if external/other participant
  employee_name TEXT NOT NULL,
  employee_email TEXT,
  company TEXT DEFAULT 'PT Indocater', -- Company name for external participants
  position TEXT, -- Position name
  is_external BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE training_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_participants" 
  ON training_participants TO authenticated USING (true) WITH CHECK (true);

-- 4. Training Evaluations (Belongs to Completed Realizations)
CREATE TABLE IF NOT EXISTS training_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  realization_id UUID REFERENCES training_realizations(id) ON DELETE CASCADE NOT NULL,
  score NUMERIC NOT NULL,
  notes TEXT,
  recommendation TEXT,
  document_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE training_evaluations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_evaluations" 
  ON training_evaluations TO authenticated USING (true) WITH CHECK (true);

-- 5. Training Certificates (Belongs to Participant in a Realization)
CREATE TABLE IF NOT EXISTS training_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  realization_id UUID REFERENCES training_realizations(id) ON DELETE CASCADE NOT NULL,
  participant_id UUID REFERENCES training_participants(id) ON DELETE CASCADE NOT NULL,
  certificate_number TEXT NOT NULL UNIQUE,
  issued_date DATE NOT NULL,
  document_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE training_certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users full access to training_certificates" 
  ON training_certificates TO authenticated USING (true) WITH CHECK (true);
