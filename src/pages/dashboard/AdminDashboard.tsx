
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, Activity, Calendar, BarChart4, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
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
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 in the last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">
              +14 in the last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Exercises</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
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
            <div className="text-2xl font-bold">37</div>
            <p className="text-xs text-muted-foreground">
              +5 from yesterday
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
            <div className="h-[300px] flex flex-col justify-center items-center">
              <BarChart4 className="h-16 w-16 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground mt-2">Chart placeholder - Activity data</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users by month</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[300px] flex flex-col justify-center items-center">
              <TrendingUp className="h-16 w-16 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground mt-2">Chart placeholder - Growth data</p>
            </div>
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
                <tr className="border-b">
                  <td className="p-2 pl-0">Dr. Emma Johnson</td>
                  <td className="p-2">Therapist</td>
                  <td className="p-2">Created new patient profile</td>
                  <td className="p-2">Today, 14:30</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 pl-0">Alex Smith</td>
                  <td className="p-2">Patient</td>
                  <td className="p-2">Completed 3 exercises</td>
                  <td className="p-2">Today, 13:15</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 pl-0">Admin</td>
                  <td className="p-2">System</td>
                  <td className="p-2">Updated exercise content</td>
                  <td className="p-2">Yesterday, 18:45</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 pl-0">Dr. Robert Williams</td>
                  <td className="p-2">Therapist</td>
                  <td className="p-2">Created assignment plan</td>
                  <td className="p-2">Yesterday, 16:20</td>
                </tr>
                <tr>
                  <td className="p-2 pl-0">Sophia Chen</td>
                  <td className="p-2">Patient</td>
                  <td className="p-2">Earned new achievement</td>
                  <td className="p-2">Yesterday, 10:05</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
