
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  Home, 
  Users, 
  Activity, 
  Settings, 
  FileText, 
  Calendar, 
  Award, 
  BarChart,
  UserRound,
  Gamepad2,
  LogOut
} from "lucide-react";

const AppSidebar = () => {
  const { userRole, logout } = useAuth();

  // Define navigation items based on user role
  const getNavItems = () => {
    switch (userRole) {
      case "admin":
        return [
          { title: "Tableau de bord", icon: Home, path: "/app/dashboard" },
          { title: "Thérapeutes", icon: Users, path: "/app/therapists" },
          { title: "Patients", icon: UserRound, path: "/app/patients" },
          { title: "Exercices", icon: Activity, path: "/app/exercises" },
          { title: "Statistiques", icon: BarChart, path: "/app/analytics" },
          { title: "Paramètres", icon: Settings, path: "/app/settings" },
        ];
      case "therapist":
        return [
          { title: "Tableau de bord", icon: Home, path: "/app/dashboard" },
          { title: "Mes Patients", icon: UserRound, path: "/app/patients" },
          { title: "Rendez-vous", icon: Calendar, path: "/app/assignments" },
          { title: "Notes de progrès", icon: FileText, path: "/app/notes" },
          { title: "Paramètres", icon: Settings, path: "/app/settings" },
        ];
      case "patient":
        return [
          { title: "Mes Jeux", icon: Gamepad2, path: "/app/games" },
          { title: "Missions quotidiennes", icon: Calendar, path: "/app/missions" },
          { title: "Réussites", icon: Award, path: "/app/achievements" },
          { title: "Profil", icon: UserRound, path: "/app/profile" },
        ];
      default:
        return [];
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/5c8491f6-a38b-4ec4-acd7-f60122594862.png" 
            alt="OrthoBoost Logo" 
            className="w-10 h-10 rounded-full object-contain"
          />
          <div>
            <h3 className="font-bold text-white">OrthoBoost</h3>
            <p className="text-xs text-white/80">Thérapie Amusante</p>
          </div>
        </div>
        <SidebarTrigger className="absolute top-4 right-4 text-white" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getNavItems().map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        isActive ? "bg-sidebar-accent w-full flex items-center gap-3 px-3 py-2 rounded-md" : "w-full flex items-center gap-3 px-3 py-2 rounded-md"
                      }
                    >
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent/50 text-white"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
