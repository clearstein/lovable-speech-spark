
import { User, UserRole } from "@/types/auth";

export interface AuthContextType {
  currentUser: User | null;
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
  },
  {
    id: "2",
    email: "therapist@speechspark.com",
    password: "therapist123",
    role: "therapist" as UserRole,
    name: "Dr. Emma Johnson",
    licenceTier: "premium",
    active: true,
  },
  {
    id: "3", 
    email: "patient@speechspark.com",
    password: "patient123",
    role: "patient" as UserRole,
    name: "Alex Smith",
    therapistId: "2",
    avatar: "avatar1",
  }
];
