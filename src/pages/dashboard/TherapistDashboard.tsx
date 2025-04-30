
import React from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentPatients from "@/components/dashboard/RecentPatients";
import UpcomingSessions from "@/components/dashboard/UpcomingSessions";

const TherapistDashboard = () => {
  const handleAddPatient = () => {
    console.log("Add new patient clicked");
    // Logic to add a new patient would go here
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Therapist Dashboard"
        description="Manage your patients and assignments"
        buttonText="Add New Patient"
        onButtonClick={handleAddPatient}
      />
      
      {/* Stats Cards */}
      <StatsCards />

      {/* Recent Patients */}
      <RecentPatients />

      {/* Upcoming Sessions */}
      <UpcomingSessions />
    </div>
  );
};

export default TherapistDashboard;
