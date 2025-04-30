
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
    console.log("Creating therapist with data:", JSON.stringify(therapistData));
    
    // First create the user account in Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: therapistData.email,
      password: therapistData.password,
      options: {
        data: {
          name: therapistData.name,
          role: 'therapist' // Explicitly set role to 'therapist'
        }
      }
    });
    
    if (signUpError) {
      console.error("Error creating therapist auth account:", signUpError);
      throw signUpError;
    }
    
    if (!authData.user) {
      throw new Error("Failed to create user account");
    }
    
    console.log("Created auth user:", authData.user.id);
    
    // Set the user's role to therapist using RPC
    try {
      await supabase.rpc('set_user_role', { 
        user_id: authData.user.id, 
        role: 'therapist' 
      });
      console.log("Set role to therapist for user:", authData.user.id);
    } catch (roleError) {
      console.error("Error setting user role:", roleError);
      // Continue anyway as we'll also store the role in the therapists table
    }
    
    // Then create the therapist record in our therapists table 
    // Use service_role key if available, otherwise proceed with standard insert
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
      
      // If we couldn't create the therapist record, we should clean up the auth user
      try {
        // Note: This requires admin privileges and may not work with anon key
        console.log("Attempting to clean up auth user due to therapist creation failure");
        await supabase.auth.admin.deleteUser(authData.user.id);
      } catch (cleanupError) {
        console.error("Could not clean up auth user:", cleanupError);
      }
      
      return null;
    }
    
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
    // First delete from therapists table
    const { error: dbError } = await supabase
      .from('therapists')
      .delete()
      .eq('id', id);
    
    if (dbError) {
      console.error("Error deleting therapist from database:", dbError);
      return false;
    }
    
    // Also delete the user from auth (if you have permission)
    try {
      const { error: authError } = await supabase.auth.admin.deleteUser(id);
      if (authError) {
        console.error("Error deleting therapist auth account (may require admin):", authError);
        // Continue even if auth deletion fails, as this might require admin API
      }
    } catch (authDeleteError) {
      console.error("Exception deleting therapist auth account:", authDeleteError);
      // Continue anyway as we've deleted from therapists table
    }
    
    return true;
  } catch (error) {
    console.error("Exception deleting therapist:", error);
    return false;
  }
}
