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
      console.log("Tentative d'authentification avec Supabase pour:", email);
      
      // Authentification avec Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (authError) {
        console.error("Erreur d'authentification Supabase:", authError.message);
        
        // Si l'email n'est pas confirmé
        if (authError.message.includes("Email not confirmed")) {
          // Tentative de renvoi automatique de l'e-mail de vérification
          await supabase.auth.resend({
            type: 'signup',
            email
          });
          throw new Error("Email not confirmed. A new verification email has been sent to your inbox.");
        }
        
        // En mode développement, on peut tester avec des données fictives
        const user = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );
        
        if (!user) {
          console.error("Aucun utilisateur correspondant trouvé");
          throw new Error(authError.message || "E-mail ou mot de passe invalide");
        }
        
        // Suppression du mot de passe avant stockage
        const { password: _, ...userWithoutPassword } = user;
        
        const userData = {
          ...userWithoutPassword
        };
        
        console.log("Connexion avec données fictives:", userData);
        storeUserData(userData as User);
        
        toast({
          title: "Connecté avec succès (Fictif)",
          description: `Utilisation des données fictives avec le rôle ${userData.role}`,
        });
        
        return userData as User;
      } else {
        // Authentification Supabase réussie
        if (authData.session && authData.user) {
          console.log("Session Supabase créée:", authData.session);
          
          // Détermination du rôle utilisateur
          try {
            const role: UserRole = await determineUserRole(authData.session);
            console.log("Rôle déterminé après connexion:", role);
            
            // Création des données utilisateur
            const userData = createUserData(authData.session, role);
            console.log("Données utilisateur créées:", userData);
            
            // Stockage des données utilisateur
            storeUserData(userData);
            
            toast({
              title: "Connecté avec succès",
              description: `Bienvenue${userData.name ? ', ' + userData.name : ''} !`,
            });
            
            return userData;
          } catch (roleError) {
            console.error("Erreur lors de la détermination du rôle:", roleError);
            throw new Error("Erreur lors de la récupération des informations utilisateur");
          }
        } else {
          console.error("Données de session manquantes");
          throw new Error("Erreur lors de la connexion: données de session manquantes");
        }
      }
    } catch (error) {
      console.error("Erreur de connexion complète:", error);
      toast({
        title: "Échec de la connexion",
        description: error instanceof Error ? error.message : "Une erreur s'est produite",
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
        const settingsValue = settingsData[0]?.value as Record<string, unknown>;
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
