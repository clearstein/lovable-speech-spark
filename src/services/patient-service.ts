
import { supabase } from "@/integrations/supabase/client";
import { Patient } from "@/types/app";

export async function getAllPatients(): Promise<Patient[]> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        *,
        patients(*)
      `)
      .eq('role', 'patient')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching patients:", error);
      return [];
    }
    
    // Transform the data to match our Patient type
    return data.map(profile => ({
      ...profile,
      ...profile.patients[0],
      patients: undefined
    })) as Patient[];
  } catch (error) {
    console.error("Exception fetching patients:", error);
    return [];
  }
}

export async function getPatientsByTherapistId(therapistId: string): Promise<Patient[]> {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select(`
        *,
        user_profiles(*)
      `)
      .eq('therapist_id', therapistId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching patients by therapist:", error);
      return [];
    }
    
    // Transform the data to match our Patient type
    return data.map(patient => ({
      ...patient.user_profiles,
      ...patient,
      user_profiles: undefined
    })) as Patient[];
  } catch (error) {
    console.error("Exception fetching patients by therapist:", error);
    return [];
  }
}

export async function getPatientById(id: string): Promise<Patient | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        *,
        patients(*)
      `)
      .eq('id', id)
      .eq('role', 'patient')
      .single();
    
    if (error) {
      console.error("Error fetching patient:", error);
      return null;
    }
    
    // Transform the data to match our Patient type
    return {
      ...data,
      ...data.patients[0],
      patients: undefined
    } as Patient;
  } catch (error) {
    console.error("Exception fetching patient:", error);
    return null;
  }
}

export async function createPatient(patientData: {
  email: string;
  name: string;
  password: string;
  therapist_id?: string;
  date_of_birth?: string;
}): Promise<Patient | null> {
  try {
    // Use the RPC function to create a patient account
    const { data, error } = await supabase.rpc(
      'create_patient',
      {
        email: patientData.email,
        name: patientData.name,
        password: patientData.password,
        therapist_id: patientData.therapist_id || null,
        date_of_birth: patientData.date_of_birth || null
      }
    );
    
    if (error) {
      console.error("Error creating patient:", error);
      return null;
    }
    
    // Fetch the newly created patient profile
    const patientId = data;
    return await getPatientById(patientId);
  } catch (error) {
    console.error("Exception creating patient:", error);
    return null;
  }
}

export async function updatePatient(patientData: {
  id: string;
  name?: string;
  therapist_id?: string | null;
  date_of_birth?: string | null;
  notes?: string | null;
}): Promise<Patient | null> {
  try {
    // First update the user profile
    if (patientData.name) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ name: patientData.name })
        .eq('id', patientData.id);
      
      if (profileError) {
        console.error("Error updating patient profile:", profileError);
        return null;
      }
    }
    
    // Then update the patient details
    const patientUpdate: any = {};
    if (patientData.therapist_id !== undefined) patientUpdate.therapist_id = patientData.therapist_id;
    if (patientData.date_of_birth !== undefined) patientUpdate.date_of_birth = patientData.date_of_birth;
    if (patientData.notes !== undefined) patientUpdate.notes = patientData.notes;
    
    if (Object.keys(patientUpdate).length > 0) {
      const { error: patientError } = await supabase
        .from('patients')
        .update(patientUpdate)
        .eq('id', patientData.id);
      
      if (patientError) {
        console.error("Error updating patient details:", patientError);
        return null;
      }
    }
    
    // Fetch the updated patient
    return await getPatientById(patientData.id);
  } catch (error) {
    console.error("Exception updating patient:", error);
    return null;
  }
}
