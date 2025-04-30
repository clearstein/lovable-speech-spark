
import { supabase } from "@/integrations/supabase/client";
import { Exercise, ExerciseCategory, ExerciseAssignment, ExerciseProgress } from "@/types/exercise";

export async function getExerciseCategories(): Promise<ExerciseCategory[]> {
  const { data, error } = await supabase
    .from('exercise_categories')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data || [];
}

export async function getExercises(): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from('exercises')
    .select('*, exercise_categories(*)')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function getExerciseById(id: string): Promise<Exercise | null> {
  const { data, error } = await supabase
    .from('exercises')
    .select('*, exercise_categories(*)')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createExercise(exercise: Partial<Exercise>): Promise<Exercise> {
  const { data, error } = await supabase
    .from('exercises')
    .insert([exercise])
    .select('*, exercise_categories(*)');
  
  if (error) throw error;
  return data[0];
}

export async function updateExercise(id: string, exercise: Partial<Exercise>): Promise<Exercise> {
  const { data, error } = await supabase
    .from('exercises')
    .update(exercise)
    .eq('id', id)
    .select('*, exercise_categories(*)');
  
  if (error) throw error;
  return data[0];
}

export async function deleteExercise(id: string): Promise<void> {
  const { error } = await supabase
    .from('exercises')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function getAssignments(patientId?: string): Promise<ExerciseAssignment[]> {
  let query = supabase
    .from('exercise_assignments')
    .select('*, exercises(*), patient_profiles(*), therapist_profiles(*)')
    .order('created_at', { ascending: false });
  
  if (patientId) {
    query = query.eq('patient_id', patientId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
}

export async function createAssignment(assignment: Partial<ExerciseAssignment>): Promise<ExerciseAssignment> {
  const { data, error } = await supabase
    .from('exercise_assignments')
    .insert([assignment])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function getProgressForPatient(patientId: string): Promise<ExerciseProgress[]> {
  const { data, error } = await supabase
    .from('exercise_progress')
    .select('*, exercises(*)')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function saveExerciseProgress(progress: Partial<ExerciseProgress>): Promise<ExerciseProgress> {
  const { data, error } = await supabase
    .from('exercise_progress')
    .insert([progress])
    .select();
  
  if (error) throw error;
  return data[0];
}
