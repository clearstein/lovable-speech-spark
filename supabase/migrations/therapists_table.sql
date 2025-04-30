
-- Create table for therapists
CREATE TABLE IF NOT EXISTS public.therapists (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  license TEXT,
  specialty TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) on the therapists table
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Admins can view all therapists
CREATE POLICY "Admins can view therapists" 
ON public.therapists FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id AND raw_app_meta_data->>'role' = 'admin'
  )
);

-- Admins can insert therapists
CREATE POLICY "Admins can create therapists" 
ON public.therapists FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id AND raw_app_meta_data->>'role' = 'admin'
  )
);

-- Admins can update therapists
CREATE POLICY "Admins can update therapists" 
ON public.therapists FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id AND raw_app_meta_data->>'role' = 'admin'
  )
);

-- Admins can delete therapists
CREATE POLICY "Admins can delete therapists" 
ON public.therapists FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id AND raw_app_meta_data->>'role' = 'admin'
  )
);
