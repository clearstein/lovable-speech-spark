
import { supabase } from "@/integrations/supabase/client";
import { Exercise } from "@/types/app";

export async function getAllExercises(): Promise<Exercise[]> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('difficulty', { ascending: true });
    
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

export async function getExerciseById(id: number): Promise<Exercise | null> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching exercise:", error);
      return null;
    }
    
    return data as Exercise;
  } catch (error) {
    console.error("Exception fetching exercise:", error);
    return null;
  }
}

export async function getExerciseBySlug(slug: string): Promise<Exercise | null> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error("Error fetching exercise by slug:", error);
      return null;
    }
    
    return data as Exercise;
  } catch (error) {
    console.error("Exception fetching exercise by slug:", error);
    return null;
  }
}

export async function updateExercise(exercise: Partial<Exercise> & { id: number }): Promise<Exercise | null> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .update(exercise)
      .eq('id', exercise.id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating exercise:", error);
      return null;
    }
    
    return data as Exercise;
  } catch (error) {
    console.error("Exception updating exercise:", error);
    return null;
  }
}

export async function createExercise(exercise: Omit<Exercise, 'id' | 'created_at'>): Promise<Exercise | null> {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .insert(exercise)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating exercise:", error);
      return null;
    }
    
    return data as Exercise;
  } catch (error) {
    console.error("Exception creating exercise:", error);
    return null;
  }
}
