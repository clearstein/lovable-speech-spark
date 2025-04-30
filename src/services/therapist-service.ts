
import { supabase } from "@/integrations/supabase/client";
import { Therapist, CreateTherapistData, UpdateTherapistData } from "@/types/therapist";

export async function getTherapists(): Promise<Therapist[]> {
  try {
    const { data, error } = await supabase
      .from('therapists')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching therapists:", error);
      return [];
    }
    
    return data as Therapist[];
  } catch (error) {
    console.error("Exception fetching therapists:", error);
    return [];
  }
}

export async function getTherapistById(id: string): Promise<Therapist | null> {
  try {
    const { data, error } = await supabase
      .from('therapists')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching therapist:", error);
      return null;
    }
    
    return data as Therapist;
  } catch (error) {
    console.error("Exception fetching therapist:", error);
    return null;
  }
}

export async function createTherapist(therapistData: CreateTherapistData): Promise<Therapist | null> {
  try {
    // First create the user account in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: therapistData.email,
      password: therapistData.password,
      email_confirm: true,
      user_metadata: {
        name: therapistData.name,
        role: 'therapist'
      }
    });
    
    if (authError) {
      console.error("Error creating therapist auth account:", authError);
      throw authError;
    }
    
    // Then create the therapist record in our therapists table
    const { data, error } = await supabase
      .from('therapists')
      .insert({
        id: authData.user.id,
        name: therapistData.name,
        email: therapistData.email,
        license: therapistData.license || null,
        specialty: therapistData.specialty || null,
        active: therapistData.active !== undefined ? therapistData.active : true
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error creating therapist record:", error);
      return null;
    }
    
    // Set the user role to therapist
    await supabase.rpc('set_user_role', {
      user_id: authData.user.id,
      role: 'therapist'
    });
    
    return data as Therapist;
  } catch (error) {
    console.error("Exception creating therapist:", error);
    return null;
  }
}

export async function updateTherapist(therapistData: UpdateTherapistData): Promise<Therapist | null> {
  try {
    const { data, error } = await supabase
      .from('therapists')
      .update({
        name: therapistData.name,
        license: therapistData.license,
        specialty: therapistData.specialty,
        active: therapistData.active
      })
      .eq('id', therapistData.id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating therapist:", error);
      return null;
    }
    
    return data as Therapist;
  } catch (error) {
    console.error("Exception updating therapist:", error);
    return null;
  }
}

export async function deleteTherapist(id: string): Promise<boolean> {
  try {
    // Delete from therapists table
    const { error: dbError } = await supabase
      .from('therapists')
      .delete()
      .eq('id', id);
    
    if (dbError) {
      console.error("Error deleting therapist from database:", dbError);
      return false;
    }
    
    // Delete the auth user
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    
    if (authError) {
      console.error("Error deleting therapist from auth:", authError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Exception deleting therapist:", error);
    return false;
  }
}
