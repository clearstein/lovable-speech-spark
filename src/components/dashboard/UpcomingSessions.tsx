
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface SessionProps {
  patientName: string;
  sessionType: string;
  time: string;
  day: string;
}

const Session = ({ patientName, sessionType, time, day }: SessionProps) => (
  <div className="flex items-center p-3 bg-muted rounded-md">
    <Clock className="mr-4 h-5 w-5 text-primary" />
    <div className="flex-1">
      <p className="font-medium">{patientName}</p>
      <p className="text-sm text-muted-foreground">{sessionType}</p>
    </div>
    <div className="text-sm text-right">
      <p className="font-medium">{time}</p>
      <p className="text-muted-foreground">{day}</p>
    </div>
  </div>
);

const UpcomingSessions = () => {
  const sessions = [
    { 
      patientName: "Alex Smith", 
      sessionType: "Articulation Therapy", 
      time: "3:00 PM", 
      day: "Today" 
    },
    { 
      patientName: "Jamie Davis", 
      sessionType: "Language Development", 
      time: "4:30 PM", 
      day: "Today" 
    },
    { 
      patientName: "Ryan Johnson", 
      sessionType: "Fluency Practice", 
      time: "10:15 AM", 
      day: "Tomorrow" 
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Sessions</CardTitle>
        <CardDescription>Your schedule for today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <Session
              key={index}
              patientName={session.patientName}
              sessionType={session.sessionType}
              time={session.time}
              day={session.day}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingSessions;
