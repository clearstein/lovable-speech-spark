
import React from "react";
import PatientHeader from "@/components/dashboard/patient/PatientHeader";
import PatientDailyProgress from "@/components/dashboard/patient/PatientDailyProgress";
import PatientMissions from "@/components/dashboard/patient/PatientMissions";
import GameCategories from "@/components/dashboard/patient/GameCategories";
import RecentAchievements from "@/components/dashboard/patient/RecentAchievements";

const PatientDashboard = () => {
  return (
    <div className="space-y-6">
      <PatientHeader name="Alex" badgeCount={12} />
      
      <PatientDailyProgress 
        completed={3} 
        total={5} 
        progressPercentage={60} 
      />
      
      <PatientMissions />
      
      <GameCategories />
      
      <RecentAchievements />
    </div>
  );
};

export default PatientDashboard;
