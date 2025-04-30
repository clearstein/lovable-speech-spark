
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Mic, BookOpen } from "lucide-react";
import DailyMissionCard from "./DailyMissionCard";

const PatientMissions = () => {
  const missions = [
    {
      type: "Mirror Practice",
      title: "Oral Praxies",
      description: "Practice mouth movements",
      duration: "~5 min",
      stars: 2,
      totalStars: 3,
      actionIcon: Mic,
      actionText: "Start Exercise",
      isPrimary: true,
      onStart: () => console.log("Starting Oral Praxies")
    },
    {
      type: "Oral Exercise",
      title: "Picture Naming",
      description: "Name what you see",
      duration: "~7 min",
      stars: 0,
      totalStars: 3,
      actionIcon: Mic,
      actionText: "Start Exercise",
      onStart: () => console.log("Starting Picture Naming")
    },
    {
      type: "Written Exercise",
      title: "Syllable Assembly",
      description: "Build words from syllables",
      duration: "~6 min",
      stars: 1,
      totalStars: 3,
      actionIcon: BookOpen,
      actionText: "Start Exercise",
      onStart: () => console.log("Starting Syllable Assembly")
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" /> Today's Missions
        </h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {missions.map((mission, index) => (
          <DailyMissionCard
            key={index}
            {...mission}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientMissions;
