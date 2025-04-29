
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, Calendar, Activity, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const TherapistDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Therapist Dashboard</h1>
          <p className="text-muted-foreground">Manage your patients and assignments</p>
        </div>
        <Button>
          <UserRound className="mr-2 h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Patients</CardTitle>
            <UserRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +1 in the last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Across all patients
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sessions Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 completed, 9 pending
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Awarded this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Patients Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>Your recently active patients</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-semibold text-primary">AS</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Alex Smith</p>
                  <p className="text-xs text-muted-foreground">Last activity: Today</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right mr-4">
                  <p className="text-xs font-medium">Overall Progress</p>
                  <p className="text-xs text-muted-foreground">72%</p>
                </div>
                <Progress value={72} className="w-[100px]" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-semibold text-primary">JD</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Jamie Davis</p>
                  <p className="text-xs text-muted-foreground">Last activity: Today</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right mr-4">
                  <p className="text-xs font-medium">Overall Progress</p>
                  <p className="text-xs text-muted-foreground">45%</p>
                </div>
                <Progress value={45} className="w-[100px]" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-semibold text-primary">SC</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Sophia Chen</p>
                  <p className="text-xs text-muted-foreground">Last activity: Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right mr-4">
                  <p className="text-xs font-medium">Overall Progress</p>
                  <p className="text-xs text-muted-foreground">89%</p>
                </div>
                <Progress value={89} className="w-[100px]" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-semibold text-primary">RJ</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Ryan Johnson</p>
                  <p className="text-xs text-muted-foreground">Last activity: 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right mr-4">
                  <p className="text-xs font-medium">Overall Progress</p>
                  <p className="text-xs text-muted-foreground">34%</p>
                </div>
                <Progress value={34} className="w-[100px]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your schedule for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-muted rounded-md">
              <Clock className="mr-4 h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Alex Smith</p>
                <p className="text-sm text-muted-foreground">Articulation Therapy</p>
              </div>
              <div className="text-sm text-right">
                <p className="font-medium">3:00 PM</p>
                <p className="text-muted-foreground">Today</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-muted rounded-md">
              <Clock className="mr-4 h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Jamie Davis</p>
                <p className="text-sm text-muted-foreground">Language Development</p>
              </div>
              <div className="text-sm text-right">
                <p className="font-medium">4:30 PM</p>
                <p className="text-muted-foreground">Today</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-muted rounded-md">
              <Clock className="mr-4 h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Ryan Johnson</p>
                <p className="text-sm text-muted-foreground">Fluency Practice</p>
              </div>
              <div className="text-sm text-right">
                <p className="font-medium">10:15 AM</p>
                <p className="text-muted-foreground">Tomorrow</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TherapistDashboard;
