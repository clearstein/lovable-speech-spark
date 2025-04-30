
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
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: therapistData.email,
      password: therapistData.password,
      options: {
        data: {
          name: therapistData.name,
          role: 'therapist'
        }
      }
    });
    
    if (signUpError) {
      console.error("Error creating therapist auth account:", signUpError);
      throw signUpError;
    }
    
    if (!signUpData.user) {
      throw new Error("Failed to create user account");
    }
    
    console.log("Created auth user:", signUpData.user.id);
    
    // Then create the therapist record in our therapists table
    const { data, error } = await supabase
      .from('therapists')
      .insert({
        id: signUpData.user.id,
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
    
    console.log("Created therapist record:", data);
    
    // Set user email as confirmed
    const { error: updateError } = await supabase.auth.updateUser({
      email: therapistData.email,
      data: { email_confirmed: true }
    });
    
    if (updateError) {
      console.error("Error confirming email:", updateError);
    }
    
    // Set the user role to therapist using RPC if available
    try {
      await supabase.rpc('set_user_role', {
        user_id: signUpData.user.id,
        role: 'therapist'
      });
    } catch (rpcError) {
      console.error("Error setting role via RPC:", rpcError);
      
      // Fallback: update user metadata directly
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { role: 'therapist' }
      });
      
      if (metadataError) {
        console.error("Error updating user metadata:", metadataError);
      }
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
    // Delete from therapists table
    const { error: dbError } = await supabase
      .from('therapists')
      .delete()
      .eq('id', id);
    
    if (dbError) {
      console.error("Error deleting therapist from database:", dbError);
      return false;
    }
    
    // Try to delete the auth user with admin API
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    
    // If admin API fails, try to handle it gracefully
    if (authError) {
      console.error("Error deleting therapist from auth (admin):", authError);
      
      // We successfully deleted from the therapists table, so return true even though
      // we couldn't delete from Auth (this might require manual cleanup later)
      return true;
    }
    
    return true;
  } catch (error) {
    console.error("Exception deleting therapist:", error);
    return false;
  }
}
