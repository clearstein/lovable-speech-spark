
import { Exercise, ExerciseCategory, ExerciseAssignment, ExerciseProgress } from "@/types/exercise";

// Mock data for exercise categories
const mockCategories: ExerciseCategory[] = [
  {
    id: "1",
    name: "Langage oral",
    description: "Exercises focused on oral language development",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Compréhension orale",
    description: "Exercises for listening comprehension",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "Mémoire",
    description: "Exercises for memory improvement",
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    name: "Langage écrit",
    description: "Exercises for writing skills",
    created_at: new Date().toISOString()
  }
];

// Mock data for exercises
const mockExercises: Exercise[] = [
  {
    id: "1",
    title: "Word Association Game",
    description: "Find related words to improve vocabulary",
    category_id: "1",
    difficulty: "Easy",
    type: "Interactive",
    content: { words: ["cat", "dog", "bird"] },
    settings: { timeLimit: 60 },
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Listen and Recall",
    description: "Listen to a story and recall details",
    category_id: "2",
    difficulty: "Medium",
    type: "Audio",
    content: { audioUrl: "story1.mp3", questions: [] },
    settings: { pauseEnabled: true },
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Memory Patterns",
    description: "Remember and repeat visual patterns",
    category_id: "3",
    difficulty: "Hard",
    type: "Visual",
    content: { patterns: [] },
    settings: { speed: "medium" },
    created_at: new Date().toISOString()
  }
];

export async function getExerciseCategories(): Promise<ExerciseCategory[]> {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => resolve(mockCategories), 300);
  });
}

export async function getExercises(): Promise<Exercise[]> {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => resolve(mockExercises), 300);
  });
}

export async function getExerciseById(id: string): Promise<Exercise | null> {
  // Simulate API call
  return new Promise(resolve => {
    const exercise = mockExercises.find(ex => ex.id === id) || null;
    setTimeout(() => resolve(exercise), 200);
  });
}

export async function createExercise(exercise: Partial<Exercise>): Promise<Exercise> {
  // Simulate API call
  return new Promise(resolve => {
    const newExercise: Exercise = {
      id: Math.random().toString(36).substring(2, 9),
      title: exercise.title || "New Exercise",
      category_id: exercise.category_id || "1",
      difficulty: exercise.difficulty || "Medium",
      type: exercise.type || "Interactive",
      content: exercise.content || {},
      settings: exercise.settings || {},
      description: exercise.description,
      created_at: new Date().toISOString(),
      created_by: exercise.created_by
    };
    
    mockExercises.push(newExercise);
    setTimeout(() => resolve(newExercise), 300);
  });
}

export async function updateExercise(id: string, exercise: Partial<Exercise>): Promise<Exercise> {
  // Simulate API call
  return new Promise(resolve => {
    const existingExerciseIndex = mockExercises.findIndex(ex => ex.id === id);
    if (existingExerciseIndex !== -1) {
      const updatedExercise = { 
        ...mockExercises[existingExerciseIndex], 
        ...exercise 
      } as Exercise;
      
      mockExercises[existingExerciseIndex] = updatedExercise;
      setTimeout(() => resolve(updatedExercise), 300);
    } else {
      // Return the original exercise if not found
      setTimeout(() => resolve(mockExercises[0]), 300);
    }
  });
}

export async function deleteExercise(id: string): Promise<void> {
  // Simulate API call
  return new Promise(resolve => {
    const index = mockExercises.findIndex(ex => ex.id === id);
    if (index !== -1) {
      mockExercises.splice(index, 1);
    }
    setTimeout(() => resolve(), 200);
  });
}

export async function getAssignments(patientId?: string): Promise<ExerciseAssignment[]> {
  // Simulate API call with empty array for now
  return new Promise(resolve => {
    setTimeout(() => resolve([]), 200);
  });
}

export async function createAssignment(assignment: Partial<ExerciseAssignment>): Promise<ExerciseAssignment> {
  // Simulate API call
  return new Promise(resolve => {
    const newAssignment: ExerciseAssignment = {
      id: Math.random().toString(36).substring(2, 9),
      exercise_id: assignment.exercise_id || "1",
      patient_id: assignment.patient_id || "1",
      therapist_id: assignment.therapist_id,
      status: assignment.status || "assigned",
      due_date: assignment.due_date,
      created_at: new Date().toISOString(),
      completed_at: undefined
    };
    setTimeout(() => resolve(newAssignment), 300);
  });
}

export async function getProgressForPatient(patientId: string): Promise<ExerciseProgress[]> {
  // Simulate API call with empty array for now
  return new Promise(resolve => {
    setTimeout(() => resolve([]), 200);
  });
}

export async function saveExerciseProgress(progress: Partial<ExerciseProgress>): Promise<ExerciseProgress> {
  // Simulate API call
  return new Promise(resolve => {
    const newProgress: ExerciseProgress = {
      id: Math.random().toString(36).substring(2, 9),
      patient_id: progress.patient_id || "1",
      exercise_id: progress.exercise_id || "1",
      score: progress.score,
      duration: progress.duration,
      answers: progress.answers,
      feedback: progress.feedback,
      created_at: new Date().toISOString(),
      assignment_id: progress.assignment_id
    };
    setTimeout(() => resolve(newProgress), 300);
  });
}
