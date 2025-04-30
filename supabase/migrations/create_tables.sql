
-- Create types
CREATE TYPE user_role AS ENUM ('admin', 'therapist', 'patient');

-- Create user_roles table to store user roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read roles
CREATE POLICY "Allow authenticated users to read roles" 
ON public.user_roles
FOR SELECT 
TO authenticated 
USING (true);

-- Create policy for admins to manage roles
CREATE POLICY "Allow admins to manage roles" 
ON public.user_roles
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles AS ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Create exercises table
CREATE TABLE IF NOT EXISTS public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS on exercises
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage exercises
CREATE POLICY "Allow admins to manage exercises" 
ON public.exercises
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles AS ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Create policy for therapists to read exercises
CREATE POLICY "Allow therapists to read exercises" 
ON public.exercises
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles AS ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'therapist'
  )
);

-- Create policy for patients to read exercises
CREATE POLICY "Allow patients to read exercises" 
ON public.exercises
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles AS ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'patient'
  )
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on activity_logs
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to read all activity logs
CREATE POLICY "Allow admins to read all activity logs" 
ON public.activity_logs
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles AS ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

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

-- Enable RLS on therapist_profiles
ALTER TABLE public.therapist_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage therapist profiles
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

-- Create policy for therapists to read their own profile
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

-- Enable RLS on patient_profiles
ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage patient profiles
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

-- Create policy for therapists to manage their patients
CREATE POLICY "Allow therapists to manage their patients" 
ON public.patient_profiles
FOR ALL 
TO authenticated 
USING (
  therapist_id = auth.uid()
);

-- Create policy for patients to read their own profile
CREATE POLICY "Allow patients to read their own profile" 
ON public.patient_profiles
FOR SELECT 
TO authenticated 
USING (
  id = auth.uid()
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  therapist_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on sessions
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage sessions
CREATE POLICY "Allow admins to manage sessions" 
ON public.sessions
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles AS ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Create policy for therapists to manage their sessions
CREATE POLICY "Allow therapists to manage their sessions" 
ON public.sessions
FOR ALL 
TO authenticated 
USING (
  therapist_id = auth.uid()
);

-- Create policy for patients to read their sessions
CREATE POLICY "Allow patients to read their sessions" 
ON public.sessions
FOR SELECT 
TO authenticated 
USING (
  patient_id = auth.uid()
);

-- Create stored procedure for setting user role
CREATE OR REPLACE FUNCTION public.set_user_role(user_id UUID, role TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE auth.users
  SET raw_app_meta_data = 
    COALESCE(raw_app_meta_data, '{}'::jsonb) || json_build_object('role', role)::jsonb
  WHERE id = user_id;
  
  -- Insert or update the user_roles table
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_id, role::user_role)
  ON CONFLICT (user_id, role::user_role)
  DO NOTHING;
END;
$$;

-- Create function to log activity
CREATE OR REPLACE FUNCTION public.log_activity(
  user_id UUID,
  action TEXT,
  details JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.activity_logs (user_id, action, details)
  VALUES (user_id, action, details);
END;
$$;

-- Create trigger to log exercise changes
CREATE OR REPLACE FUNCTION public.handle_exercise_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  action_type TEXT;
  user_id UUID;
BEGIN
  user_id := auth.uid();
  
  IF TG_OP = 'INSERT' THEN
    action_type := 'created';
    PERFORM public.log_activity(user_id, 'exercise_created', json_build_object('exercise_id', NEW.id, 'title', NEW.title));
  ELSIF TG_OP = 'UPDATE' THEN
    action_type := 'updated';
    PERFORM public.log_activity(user_id, 'exercise_updated', json_build_object('exercise_id', NEW.id, 'title', NEW.title));
  ELSIF TG_OP = 'DELETE' THEN
    action_type := 'deleted';
    PERFORM public.log_activity(user_id, 'exercise_deleted', json_build_object('exercise_id', OLD.id, 'title', OLD.title));
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER log_exercise_changes
AFTER INSERT OR UPDATE OR DELETE ON public.exercises
FOR EACH ROW EXECUTE PROCEDURE public.handle_exercise_change();
