
import { supabase } from "@/integrations/supabase/client";
import { Therapist } from "@/types/app";

export async function getAllTherapists(): Promise<Therapist[]> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        *,
        therapists(*)
      `)
      .eq('role', 'therapist')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching therapists:", error);
      return [];
    }
    
    // Transform the data to match our Therapist type
    return data.map(profile => ({
      ...profile,
      ...profile.therapists[0],
      therapists: undefined
    })) as Therapist[];
  } catch (error) {
    console.error("Exception fetching therapists:", error);
    return [];
  }
}

export async function getTherapistById(id: string): Promise<Therapist | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        *,
        therapists(*)
      `)
      .eq('id', id)
      .eq('role', 'therapist')
      .single();
    
    if (error) {
      console.error("Error fetching therapist:", error);
      return null;
    }
    
    // Transform the data to match our Therapist type
    return {
      ...data,
      ...data.therapists[0],
      therapists: undefined
    } as Therapist;
  } catch (error) {
    console.error("Exception fetching therapist:", error);
    return null;
  }
}

export async function createTherapist(therapistData: {
  email: string;
  name: string;
  password: string;
  license_tier?: string;
  specialty?: string;
}): Promise<Therapist | null> {
  try {
    // Use the RPC function to create a therapist account
    const { data, error } = await supabase.rpc(
      'create_therapist',
      {
        email: therapistData.email,
        name: therapistData.name,
        password: therapistData.password,
        license_tier: therapistData.license_tier || 'basic',
        specialty: therapistData.specialty || null
      }
    );
    
    if (error) {
      console.error("Error creating therapist:", error);
      return null;
    }
    
    // Fetch the newly created therapist profile
    const therapistId = data;
    return await getTherapistById(therapistId);
  } catch (error) {
    console.error("Exception creating therapist:", error);
    return null;
  }
}

export async function updateTherapist(therapistData: {
  id: string;
  name?: string;
  license_tier?: string;
  specialty?: string | null;
  active?: boolean;
}): Promise<Therapist | null> {
  try {
    // First update the user profile
    if (therapistData.name) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ name: therapistData.name })
        .eq('id', therapistData.id);
      
      if (profileError) {
        console.error("Error updating therapist profile:", profileError);
        return null;
      }
    }
    
    // Then update the therapist details
    const therapistUpdate: any = {};
    if (therapistData.license_tier !== undefined) therapistUpdate.license_tier = therapistData.license_tier;
    if (therapistData.specialty !== undefined) therapistUpdate.specialty = therapistData.specialty;
    if (therapistData.active !== undefined) therapistUpdate.active = therapistData.active;
    
    if (Object.keys(therapistUpdate).length > 0) {
      const { error: therapistError } = await supabase
        .from('therapists')
        .update(therapistUpdate)
        .eq('id', therapistData.id);
      
      if (therapistError) {
        console.error("Error updating therapist details:", therapistError);
        return null;
      }
    }
    
    // Fetch the updated therapist
    return await getTherapistById(therapistData.id);
  } catch (error) {
    console.error("Exception updating therapist:", error);
    return null;
  }
}
