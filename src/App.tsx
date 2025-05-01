import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import VerifySuccess from "./pages/auth/VerifySuccess";

// Import new pages
import TherapistsPage from "./pages/app/therapists/TherapistsPage";
import PatientsPage from "./pages/app/patients/PatientsPage";
import ExercisesPage from "./pages/app/exercises/ExercisesPage";
import AnalyticsPage from "./pages/app/analytics/AnalyticsPage";
import SettingsPage from "./pages/app/settings/SettingsPage";

const queryClient = new QueryClient();

// Auth-aware route component
const ProtectedRoute = ({ 
  element, 
  allowedRoles = ["admin", "therapist", "patient"], 
  redirectPath = "/login" 
}: { 
  element: React.ReactNode; 
  allowedRoles?: string[]; 
  redirectPath?: string;
}) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // If role not allowed, redirect to dashboard or show access denied
  if (userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/app/dashboard" replace />;
  }
  
  // Otherwise, render the protected component
  return <>{element}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/verify-success" element={<VerifySuccess />} />

            {/* Protected Routes */}
            <Route path="/app" element={<AppLayout />}>
              <Route path="dashboard" element={
                <ProtectedRoute element={<Dashboard />} />
              } />
              
              {/* Admin Routes */}
              <Route path="therapists" element={
                <ProtectedRoute element={<TherapistsPage />} allowedRoles={["admin"]} />
              } />
              <Route path="analytics" element={
                <ProtectedRoute element={<AnalyticsPage />} allowedRoles={["admin"]} />
              } />
              
              {/* Admin and Therapist Routes */}
              <Route path="patients" element={
                <ProtectedRoute element={<PatientsPage />} allowedRoles={["admin", "therapist"]} />
              } />
              <Route path="exercises" element={
                <ProtectedRoute element={<ExercisesPage />} allowedRoles={["admin", "therapist"]} />
              } />
              
              {/* Common Routes */}
              <Route path="settings" element={
                <ProtectedRoute element={<SettingsPage />} />
              } />
              <Route path="profile" element={
                <ProtectedRoute element={<div>Profile Page</div>} />
              } />
              
              {/* Therapist Routes */}
              <Route path="assignments" element={
                <ProtectedRoute element={<div>Assignments Page</div>} allowedRoles={["admin", "therapist"]} />
              } />
              <Route path="notes" element={
                <ProtectedRoute element={<div>Notes Page</div>} allowedRoles={["admin", "therapist"]} />
              } />
              
              {/* Patient Routes */}
              <Route path="games" element={
                <ProtectedRoute element={<div>Games Page</div>} allowedRoles={["patient"]} />
              } />
              <Route path="missions" element={
                <ProtectedRoute element={<div>Missions Page</div>} allowedRoles={["patient"]} />
              } />
              <Route path="achievements" element={
                <ProtectedRoute element={<div>Achievements Page</div>} allowedRoles={["patient"]} />
              } />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
