
export interface ExerciseCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  created_at: string;
}

export interface Exercise {
  id: string;
  title: string;
  description?: string;
  category_id: string;
  difficulty: string;
  type: string;
  content: any;
  settings: any;
  created_at: string;
  created_by?: string;
}

export interface ExerciseAssignment {
  id: string;
  exercise_id: string;
  patient_id: string;
  therapist_id?: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  due_date?: string;
  created_at: string;
  completed_at?: string;
}

export interface ExerciseProgress {
  id: string;
  assignment_id?: string;
  patient_id: string;
  exercise_id: string;
  score?: number;
  duration?: number;
  answers?: any;
  feedback?: string;
  created_at: string;
}
