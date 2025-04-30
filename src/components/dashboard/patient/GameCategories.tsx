
import React from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, ArrowUpRight, Mic, BookOpen, Calendar, Award } from "lucide-react";
import GameCategoryCard from "./GameCategoryCard";

const GameCategories = () => {
  const categories = [
    {
      icon: Mic,
      iconColor: "therapy-blue",
      title: "Articulation",
      gameCount: 6,
      hoverColor: "therapy-blue"
    },
    {
      icon: BookOpen,
      iconColor: "therapy-green",
      title: "Reading Skills",
      gameCount: 8,
      hoverColor: "therapy-green"
    },
    {
      icon: Calendar,
      iconColor: "therapy-orange",
      title: "Memory",
      gameCount: 5,
      hoverColor: "therapy-orange"
    },
    {
      icon: Award,
      iconColor: "primary",
      title: "Language",
      gameCount: 5,
      hoverColor: "therapy-yellow"
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Gamepad2 className="h-5 w-5" /> Game Categories
        </h2>
        <Button variant="ghost" size="sm" className="gap-1">
          Explore All <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <GameCategoryCard
            key={index}
            {...category}
          />
        ))}
      </div>
    </div>
  );
};

export default GameCategories;
