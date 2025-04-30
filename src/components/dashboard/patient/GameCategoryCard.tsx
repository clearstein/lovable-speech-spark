
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface GameCategoryCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  gameCount: number;
  hoverColor: string;
}

const GameCategoryCard = ({ icon: Icon, iconColor, title, gameCount, hoverColor }: GameCategoryCardProps) => {
  return (
    <Card className={`group hover:border-${hoverColor} transition-all cursor-pointer`}>
      <CardHeader className="pb-2">
        <div className={`h-12 w-12 bg-${hoverColor}/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-${hoverColor}/20`}>
          <Icon className={`h-6 w-6 text-${hoverColor}`} />
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-xs">{gameCount} games</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default GameCategoryCard;
