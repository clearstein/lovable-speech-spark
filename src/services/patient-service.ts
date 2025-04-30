
import { supabase } from "@/integrations/supabase/client";
import { Patient, CreatePatientData, UpdatePatientData } from "@/types/patient";

export async function getPatients(): Promise<Patient[]> {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching patients:", error);
      return [];
    }
    
    return data as Patient[];
  } catch (error) {
    console.error("Exception fetching patients:", error);
    return [];
  }
}

export async function getPatientById(id: string): Promise<Patient | null> {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching patient:", error);
      return null;
    }
    
    return data as Patient;
  } catch (error) {
    console.error("Exception fetching patient:", error);
    return null;
  }
}

export async function createPatient(patientData: CreatePatientData): Promise<Patient | null> {
  try {
    console.log("Creating patient with data:", JSON.stringify(patientData));
    
    // First create the user account in Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: patientData.email,
      password: patientData.password,
      options: {
        data: {
          name: patientData.name,
          role: 'patient' // Explicitly set role to 'patient'
        }
      }
    });
    
    if (signUpError) {
      console.error("Error creating patient auth account:", signUpError);
      throw signUpError;
    }
    
    if (!authData.user) {
      throw new Error("Failed to create user account");
    }
    
    console.log("Created auth user:", authData.user.id);
    
    // Set the user's role to patient using RPC
    try {
      await supabase.rpc('set_user_role', { 
        user_id: authData.user.id, 
        role: 'patient' 
      });
      console.log("Set role to patient for user:", authData.user.id);
    } catch (roleError) {
      console.error("Error setting user role:", roleError);
      // Continue anyway as we'll also store the role in the patients table
    }
    
    // Then create the patient record in our patients table
    const { data, error } = await supabase
      .from('patients')
      .insert({
        id: authData.user.id,
        name: patientData.name,
        email: patientData.email,
        date_of_birth: patientData.date_of_birth || null,
        therapist_id: patientData.therapist_id || null,
        active: patientData.active !== undefined ? patientData.active : true
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error creating patient record:", error);
      return null;
    }
    
    return data as Patient;
  } catch (error) {
    console.error("Exception creating patient:", error);
    return null;
  }
}

export async function updatePatient(patientData: UpdatePatientData): Promise<Patient | null> {
  try {
    const { data, error } = await supabase
      .from('patients')
      .update({
        name: patientData.name,
        date_of_birth: patientData.date_of_birth,
        therapist_id: patientData.therapist_id,
        active: patientData.active
      })
      .eq('id', patientData.id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating patient:", error);
      return null;
    }
    
    return data as Patient;
  } catch (error) {
    console.error("Exception updating patient:", error);
    return null;
  }
}

export async function deletePatient(id: string): Promise<boolean> {
  try {
    // First delete from patients table
    const { error: dbError } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);
    
    if (dbError) {
      console.error("Error deleting patient from database:", dbError);
      return false;
    }
    
    // Also delete the user from auth (if you have permission)
    try {
      const { error: authError } = await supabase.auth.admin.deleteUser(id);
      if (authError) {
        console.error("Error deleting patient auth account (may require admin):", authError);
        // Continue even if auth deletion fails, as this might require admin API
      }
    } catch (authDeleteError) {
      console.error("Exception deleting patient auth account:", authDeleteError);
      // Continue anyway as we've deleted from patients table
    }
    
    return true;
  } catch (error) {
    console.error("Exception deleting patient:", error);
    return false;
  }
}
