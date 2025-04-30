
import React from "react";
import { useAuth } from "@/context/AuthContext";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import UserProfileMenu from "@/components/profile/UserProfileMenu";

const TopBar = () => {
  const { currentUser } = useAuth();

  // Fonction pour transformer le nom de la page en français
  const getPageNameInFrench = () => {
    const path = window.location.pathname.split("/").pop() || "";
    
    const pageNameMap: Record<string, string> = {
      "dashboard": "Tableau de bord",
      "therapists": "Thérapeutes",
      "patients": "Patients",
      "exercises": "Exercices",
      "analytics": "Statistiques",
      "settings": "Paramètres",
      "assignments": "Rendez-vous",
      "notes": "Notes de progrès",
      "games": "Mes Jeux",
      "missions": "Missions quotidiennes",
      "achievements": "Réussites",
      "profile": "Profil"
    };

    return pageNameMap[path] || "Tableau de bord";
  };

  return (
    <header className="border-b border-border h-16 px-6 flex items-center justify-between bg-background">
      <div>
        <h1 className="font-medium text-lg">
          {getPageNameInFrench()}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <NotificationCenter />
        <UserProfileMenu />
      </div>
    </header>
  );
};

export default TopBar;
