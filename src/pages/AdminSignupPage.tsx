
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AdminSignupForm from "@/components/auth/AdminSignupForm";
import { supabase } from "@/integrations/supabase/client";

const AdminSignupPage = () => {
  const { isAuthenticated } = useAuth();
  const [isAdminSetup, setIsAdminSetup] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminSetup = async () => {
      try {
        const { data, error } = await supabase
          .from('app_settings')
          .select('value')
          .eq('key', 'admin_signup')
          .single();

        if (error) {
          console.error("Error checking admin setup:", error);
          // If no record exists, admin setup is needed
          setIsAdminSetup(false);
        } else {
          // Safely check if value is an object with completed property
          const value = data?.value as Record<string, unknown>;
          const completed = value && typeof value === 'object' && 'completed' in value 
            ? Boolean(value.completed) 
            : false;
          setIsAdminSetup(completed);
        }
      } catch (error) {
        console.error("Error checking admin setup:", error);
        setIsAdminSetup(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminSetup();
  }, []);

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  // Redirect to login if admin is already set up
  if (isAdminSetup === true) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">ST</span>
              </div>
              <span className="font-bold text-2xl">Speech Spark</span>
            </div>
            <h1 className="text-2xl font-bold">Create Admin Account</h1>
            <p className="text-muted-foreground">
              Set up your admin account to get started
            </p>
          </div>
          
          <AdminSignupForm onComplete={() => setIsAdminSetup(true)} />
          
        </div>
      </div>

      {/* Right side - Image/Illustration */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-primary to-therapy-purple p-8">
        <div className="h-full flex flex-col items-center justify-center text-white">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-4">Welcome to Speech Spark</h2>
            <p className="text-lg mb-8">
              Set up your admin account to start managing therapists, patients, and exercises for your speech therapy practice.
            </p>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="font-semibold">A</span>
                </div>
                <div className="p-4 bg-white/20 rounded-lg speech-bubble text-white">
                  <p>"Once your admin account is created, you'll be able to manage all aspects of your Speech Spark platform."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignupPage;
