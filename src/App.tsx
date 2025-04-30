
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminSignupPage from "./pages/AdminSignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";

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
            <Route path="/admin-signup" element={<AdminSignupPage />} />

            {/* Protected Routes */}
            <Route path="/app" element={<AppLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              {/* These routes will be implemented as needed */}
              <Route path="therapists" element={<div>Therapists Page</div>} />
              <Route path="patients" element={<div>Patients Page</div>} />
              <Route path="exercises" element={<div>Exercises Page</div>} />
              <Route path="analytics" element={<div>Analytics Page</div>} />
              <Route path="settings" element={<div>Settings Page</div>} />
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
