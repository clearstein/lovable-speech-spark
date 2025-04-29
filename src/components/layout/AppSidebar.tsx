
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
          { title: "Dashboard", icon: Home, path: "/app/dashboard" },
          { title: "Therapists", icon: Users, path: "/app/therapists" },
          { title: "Patients", icon: UserRound, path: "/app/patients" },
          { title: "Exercises", icon: Activity, path: "/app/exercises" },
          { title: "Analytics", icon: BarChart, path: "/app/analytics" },
          { title: "Settings", icon: Settings, path: "/app/settings" },
        ];
      case "therapist":
        return [
          { title: "Dashboard", icon: Home, path: "/app/dashboard" },
          { title: "My Patients", icon: UserRound, path: "/app/patients" },
          { title: "Assignments", icon: Calendar, path: "/app/assignments" },
          { title: "Progress Notes", icon: FileText, path: "/app/notes" },
          { title: "Settings", icon: Settings, path: "/app/settings" },
        ];
      case "patient":
        return [
          { title: "My Games", icon: Gamepad2, path: "/app/games" },
          { title: "Daily Missions", icon: Calendar, path: "/app/missions" },
          { title: "Achievements", icon: Award, path: "/app/achievements" },
          { title: "Profile", icon: UserRound, path: "/app/profile" },
        ];
      default:
        return [];
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">ST</span>
          </div>
          <div>
            <h3 className="font-bold text-white">Speech Spark</h3>
            <p className="text-xs text-white/80">Therapy Made Fun</p>
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
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
