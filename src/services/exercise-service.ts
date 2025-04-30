
import { Exercise, ExerciseCategory, ExerciseAssignment, ExerciseProgress } from "@/types/exercise";
import { supabase } from "@/integrations/supabase/client";

export async function getExerciseCategories(): Promise<ExerciseCategory[]> {
  try {
    const { data, error } = await supabase
      .from('exercise_categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error("Error fetching exercise categories:", error);
      return [];
    }
    
    return data as ExerciseCategory[];
  } catch (error) {
    console.error("Exception fetching exercise categories:", error);
    return [];
  }
}

export async function getExercises(): Promise<Exercise[]> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('title');
    
    if (error) {
      console.error("Error fetching exercises:", error);
      return [];
    }
    
    return data as Exercise[];
  } catch (error) {
    console.error("Exception fetching exercises:", error);
    return [];
  }
}

export async function getExerciseById(id: string): Promise<Exercise | null> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching exercise by ID:", error);
      return null;
    }
    
    return data as Exercise;
  } catch (error) {
    console.error("Exception fetching exercise by ID:", error);
    return null;
  }
}

export async function createExercise(exercise: Partial<Exercise>): Promise<Exercise> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .insert({
        title: exercise.title || "New Exercise",
        category_id: exercise.category_id || undefined,
        difficulty: exercise.difficulty || "Medium",
        type: exercise.type || "Interactive",
        content: exercise.content || {},
        settings: exercise.settings || {},
        description: exercise.description,
        created_by: exercise.created_by
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error creating exercise:", error);
      throw error;
    }
    
    return data as Exercise;
  } catch (error) {
    console.error("Exception creating exercise:", error);
    throw error;
  }
}

export async function updateExercise(id: string, exercise: Partial<Exercise>): Promise<Exercise> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .update(exercise)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating exercise:", error);
      throw error;
    }
    
    return data as Exercise;
  } catch (error) {
    console.error("Exception updating exercise:", error);
    throw error;
  }
}

export async function deleteExercise(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('exercises')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Error deleting exercise:", error);
      throw error;
    }
  } catch (error) {
    console.error("Exception deleting exercise:", error);
    throw error;
  }
}

// The functions below are kept with mock implementations for now
// since we haven't created these tables in the database yet

export async function getAssignments(patientId?: string): Promise<ExerciseAssignment[]> {
  // Simulate API call with empty array for now
  return new Promise(resolve => {
    setTimeout(() => resolve([]), 200);
  });
}

export async function createAssignment(assignment: Partial<ExerciseAssignment>): Promise<ExerciseAssignment> {
  // Simulate API call
  return new Promise(resolve => {
    const newAssignment: ExerciseAssignment = {
      id: Math.random().toString(36).substring(2, 9),
      exercise_id: assignment.exercise_id || "1",
      patient_id: assignment.patient_id || "1",
      therapist_id: assignment.therapist_id,
      status: assignment.status || "assigned",
      due_date: assignment.due_date,
      created_at: new Date().toISOString(),
      completed_at: undefined
    };
    setTimeout(() => resolve(newAssignment), 300);
  });
}

export async function getProgressForPatient(patientId: string): Promise<ExerciseProgress[]> {
  // Simulate API call with empty array for now
  return new Promise(resolve => {
    setTimeout(() => resolve([]), 200);
  });
}

export async function saveExerciseProgress(progress: Partial<ExerciseProgress>): Promise<ExerciseProgress> {
  // Simulate API call
  return new Promise(resolve => {
    const newProgress: ExerciseProgress = {
      id: Math.random().toString(36).substring(2, 9),
      patient_id: progress.patient_id || "1",
      exercise_id: progress.exercise_id || "1",
      score: progress.score,
      duration: progress.duration,
      answers: progress.answers,
      feedback: progress.feedback,
      created_at: new Date().toISOString(),
      assignment_id: progress.assignment_id
    };
    setTimeout(() => resolve(newProgress), 300);
  });
}
