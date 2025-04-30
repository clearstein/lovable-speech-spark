
import { User, UserRole } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";

// Determine user role from Supabase session and other sources
export async function determineUserRole(session: any): Promise<UserRole> {
  if (!session?.user) {
    return 'admin'; // Default if no session
  }
  
  // First try to get role from app_metadata
  if (session.user.app_metadata && session.user.app_metadata.role) {
    console.log("Found role in app_metadata:", session.user.app_metadata.role);
    return session.user.app_metadata.role as UserRole;
  }
  
  // If no role in app_metadata, check therapist table
  try {
    const { data: therapistData, error: therapistError } = await supabase
      .from('therapists')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (therapistData && !therapistError) {
      console.log("Found therapist record:", therapistData);
      
      // Set the metadata role for future logins
      try {
        await supabase.rpc('set_user_role', { 
          user_id: session.user.id, 
          role: 'therapist' 
        });
        console.log("Set role to therapist for user:", session.user.id);
      } catch (roleError) {
        console.error("Error setting user role:", roleError);
      }
      
      return 'therapist';
    }
  } catch (error) {
    console.error("Error checking therapist table:", error);
  }
  
  // Check for patient table when implemented
  try {
    // When patient table is implemented, uncomment this
    // const { data: patientData, error: patientError } = await supabase
    //   .from('patients')
    //   .select('*')
    //   .eq('id', session.user.id)
    //   .single();
    //
    // if (patientData && !patientError) {
    //   console.log("Found patient record:", patientData);
    //   
    //   // Set the metadata role for future logins
    //   try {
    //     await supabase.rpc('set_user_role', { 
    //       user_id: session.user.id, 
    //       role: 'patient' 
    //     });
    //     console.log("Set role to patient for user:", session.user.id);
    //   } catch (roleError) {
    //     console.error("Error setting user role:", roleError);
    //   }
    //   
    //   return 'patient';
    // }
  } catch (error) {
    console.error("Error checking patient table:", error);
  }
  
  // If we've fallen through to here, check for mock users
  const storedUser = getStoredUserData();
  if (storedUser && storedUser.role) {
    console.log("Using role from stored user:", storedUser.role);
    return storedUser.role;
  }

  // Default to admin for now
  return 'admin';
}

// Create user data object from session
export function createUserData(session: any, role: UserRole): User {
  return {
    id: session.user.id,
    email: session.user.email || '',
    name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
    role: role,
  };
}

// Store user data in local storage
export function storeUserData(userData: User): void {
  localStorage.setItem("currentUser", JSON.stringify(userData));
}

// Clear user data from local storage
export function clearUserData(): void {
  localStorage.removeItem("currentUser");
}

// Get stored user data from local storage
export function getStoredUserData(): User | null {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
}
