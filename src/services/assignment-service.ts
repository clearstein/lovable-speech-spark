
import { supabase } from "@/integrations/supabase/client";
import { Assignment, ExerciseResult } from "@/types/app";

export async function getPatientAssignments(patientId: string): Promise<Assignment[]> {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('*, exercises(*)')
      .eq('patient_id', patientId)
      .eq('active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching patient assignments:", error);
      return [];
    }
    
    return data as unknown as Assignment[];
  } catch (error) {
    console.error("Exception fetching patient assignments:", error);
    return [];
  }
}

export async function assignExercisesToPatient(patientId: string, exerciseIds: number[]): Promise<Assignment[]> {
  try {
    // Use the bulk assign function
    const { data, error } = await supabase.rpc(
      'assign_exercises_bulk',
      {
        patient_id: patientId,
        exercise_ids: exerciseIds
      }
    );
    
    if (error) {
      console.error("Error assigning exercises:", error);
      return [];
    }
    
    return data as Assignment[];
  } catch (error) {
    console.error("Exception assigning exercises:", error);
    return [];
  }
}

export async function saveExerciseResult(result: Omit<ExerciseResult, 'id' | 'created_at'>): Promise<ExerciseResult | null> {
  try {
    const { data, error } = await supabase
      .from('results')
      .insert(result)
      .select()
      .single();
    
    if (error) {
      console.error("Error saving exercise result:", error);
      return null;
    }
    
    return data as ExerciseResult;
  } catch (error) {
    console.error("Exception saving exercise result:", error);
    return null;
  }
}

export async function getPatientResults(patientId: string): Promise<ExerciseResult[]> {
  try {
    const { data, error } = await supabase
      .from('results')
      .select(`
        *,
        assignments(
          *,
          exercises(*)
        )
      `)
      .eq('assignments.patient_id', patientId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching patient results:", error);
      return [];
    }
    
    return data as unknown as ExerciseResult[];
  } catch (error) {
    console.error("Exception fetching patient results:", error);
    return [];
  }
}
