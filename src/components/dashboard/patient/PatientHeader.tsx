
import React from "react";
import { Star, Award, Trophy } from "lucide-react";

interface PatientHeaderProps {
  name: string;
  badgeCount: number;
}

const PatientHeader = ({ name, badgeCount }: PatientHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Hello, {name}!</h1>
        <p className="text-muted-foreground">Ready for today's speech adventures?</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white ring-2 ring-background">
            <Star className="h-4 w-4" />
          </div>
          <div className="w-8 h-8 rounded-full bg-therapy-orange flex items-center justify-center text-white ring-2 ring-background">
            <Award className="h-4 w-4" />
          </div>
          <div className="w-8 h-8 rounded-full bg-therapy-purple flex items-center justify-center text-white ring-2 ring-background">
            <Trophy className="h-4 w-4" />
          </div>
        </div>
        <span className="text-sm font-medium">{badgeCount} Badges Earned</span>
      </div>
    </div>
  );
};

export default PatientHeader;
