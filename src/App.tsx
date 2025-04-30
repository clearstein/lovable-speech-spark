
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";

// Import new pages
import TherapistsPage from "./pages/app/therapists/TherapistsPage";
import PatientsPage from "./pages/app/patients/PatientsPage";
import ExercisesPage from "./pages/app/exercises/ExercisesPage";
import AnalyticsPage from "./pages/app/analytics/AnalyticsPage";
import SettingsPage from "./pages/app/settings/SettingsPage";

const queryClient = new QueryClient();

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

            {/* Protected Routes */}
            <Route path="/app" element={<AppLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="therapists" element={<TherapistsPage />} />
              <Route path="patients" element={<PatientsPage />} />
              <Route path="exercises" element={<ExercisesPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="assignments" element={<div>Assignments Page</div>} />
              <Route path="notes" element={<div>Notes Page</div>} />
              <Route path="games" element={<div>Games Page</div>} />
              <Route path="missions" element={<div>Missions Page</div>} />
              <Route path="achievements" element={<div>Achievements Page</div>} />
              <Route path="profile" element={<div>Profile Page</div>} />
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
