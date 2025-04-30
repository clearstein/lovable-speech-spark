
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  const { isAuthenticated, userRole } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    // Make sure to go to dashboard with admin role
    return <Navigate to="/app/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/5c8491f6-a38b-4ec4-acd7-f60122594862.png" 
                alt="OrthoBoost Logo" 
                className="w-16 h-16 object-contain"
              />
              <span className="font-bold text-2xl">OrthoBoost</span>
            </div>
            <h1 className="text-2xl font-bold">Bienvenue sur OrthoBoost</h1>
            <p className="text-muted-foreground">
              Connectez-vous pour accéder à votre compte
            </p>
          </div>
          
          <LoginForm />
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Besoin d'aide ? Contactez le support à support@orthoboost.com</p>
          </div>
        </div>
      </div>

      {/* Right side - Image/Illustration */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-primary to-therapy-yellow p-8">
        <div className="h-full flex flex-col items-center justify-center text-white">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-4">Rendre l'Orthophonie Engageante</h2>
            <p className="text-lg mb-8">
              Notre plateforme connecte thérapeutes et patients grâce à des exercices interactifs conçus pour rendre l'orthophonie amusante et efficace.
            </p>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="font-semibold">JP</span>
                </div>
                <div className="p-4 bg-white/20 rounded-lg speech-bubble text-white">
                  <p>"Mes patients ont montré une amélioration remarquable depuis qu'ils utilisent OrthoBoost. L'approche ludique fait toute la différence !"</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="text-sm text-right">
                  <p className="font-semibold">Dr. Jacques Pelletier</p>
                  <p className="opacity-70">Orthophoniste</p>
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
