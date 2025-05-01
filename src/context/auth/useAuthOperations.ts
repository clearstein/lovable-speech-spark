
import { useState } from "react";
import { UserProfile } from "@/types/app";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MOCK_USERS } from "./types";
import { determineUserRole, createUserData, storeUserData } from "./utils";

export const useAuthOperations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      console.log("Attempting authentication with Supabase for:", email);
      
      // Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (authError) {
        console.error("Supabase authentication error:", authError.message);
        
        // If the email isn't confirmed
        if (authError.message.includes("Email not confirmed")) {
          // Attempt to automatically resend verification email
          await supabase.auth.resend({
            type: 'signup',
            email
          });
          throw new Error("Email not confirmed. A new verification email has been sent to your inbox.");
        }
        
        // In development mode, we can test with mock data
        const user = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );
        
        if (!user) {
          console.error("No matching user found");
          throw new Error(authError.message || "Invalid email or password");
        }
        
        // Remove password before storage
        const { password: _, ...userWithoutPassword } = user;
        
        const userData = {
          ...userWithoutPassword
        };
        
        console.log("Logged in with mock data:", userData);
        storeUserData(userData);
        
        toast({
          title: "Successfully logged in (Mock)",
          description: `Using mock data with role ${userData.role}`,
        });
        
        return userData as UserProfile;
      } else {
        // Successful Supabase authentication
        if (authData.session && authData.user) {
          console.log("Supabase session created:", authData.session);
          
          // Determine user role
          try {
            const role = await determineUserRole(authData.session);
            console.log("Role determined after login:", role);
            
            // Create user data with profile info
            const userData = await createUserData(authData.session, role);
            console.log("User data created:", userData);
            
            // Store user data
            storeUserData(userData);
            
            toast({
              title: "Successfully logged in",
              description: `Welcome${userData.name ? ', ' + userData.name : ''}!`,
            });
            
            return userData as UserProfile;
          } catch (roleError) {
            console.error("Error determining role:", roleError);
            throw new Error("Error retrieving user information");
          }
        } else {
          console.error("Missing session data");
          throw new Error("Login error: missing session data");
        }
      }
    } catch (error) {
      console.error("Complete login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signupAdmin = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // Create the admin user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'admin'
          }
        }
      });
      
      if (authError) {
        throw new Error(authError.message);
      }
      
      if (!authData.user) {
        throw new Error("Failed to create admin user");
      }
      
      // Create user profile data
      const userData: UserProfile = {
        id: authData.user.id,
        email: authData.user.email || '',
        name: name,
        role: 'admin',
        theme: 'light',
        created_at: new Date().toISOString()
      };
      
      // Store user data
      storeUserData(userData);
      
      toast({
        title: "Admin account created",
        description: "You have successfully created the admin account",
      });
      
      return userData;
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    return null;
  };

  return {
    isLoading,
    setIsLoading,
    login,
    logout,
    signupAdmin
  };
};
