
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import PatientHeader from "@/components/dashboard/patient/PatientHeader";
import PatientDailyProgress from "@/components/dashboard/patient/PatientDailyProgress";
import PatientMissions from "@/components/dashboard/patient/PatientMissions";
import GameCategories from "@/components/dashboard/patient/GameCategories";
import RecentAchievements from "@/components/dashboard/patient/RecentAchievements";

const PatientDashboard = () => {
  const { currentUser } = useAuth();
  const [patientData, setPatientData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (currentUser?.id) {
        try {
          const { data, error } = await supabase
            .from('patients')
            .select('*')
            .eq('id', currentUser.id)
            .single();

          if (error) {
            console.error("Error fetching patient data:", error);
          } else {
            console.log("Fetched patient data:", data);
            setPatientData(data);
          }
        } catch (error) {
          console.error("Exception fetching patient data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPatientData();
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PatientHeader 
        name={patientData?.name || currentUser?.name || "Patient"} 
        badgeCount={12} 
      />
      
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
