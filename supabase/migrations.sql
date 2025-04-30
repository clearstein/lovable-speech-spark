
-- This file contains the combined SQL migrations that need to be run
-- Contents from update_rls_policies.sql:

-- Ensure therapist table has correct RLS policies
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (if any) to avoid conflicts
DROP POLICY IF EXISTS "Admins can view therapists" ON public.therapists;
DROP POLICY IF EXISTS "Admins can create therapists" ON public.therapists;
DROP POLICY IF EXISTS "Admins can update therapists" ON public.therapists;
DROP POLICY IF EXISTS "Admins can delete therapists" ON public.therapists;

-- Create RLS policies
-- Admins can view all therapists
CREATE POLICY "Admins can view therapists" 
ON public.therapists FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND raw_app_meta_data->>'role' = 'admin'
  )
);

-- Admins can insert therapists
CREATE POLICY "Admins can create therapists" 
ON public.therapists FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND raw_app_meta_data->>'role' = 'admin'
  )
);

-- Admins can update therapists
CREATE POLICY "Admins can update therapists" 
ON public.therapists FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND raw_app_meta_data->>'role' = 'admin'
  )
);

-- Admins can delete therapists
CREATE POLICY "Admins can delete therapists" 
ON public.therapists FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND raw_app_meta_data->>'role' = 'admin'
  )
);

-- Therapists can view their own profile
CREATE POLICY "Therapists can view own profile" 
ON public.therapists FOR SELECT 
USING (
  auth.uid() = id
);
