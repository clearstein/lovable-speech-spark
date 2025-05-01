
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import TherapistDashboard from "./TherapistDashboard";
import PatientDashboard from "./PatientDashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; 
import { AlertTriangle } from "lucide-react";
import { UserProfile } from "@/types/app";

const Dashboard = () => {
  const { userRole, currentUser } = useAuth();
  
  useEffect(() => {
    console.log("Current user role in Dashboard:", userRole);
    console.log("Current user data:", currentUser);
  }, [userRole, currentUser]);

  // If no user role is detected yet, show a loading state
  if (!userRole) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Loading your dashboard</h1>
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground mt-4">
            Preparing your personalized experience...
          </p>
        </div>
      </div>
    );
  }

  // Render the appropriate dashboard based on user role
  switch (userRole) {
    case "admin":
      return <AdminDashboard user={currentUser as UserProfile} />;
    case "therapist":
      return <TherapistDashboard user={currentUser as UserProfile} />;
    case "patient":
      return <PatientDashboard user={currentUser as UserProfile} />;
    default:
      return (
        <div className="flex items-center justify-center h-[80vh] text-center">
          <Alert variant="destructive" className="max-w-md">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Role Error</AlertTitle>
            <AlertDescription>
              Your user role ({userRole}) is not recognized. 
              Please contact an administrator for assistance.
            </AlertDescription>
          </Alert>
        </div>
      );
  }
};

export default Dashboard;
