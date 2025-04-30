
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameCategoryCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  gameCount: number;
  hoverColor: string;
}

// Map color names to actual Tailwind classes
const colorMap = {
  "therapy-purple": {
    border: "hover:border-purple-500",
    bg: "bg-purple-100",
    hoverBg: "group-hover:bg-purple-200",
    text: "text-purple-500"
  },
  "therapy-blue": {
    border: "hover:border-blue-500",
    bg: "bg-blue-100",
    hoverBg: "group-hover:bg-blue-200",
    text: "text-blue-500"
  },
  "therapy-orange": {
    border: "hover:border-orange-500",
    bg: "bg-orange-100",
    hoverBg: "group-hover:bg-orange-200",
    text: "text-orange-500"
  },
  "primary": {
    border: "hover:border-primary",
    bg: "bg-primary/10",
    hoverBg: "group-hover:bg-primary/20",
    text: "text-primary"
  }
};

const GameCategoryCard = ({ icon: Icon, iconColor, title, gameCount, hoverColor }: GameCategoryCardProps) => {
  // Get color classes from the map or use default values
  const colors = colorMap[hoverColor as keyof typeof colorMap] || colorMap.primary;
  
  return (
    <Card className={cn("group transition-all cursor-pointer", colors.border)}>
      <CardHeader className="pb-2">
        <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center mb-2", colors.bg, colors.hoverBg)}>
          <Icon className={cn("h-6 w-6", colors.text)} />
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-xs">{gameCount} games</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default GameCategoryCard;
