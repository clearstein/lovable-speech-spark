
export type UserRole = 'admin' | 'therapist' | 'patient';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

export interface AdminUser extends User {
  role: 'admin';
}

export interface TherapistUser extends User {
  role: 'therapist';
  licenceTier: 'basic' | 'premium' | 'enterprise';
  active: boolean;
}

export interface PatientUser extends User {
  role: 'patient';
  therapistId: string;
  dateOfBirth?: string;
  avatar: string;
}
