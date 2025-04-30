
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PatientDailyProgressProps {
  completed: number;
  total: number;
  progressPercentage: number;
}

const PatientDailyProgress = ({ completed, total, progressPercentage }: PatientDailyProgressProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Daily Progress</CardTitle>
          <Badge variant="secondary">{completed}/{total} Completed</Badge>
        </div>
        <CardDescription>Complete your daily exercises to earn rewards!</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="h-2" />
        <div className="mt-2 text-sm text-right text-muted-foreground">
          {progressPercentage}% Complete
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientDailyProgress;
