
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
  "therapy-yellow": {
    border: "hover:border-[#FCFA0D]",
    bg: "bg-[#FCFA0D]/10",
    hoverBg: "group-hover:bg-[#FCFA0D]/20",
    text: "text-[#FCFA0D]"
  },
  "therapy-blue": {
    border: "hover:border-[#0046FF]",
    bg: "bg-[#0046FF]/10",
    hoverBg: "group-hover:bg-[#0046FF]/20",
    text: "text-[#0046FF]"
  },
  "therapy-orange": {
    border: "hover:border-[#FF7906]",
    bg: "bg-[#FF7906]/10",
    hoverBg: "group-hover:bg-[#FF7906]/20",
    text: "text-[#FF7906]"
  },
  "therapy-green": {
    border: "hover:border-[#75D21C]",
    bg: "bg-[#75D21C]/10",
    hoverBg: "group-hover:bg-[#75D21C]/20",
    text: "text-[#75D21C]"
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
