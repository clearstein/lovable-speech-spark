
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, Calendar, Activity, Award } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="My Patients"
        value={8}
        description="+1 in the last month"
        icon={<UserRound className="h-4 w-4" />}
      />
      <StatCard
        title="Active Assignments"
        value={24}
        description="Across all patients"
        icon={<Calendar className="h-4 w-4" />}
      />
      <StatCard
        title="Sessions Today"
        value={12}
        description="3 completed, 9 pending"
        icon={<Activity className="h-4 w-4" />}
      />
      <StatCard
        title="Achievements"
        value={5}
        description="Awarded this week"
        icon={<Award className="h-4 w-4" />}
      />
    </div>
  );
};

export default StatsCards;
