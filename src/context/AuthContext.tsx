import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  signupAdmin: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@speechspark.com",
    password: "admin123",
    role: "admin" as UserRole,
    name: "Admin User",
  },
  {
    id: "2",
    email: "therapist@speechspark.com",
    password: "therapist123",
    role: "therapist" as UserRole,
    name: "Dr. Emma Johnson",
    licenceTier: "premium",
    active: true,
  },
  {
    id: "3", 
    email: "patient@speechspark.com",
    password: "patient123",
    role: "patient" as UserRole,
    name: "Alex Smith",
    therapistId: "2",
    avatar: "avatar1",
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Check if user is an admin in Supabase
          let role: UserRole = 'patient'; // Default role
          
          // First try to get role from app_metadata
          if (session.user.app_metadata && session.user.app_metadata.role) {
            role = session.user.app_metadata.role as UserRole;
          } else {
            // If not in app_metadata, check app_settings table for admin
            try {
              const { data: settingsData } = await supabase
                .from('app_settings')
                .select('value')
                .eq('key', 'admin_signup')
                .single();
                
              if (settingsData?.value && 
                  typeof settingsData.value === 'object' && 
                  'completed' in settingsData.value && 
                  settingsData.value.completed === true &&
                  session.user.email === settingsData.value.admin_email) {
                // This is the admin user from app_settings
                role = 'admin';
                
                // Update the role in app_metadata for future logins
                await supabase.rpc('set_user_role', { 
                  user_id: session.user.id, 
                  role: 'admin' 
                });
              }
            } catch (error) {
              console.error("Error checking admin status:", error);
            }
          }
          
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata.name || 'User',
            role: role,
          };
          
          setCurrentUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
        } else {
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
        }
      }
    );
    
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Check if user is an admin in Supabase
          let role: UserRole = 'patient'; // Default role
          
          // First try to get role from app_metadata
          if (session.user.app_metadata && session.user.app_metadata.role) {
            role = session.user.app_metadata.role as UserRole;
          } else {
            // If not in app_metadata, check app_settings table for admin
            try {
              const { data: settingsData } = await supabase
                .from('app_settings')
                .select('value')
                .eq('key', 'admin_signup')
                .single();
                
              if (settingsData?.value && 
                  typeof settingsData.value === 'object' && 
                  'completed' in settingsData.value && 
                  settingsData.value.completed === true &&
                  session.user.email === settingsData.value.admin_email) {
                // This is the admin user from app_settings
                role = 'admin';
                
                // Update the role in app_metadata for future logins
                await supabase.rpc('set_user_role', { 
                  user_id: session.user.id, 
                  role: 'admin' 
                });
              }
            } catch (error) {
              console.error("Error checking admin status:", error);
            }
          }
          
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata.name || 'User',
            role: role,
          };
          
          setCurrentUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
        } else {
          // Check for stored user in localStorage as fallback
          const storedUser = localStorage.getItem("currentUser");
          if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

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
          throw new Error("Email not confirmed. Please check your inbox for the verification email.");
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
        setCurrentUser(userWithoutPassword as User);
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
        
        toast({
          title: "Logged in successfully (Mock)",
          description: "Using development mock data",
        });
      } else {
        // Supabase authentication successful
        if (authData.user) {
          // Check if user is an admin in Supabase
          let role: UserRole = 'patient'; // Default role
          
          // First try to get role from app_metadata
          if (authData.user.app_metadata && authData.user.app_metadata.role) {
            role = authData.user.app_metadata.role as UserRole;
          } else {
            // If not in app_metadata, check app_settings table for admin
            try {
              const { data: settingsData } = await supabase
                .from('app_settings')
                .select('value')
                .eq('key', 'admin_signup')
                .single();
                
              if (settingsData?.value && 
                  typeof settingsData.value === 'object' && 
                  'completed' in settingsData.value && 
                  settingsData.value.completed === true &&
                  authData.user.email === settingsData.value.admin_email) {
                // This is the admin user from app_settings
                role = 'admin';
                
                // Update the role in app_metadata for future logins
                await supabase.rpc('set_user_role', { 
                  user_id: authData.user.id, 
                  role: 'admin' 
                });
                
                toast({
                  title: "Admin role recognized",
                  description: "You've been logged in with admin privileges",
                });
              }
            } catch (error) {
              console.error("Error checking admin status:", error);
            }
          }
          
          const userData: User = {
            id: authData.user.id,
            email: authData.user.email || '',
            name: authData.user.user_metadata.name || 'User',
            role: role,
          };
          
          setCurrentUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
          
          toast({
            title: "Logged in successfully",
            description: "Welcome back!",
          });
        }
      }
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
      
      setCurrentUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      
      toast({
        title: "Admin account created",
        description: "You have successfully created the admin account",
      });
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

  const logout = () => {
    supabase.auth.signOut().then(() => {
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    });
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    isAuthenticated: !!currentUser,
    userRole: currentUser?.role || null,
    signupAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
