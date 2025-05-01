
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const VerifySuccess = () => {
  const navigate = useNavigate();
  
  // Auto-redirect to login after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Compte activé</CardTitle>
          <CardDescription>
            Votre compte a été vérifié avec succès
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            Vous allez être redirigé vers la page de connexion dans quelques secondes...
          </p>
          <p className="text-sm">
            Si vous n'êtes pas redirigé automatiquement, 
            <a href="/login" className="text-primary hover:underline ml-1">cliquez ici</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifySuccess;
