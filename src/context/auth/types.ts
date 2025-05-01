
import { UserRole, UserProfile, Therapist, Patient, Admin } from "@/types/app";

export interface AuthContextType {
  currentUser: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  signupAdmin: (email: string, password: string, name: string) => Promise<void>;
}

// Mock user data for demonstration
export const MOCK_USERS = [
  {
    id: "1",
    email: "admin@speechspark.com",
    password: "admin123",
    role: "admin" as UserRole,
    name: "Admin User",
    theme: "light",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    email: "therapist@speechspark.com",
    password: "therapist123",
    role: "therapist" as UserRole,
    name: "Dr. Emma Johnson",
    license_tier: "premium",
    active: true,
    specialty: "Pediatric Speech",
    theme: "light",
    created_at: new Date().toISOString(),
  },
  {
    id: "3", 
    email: "patient@speechspark.com",
    password: "patient123",
    role: "patient" as UserRole,
    name: "Alex Smith",
    therapist_id: "2",
    date_of_birth: "2015-06-12",
    theme: "light",
    created_at: new Date().toISOString(),
  }
];
