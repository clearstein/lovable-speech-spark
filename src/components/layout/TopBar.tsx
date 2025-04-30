
import React from "react";
import { useAuth } from "@/context/AuthContext";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import UserProfileMenu from "@/components/profile/UserProfileMenu";

const TopBar = () => {
  const { currentUser } = useAuth();

  return (
    <header className="border-b border-border h-16 px-6 flex items-center justify-between bg-background">
      <div>
        <h1 className="font-medium text-lg">
          {window.location.pathname.split("/").pop()?.replace(/^\w/, (c) => c.toUpperCase()) || "Dashboard"}
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
