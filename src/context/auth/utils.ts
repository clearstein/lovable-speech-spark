
import { UserRole } from "@/types/app";
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
  
  // If no role in app_metadata, check user_profiles table
  try {
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
      
    if (profileData && !profileError) {
      console.log("Found user profile record:", profileData);
      return profileData.role as UserRole;
    }
  } catch (error) {
    console.error("Error checking user_profiles table:", error);
  }
  
  // Check for mock users
  const storedUser = getStoredUserData();
  if (storedUser && storedUser.role) {
    console.log("Using role from stored user:", storedUser.role);
    return storedUser.role;
  }

  // Default to admin for now
  return 'admin';
}

// Create user data object from session
export async function createUserData(session: any, role: UserRole) {
  // Fetch the user profile from the database
  const { data: profileData, error: profileError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
    
  if (profileError) {
    console.error("Error fetching user profile:", profileError);
    
    // Fall back to basic user info if profile can't be fetched
    return {
      id: session.user.id,
      email: session.user.email || '',
      name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
      role: role,
      theme: 'light',
      created_at: new Date().toISOString()
    };
  }
  
  return profileData;
}

// Store user data in local storage
export function storeUserData(userData: any): void {
  localStorage.setItem("currentUser", JSON.stringify(userData));
}

// Clear user data from local storage
export function clearUserData(): void {
  localStorage.removeItem("currentUser");
}

// Get stored user data from local storage
export function getStoredUserData(): any | null {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
}
