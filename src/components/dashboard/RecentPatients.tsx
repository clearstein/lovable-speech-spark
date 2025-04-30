
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface PatientProps {
  initials: string;
  name: string;
  lastActivity: string;
  progress: number;
}

const Patient = ({ initials, name, lastActivity, progress }: PatientProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <span className="font-semibold text-primary">{initials}</span>
      </div>
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">Last activity: {lastActivity}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="text-right mr-4">
        <p className="text-xs font-medium">Overall Progress</p>
        <p className="text-xs text-muted-foreground">{progress}%</p>
      </div>
      <Progress value={progress} className="w-[100px]" />
    </div>
  </div>
);

const RecentPatients = () => {
  const patients = [
    { initials: "AS", name: "Alex Smith", lastActivity: "Today", progress: 72 },
    { initials: "JD", name: "Jamie Davis", lastActivity: "Today", progress: 45 },
    { initials: "SC", name: "Sophia Chen", lastActivity: "Yesterday", progress: 89 },
    { initials: "RJ", name: "Ryan Johnson", lastActivity: "2 days ago", progress: 34 }
  ];
  
  return (
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
          {patients.map((patient) => (
            <Patient
              key={patient.name}
              initials={patient.initials}
              name={patient.name}
              lastActivity={patient.lastActivity}
              progress={patient.progress}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPatients;
