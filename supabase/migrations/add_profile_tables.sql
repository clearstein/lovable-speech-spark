
-- Create therapist_profiles table
CREATE TABLE IF NOT EXISTS public.therapist_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  license TEXT,
  specialty TEXT,
  bio TEXT,
  avatar TEXT,
  license_tier TEXT DEFAULT 'basic',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patient_profiles table
CREATE TABLE IF NOT EXISTS public.patient_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date_of_birth DATE,
  therapist_id UUID REFERENCES auth.users(id),
  avatar TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on these tables
ALTER TABLE public.therapist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for therapist_profiles
CREATE POLICY "Allow admins to manage therapist profiles"
ON public.therapist_profiles
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles AS ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

CREATE POLICY "Allow therapists to read their own profile"
ON public.therapist_profiles
FOR SELECT 
TO authenticated 
USING (
  auth.uid() = id OR
  EXISTS (
    SELECT 1 FROM public.user_roles AS ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Create policies for patient_profiles
CREATE POLICY "Allow admins to manage patient profiles"
ON public.patient_profiles
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles AS ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

CREATE POLICY "Allow therapists to manage their patients"
ON public.patient_profiles
FOR ALL 
TO authenticated 
USING (
  therapist_id = auth.uid()
);

CREATE POLICY "Allow patients to read their own profile"
ON public.patient_profiles
FOR SELECT 
TO authenticated 
USING (
  id = auth.uid()
);

-- Insert some sample data for testing
INSERT INTO public.therapist_profiles (id, name, license, specialty, bio, license_tier, active)
VALUES
  ('2', 'Dr. Emma Johnson', 'SLP12345', 'Pediatric Speech', 'Experienced speech therapist specializing in childhood language development', 'premium', true),
  ('00000000-0000-0000-0000-000000000001', 'Dr. Michael Brown', 'SLP56789', 'Fluency Disorders', 'Expert in stuttering and cluttering therapies', 'basic', true),
  ('00000000-0000-0000-0000-000000000002', 'Sarah Williams', 'SLP98765', 'Articulation Disorders', 'Specialist in phonological disorders and articulation therapy', 'premium', true);

INSERT INTO public.patient_profiles (id, name, date_of_birth, therapist_id, notes)
VALUES
  ('3', 'Alex Smith', '2015-06-12', '2', 'Working on /r/ and /s/ sounds'),
  ('00000000-0000-0000-0000-000000000003', 'Jamie Davis', '2018-03-22', '2', 'Language delay, improving vocabulary skills'),
  ('00000000-0000-0000-0000-000000000004', 'Sophia Chen', '2016-11-05', '00000000-0000-0000-0000-000000000001', 'Stuttering treatment'),
  ('00000000-0000-0000-0000-000000000005', 'Ryan Johnson', '2017-08-17', '00000000-0000-0000-0000-000000000002', 'Articulation therapy');
