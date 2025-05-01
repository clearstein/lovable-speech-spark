
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
    // Clear any existing user data first to reset the state
    clearUserData();
    
    // Initialize auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event);
        if (session?.user) {
          try {
            // Determine user role
            const role: UserRole = await determineUserRole(session);
            console.log("Determined user role:", role);
            
            // Create user data
            const userData = createUserData(session, role);
            
            // Update state and storage
            setCurrentUser(userData);
            storeUserData(userData);
          } catch (error) {
            console.error("Error determining user role:", error);
            setCurrentUser(null);
            clearUserData();
          }
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
          try {
            // Determine user role
            const role: UserRole = await determineUserRole(session);
            console.log("Determined user role from session:", role);
            
            // Create user data
            const userData = createUserData(session, role);
            
            // Update state and storage
            setCurrentUser(userData);
            storeUserData(userData);
          } catch (error) {
            console.error("Error determining user role:", error);
            
            // Check for stored user in localStorage as fallback
            const storedUser = getStoredUserData();
            if (storedUser) {
              console.log("Using stored user:", storedUser.role);
              setCurrentUser(storedUser);
            }
          }
        } else {
          // Check for stored user in localStorage as fallback
          const storedUser = getStoredUserData();
          if (storedUser) {
            console.log("Using stored user:", storedUser.role);
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
    try {
      const user = await login(email, password);
      setCurrentUser(user);
      return Promise.resolve(); // Explicitly resolve the promise
    } catch (error) {
      // Make sure we're properly rejecting the promise on error
      return Promise.reject(error);
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  const handleSignupAdmin = async (email: string, password: string, name: string) => {
    try {
      const user = await signupAdmin(email, password, name);
      setCurrentUser(user);
      return Promise.resolve(); // Explicitly resolve the promise
    } catch (error) {
      return Promise.reject(error);
    }
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
