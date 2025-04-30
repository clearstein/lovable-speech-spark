
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, Activity, Calendar } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, description, icon }: StatsCardProps) => (
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

interface AdminStatsCardsProps {
  stats: {
    therapistCount: number;
    newTherapists: number;
    patientCount: number;
    newPatients: number;
    exerciseCount: number;
    sessionsToday: number;
    sessionsYesterday: number;
  };
}

const AdminStatsCards = ({ stats }: AdminStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Therapists"
        value={stats.therapistCount}
        description={`+${stats.newTherapists} in the last month`}
        icon={<Users className="h-4 w-4" />}
      />
      
      <StatsCard
        title="Total Patients"
        value={stats.patientCount}
        description={`+${stats.newPatients} in the last month`}
        icon={<User className="h-4 w-4" />}
      />
      
      <StatsCard
        title="Active Exercises"
        value={stats.exerciseCount}
        description="All exercises available"
        icon={<Activity className="h-4 w-4" />}
      />
      
      <StatsCard
        title="Sessions Today"
        value={stats.sessionsToday}
        description={`+${stats.sessionsToday - stats.sessionsYesterday} from yesterday`}
        icon={<Calendar className="h-4 w-4" />}
      />
    </div>
  );
};

export default AdminStatsCards;
