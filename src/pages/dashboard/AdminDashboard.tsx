
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, Activity, Calendar, BarChart4, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { format } from "date-fns";

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
        // For now, we'll use dummy counts until we add the tables to Supabase
        
        // We cannot directly query these tables as they don't exist yet in the Supabase schema
        // So we'll use mock data for now
        const therapistCount = 5; // Mock data
        const patientCount = 12;  // Mock data
        const exerciseCount = 23; // Mock data
        
        // Generate dummy data for charts - in a real app this would come from Supabase
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

  // Helper functions to generate chart data
  const generateActivityData = () => {
    const today = new Date();
    const data = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: format(date, 'MMM dd'),
        completed: Math.floor(Math.random() * 50) + 10
      });
    }
    
    return data;
  };

  const generateUserGrowthData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    
    for (let i = 0; i < 12; i++) {
      data.push({
        month: months[i],
        therapists: Math.floor(Math.random() * 5) + 1,
        patients: Math.floor(Math.random() * 15) + 5
      });
    }
    
    return data;
  };

  // Chart config
  const chartConfig = {
    completed: {
      label: "Completed Exercises",
      color: "hsl(var(--primary))",
    },
    therapists: {
      label: "Therapists",
      color: "hsl(var(--primary))",
    },
    patients: {
      label: "Patients",
      color: "hsl(var(--therapy-purple))",
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of all system activity</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Therapists</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.therapistCount}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newTherapists} in the last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.patientCount}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newPatients} in the last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Exercises</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.exerciseCount}</div>
            <p className="text-xs text-muted-foreground">
              All exercises available
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sessions Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sessionsToday}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.sessionsToday - stats.sessionsYesterday} from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
            <CardDescription>Exercise completion over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <ChartContainer 
              className="h-[300px]" 
              config={chartConfig}
            >
              <BarChart data={activityData}>
                <XAxis 
                  dataKey="date" 
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      labelFormatter={(value) => `Date: ${value}`}
                    />
                  } 
                />
                <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users by month</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <ChartContainer 
              className="h-[300px]" 
              config={chartConfig}
            >
              <BarChart data={userGrowthData}>
                <XAxis 
                  dataKey="month" 
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      labelFormatter={(value) => `Month: ${value}`}
                    />
                  } 
                />
                <Bar dataKey="therapists" fill="var(--color-therapists)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="patients" fill="var(--color-patients)" radius={[4, 4, 0, 0]} />
                <ChartLegend
                  content={<ChartLegendContent />}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>The latest events across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-medium text-muted-foreground border-b">
                  <th className="p-2 pl-0">User</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Action</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {activityLogs.map(log => (
                  <tr key={log.id} className="border-b">
                    <td className="p-2 pl-0">{log.user}</td>
                    <td className="p-2">{log.userType}</td>
                    <td className="p-2">{log.action}</td>
                    <td className="p-2">{log.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
