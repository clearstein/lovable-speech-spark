import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Activity, Users, Calendar } from "lucide-react";

const AnalyticsPage = () => {
  // Sample data for the charts
  const therapistActivityData = [
    { name: 'Jan', sessions: 65, patients: 28 },
    { name: 'Feb', sessions: 59, patients: 30 },
    { name: 'Mar', sessions: 80, patients: 35 },
    { name: 'Apr', sessions: 81, patients: 32 },
    { name: 'May', sessions: 56, patients: 29 },
    { name: 'Jun', sessions: 55, patients: 33 },
  ];

  const exerciseCompletionData = [
    { name: 'Jeu du miroir', completed: 120, assigned: 150 },
    { name: 'Discrimination auditive', completed: 98, assigned: 120 },
    { name: 'Cherche et trouve', completed: 86, assigned: 95 },
    { name: 'Jeu de dénomination', completed: 99, assigned: 130 },
    { name: 'Complétion de phrases', completed: 85, assigned: 90 },
  ];

  const patientProgressData = [
    { name: 'Alex', score: 85 },
    { name: 'Sophie', score: 92 },
    { name: 'Liam', score: 78 },
    { name: 'Emma', score: 89 },
    { name: 'Noah', score: 69 },
  ];

  const exerciseTypeData = [
    { name: 'Langage Oral', value: 35 },
    { name: 'Compréhension Orale', value: 25 },
    { name: 'Mémoire', value: 20 },
    { name: 'Langage Écrit', value: 20 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Monitor performance and progress across the platform</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="therapists">Therapists</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
          {/* Key stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">
                    Total Patients
                  </CardTitle>
                  <CardDescription>Platform-wide</CardDescription>
                </div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">
                    Active Therapists
                  </CardTitle>
                  <CardDescription>Platform-wide</CardDescription>
                </div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">
                    Exercises Completed
                  </CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </div>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,842</div>
                <p className="text-xs text-muted-foreground">
                  +18% from previous period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Therapist Activity</CardTitle>
                <CardDescription>
                  Sessions conducted and patients seen over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={therapistActivityData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sessions" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="patients" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exercise Completion Rate</CardTitle>
                <CardDescription>
                  Assigned vs. completed exercises
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={exerciseCompletionData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="assigned" fill="#8884d8" />
                    <Bar dataKey="completed" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Progress</CardTitle>
                <CardDescription>
                  Average score by patient (top 5)
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={patientProgressData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exercise Distribution</CardTitle>
                <CardDescription>
                  By category
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={exerciseTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {exerciseTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Other tabs content would be implemented similarly */}
        <TabsContent value="patients">
          <div className="pt-4 text-center text-muted-foreground">
            <p>Detailed patient analytics coming soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="therapists">
          <div className="pt-4 text-center text-muted-foreground">
            <p>Detailed therapist analytics coming soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="exercises">
          <div className="pt-4 text-center text-muted-foreground">
            <p>Detailed exercise analytics coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
