
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import AdminStatsCards from "@/components/dashboard/AdminStatsCards";
import ActivityChart, { generateActivityData } from "@/components/dashboard/ActivityChart";
import UserGrowthChart, { generateUserGrowthData } from "@/components/dashboard/UserGrowthChart";
import RecentActivityTable from "@/components/dashboard/RecentActivityTable";

interface DashboardStats {
  therapistCount: number;
  newTherapists: number;
  patientCount: number;
  newPatients: number;
  exerciseCount: number;
  sessionsToday: number;
  sessionsYesterday: number;
}

interface ActivityLog {
  id: string;
  user: string;
  userType: string;
  action: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    therapistCount: 0,
    newTherapists: 0,
    patientCount: 0,
    newPatients: 0,
    exerciseCount: 0,
    sessionsToday: 0,
    sessionsYesterday: 0
  });
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // In a real application, these would fetch from specific tables
        // For now, we'll use mock data until we add the tables to Supabase
        
        // Mock data for stats
        const therapistCount = 5; // Mock data
        const patientCount = 12;  // Mock data
        const exerciseCount = 23; // Mock data
        
        // Generate dummy data for charts
        const activityData = generateActivityData();
        const userGrowthData = generateUserGrowthData();
        
        setStats({
          therapistCount: therapistCount,
          newTherapists: 2, // This would be calculated from a date range query
          patientCount: patientCount,
          newPatients: 14, // This would be calculated from a date range query
          exerciseCount: exerciseCount,
          sessionsToday: 37, // This would come from a real sessions table
          sessionsYesterday: 32 // This would come from a real sessions table with date filter
        });
        
        setActivityData(activityData);
        setUserGrowthData(userGrowthData);
        
        // Generate sample activity logs - would be replaced with real data
        setActivityLogs([
          {
            id: "1",
            user: "Dr. Emma Johnson",
            userType: "Therapist",
            action: "Created new patient profile",
            createdAt: "Today, 14:30"
          },
          {
            id: "2",
            user: "Alex Smith",
            userType: "Patient",
            action: "Completed 3 exercises",
            createdAt: "Today, 13:15"
          },
          {
            id: "3",
            user: "Admin",
            userType: "System",
            action: "Updated exercise content",
            createdAt: "Yesterday, 18:45"
          },
          {
            id: "4",
            user: "Dr. Robert Williams",
            userType: "Therapist",
            action: "Created assignment plan",
            createdAt: "Yesterday, 16:20"
          },
          {
            id: "5",
            user: "Sophia Chen",
            userType: "Patient",
            action: "Earned new achievement",
            createdAt: "Yesterday, 10:05"
          }
        ]);
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="Overview of all system activity"
      />

      {/* Stats Cards */}
      <AdminStatsCards stats={stats} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart data={activityData} />
        <UserGrowthChart data={userGrowthData} />
      </div>

      {/* Recent Activity Table */}
      <RecentActivityTable activityLogs={activityLogs} />
    </div>
  );
};

export default AdminDashboard;
