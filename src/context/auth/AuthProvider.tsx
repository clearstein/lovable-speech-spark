
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType } from "./types";
import { useAuthOperations } from "./useAuthOperations";
import { determineUserRole, createUserData, storeUserData, getStoredUserData, clearUserData } from "./utils";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { isLoading, setIsLoading, login, logout, signupAdmin } = useAuthOperations();

  useEffect(() => {
    // Initialize auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Determine user role
          const role = await determineUserRole(session);
          
          // Create user data
          const userData = createUserData(session, role);
          
          // Update state and storage
          setCurrentUser(userData);
          storeUserData(userData);
        } else {
          setCurrentUser(null);
          clearUserData();
        }
      }
    );
    
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Determine user role
          const role = await determineUserRole(session);
          
          // Create user data
          const userData = createUserData(session, role);
          
          // Update state and storage
          setCurrentUser(userData);
          storeUserData(userData);
        } else {
          // Check for stored user in localStorage as fallback
          const storedUser = getStoredUserData();
          if (storedUser) {
            setCurrentUser(storedUser);
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
  }, [setIsLoading]);

  const handleLogin = async (email: string, password: string) => {
    const user = await login(email, password);
    setCurrentUser(user);
    return;
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  const handleSignupAdmin = async (email: string, password: string, name: string) => {
    const user = await signupAdmin(email, password, name);
    setCurrentUser(user);
    return;
  };

  const value = {
    currentUser,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!currentUser,
    userRole: currentUser?.role || null,
    signupAdmin: handleSignupAdmin,
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
