
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Veuillez saisir votre adresse e-mail pour réinitialiser votre mot de passe");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) throw error;
      
      toast({
        title: "E-mail de réinitialisation envoyé",
        description: "Vérifiez votre boîte mail pour le lien de réinitialisation",
      });
    } catch (error: any) {
      setErrorMessage(error.message || "Échec de l'envoi de l'e-mail de réinitialisation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!email || !password) {
      setErrorMessage("Veuillez saisir votre e-mail et votre mot de passe");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté. Redirection vers votre tableau de bord...",
      });
      
      // Fixed: Directly navigate without setTimeout to avoid state issues
      navigate("/app/dashboard");
      
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      if (error.message && error.message.includes("Email not confirmed")) {
        setErrorMessage(
          "Veuillez vérifier votre e-mail pour confirmer votre compte avant de vous connecter."
        );
        // Send another confirmation email
        try {
          await supabase.auth.resend({
            type: 'signup',
            email,
          });
          toast({
            title: "E-mail de vérification renvoyé",
            description: "Veuillez vérifier votre boîte mail pour confirmer votre adresse e-mail",
          });
        } catch (resendError) {
          console.error("Erreur lors du renvoi de l'e-mail de vérification:", resendError);
        }
      } else {
        setErrorMessage(error.message || "E-mail ou mot de passe invalide.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Re-bonjour</CardTitle>
        <CardDescription>
          Entrez vos identifiants pour accéder à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              {errorMessage}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="nom@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <button 
                onClick={handleResetPassword}
                className="text-xs text-primary hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connexion en cours...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn size={18} />
                Se connecter
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          <p>Vous n'avez pas de compte ? Contactez votre administrateur.</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
