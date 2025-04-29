
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
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
            <h1 className="text-2xl font-bold">Welcome to Speech Spark</h1>
            <p className="text-muted-foreground">
              Login to access your account
            </p>
          </div>
          
          <LoginForm />
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Need help? Contact support at support@speechspark.com</p>
          </div>
        </div>
      </div>

      {/* Right side - Image/Illustration */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-primary to-therapy-purple p-8">
        <div className="h-full flex flex-col items-center justify-center text-white">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-4">Making Speech Therapy Engaging</h2>
            <p className="text-lg mb-8">
              Our platform connects therapists and patients through interactive exercises designed to make speech therapy fun and effective.
            </p>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="font-semibold">JP</span>
                </div>
                <div className="p-4 bg-white/20 rounded-lg speech-bubble text-white">
                  <p>"My patients have shown remarkable improvement since using Speech Spark. The gamified approach makes all the difference!"</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="text-sm text-right">
                  <p className="font-semibold">Dr. James Peterson</p>
                  <p className="opacity-70">Speech Pathologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
