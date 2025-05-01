
// Base user types from the database schema
export type UserRole = 'admin' | 'therapist' | 'patient';
export type TherapyMode = 'oral' | 'written'; 

// User profile common properties
export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  avatar_url?: string;
  theme: string;
  created_at: string;
}

// Therapist specific properties
export interface Therapist extends UserProfile {
  role: 'therapist';
  license_tier: string;
  active: boolean;
  specialty?: string;
  created_by?: string;
}

// Patient specific properties
export interface Patient extends UserProfile {
  role: 'patient';
  therapist_id?: string;
  date_of_birth?: string;
  notes?: string;
}

// Admin specific properties
export interface Admin extends UserProfile {
  role: 'admin';
}

// Exercise definition
export interface Exercise {
  id: number;
  slug: string;
  title: string;
  description?: string;
  mode: TherapyMode;
  difficulty: number;
  json_meta: Record<string, any>;
  active: boolean;
  created_at: string;
}

// Exercise assignment
export interface Assignment {
  id: string;
  patient_id: string;
  exercise_id: number;
  level: number;
  active: boolean;
  created_by?: string;
  created_at: string;
}

// Exercise result
export interface ExerciseResult {
  id: string;
  assignment_id: string;
  score: number;
  duration_ms: number;
  answers: Record<string, any>;
  created_at: string;
}
