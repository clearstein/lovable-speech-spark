
import { User, UserRole } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";

// Determine user role from Supabase session and other sources
export async function determineUserRole(session: any): Promise<UserRole> {
  let role: UserRole = 'patient'; // Default role
  
  // First try to get role from app_metadata
  if (session.user.app_metadata && session.user.app_metadata.role) {
    console.log("Found role in app_metadata:", session.user.app_metadata.role);
    role = session.user.app_metadata.role as UserRole;
    return role; // Return immediately if role is found in app_metadata
  }
  
  // If we've fallen through to here, check for mock users
  // This is helpful for development/testing
  const storedUser = getStoredUserData();
  if (storedUser && storedUser.role) {
    console.log("Using role from stored user:", storedUser.role);
    role = storedUser.role;
  }

  return role;
}

// Create user data object from session
export function createUserData(session: any, role: UserRole): User {
  return {
    id: session.user.id,
    email: session.user.email || '',
    name: session.user.user_metadata.name || 'User',
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
