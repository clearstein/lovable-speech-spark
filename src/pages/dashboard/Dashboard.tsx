
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import TherapistDashboard from "./TherapistDashboard";
import PatientDashboard from "./PatientDashboard";

const Dashboard = () => {
  const { userRole, currentUser } = useAuth();
  
  useEffect(() => {
    console.log("Current user role in Dashboard:", userRole);
    console.log("Current user data:", currentUser);
  }, [userRole, currentUser]);

  // Force admin dashboard for now
  if (true) {
    return <AdminDashboard />;
  }

  // Render the appropriate dashboard based on user role
  switch (userRole) {
    case "admin":
      return <AdminDashboard />;
    case "therapist":
      return <TherapistDashboard />;
    case "patient":
      return <PatientDashboard />;
    default:
      return (
        <div className="flex items-center justify-center h-[80vh] text-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome to Speech Spark</h1>
            <p className="text-muted-foreground">
              Your dashboard is loading...
            </p>
          </div>
        </div>
      );
  }
};

export default Dashboard;
