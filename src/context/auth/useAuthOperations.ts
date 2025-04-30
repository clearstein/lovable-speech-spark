
import { useState } from "react";
import { User, UserRole } from "@/types/auth";
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
      // First try to authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (authError) {
        // If user hasn't confirmed their email
        if (authError.message.includes("Email not confirmed")) {
          // Try to resend verification email automatically
          await supabase.auth.resend({
            type: 'signup',
            email
          });
          throw new Error("Email not confirmed. A new verification email has been sent to your inbox.");
        }
        
        // If invalid credentials, try mock data as fallback (for development)
        const user = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );
        
        if (!user) {
          throw new Error(authError.message || "Invalid email or password");
        }
        
        // Remove password from user object before storing
        const { password: _, ...userWithoutPassword } = user;
        storeUserData(userWithoutPassword as User);
        
        toast({
          title: "Logged in successfully (Mock)",
          description: "Using development mock data",
        });
        
        return userWithoutPassword as User;
      } else {
        // Supabase authentication successful
        if (authData.user) {
          // Determine user role
          const role = await determineUserRole(authData.session);
          
          // Create user data
          const userData = createUserData(authData.session, role);
          
          // Store user data
          storeUserData(userData);
          
          toast({
            title: "Logged in successfully",
            description: "Welcome back!",
          });
          
          return userData;
        }
      }
      
      return null;
    } catch (error) {
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
      // Check if admin_signup record exists in app_settings table
      const { data: settingsData, error: settingsError } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'admin_signup');
      
      // If no settings record exists, we need to create it
      if (settingsError || !settingsData || settingsData.length === 0) {
        // Create the admin_signup setting since it doesn't exist
        await supabase
          .from('app_settings')
          .insert({ key: 'admin_signup', value: { completed: false } });
      } else {
        // Check if an admin has already been set up
        const settingsValue = settingsData[0]?.value;
        if (typeof settingsValue === 'object' && settingsValue && 'completed' in settingsValue && settingsValue.completed === true) {
          throw new Error("Admin signup has already been completed");
        }
      }
      
      // Create the admin user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (authError) {
        throw new Error(authError.message);
      }
      
      if (!authData.user) {
        throw new Error("Failed to create admin user");
      }
      
      // Set the user's role to admin
      await supabase.rpc('set_user_role', { 
        user_id: authData.user.id, 
        role: 'admin' 
      });
      
      // Update the admin_signup setting to indicate that it's been completed and store admin email
      await supabase
        .from('app_settings')
        .update({ value: { completed: true, admin_email: email } })
        .eq('key', 'admin_signup');
      
      // Create user data
      const userData: User = {
        id: authData.user.id,
        email: authData.user.email || '',
        name: name,
        role: 'admin',
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
