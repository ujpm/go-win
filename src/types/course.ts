export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export interface Step {
  id: string;
  title: string;
  content: string;
  order: number;
  duration: number; // in minutes
  resources?: string[];
  quiz?: Quiz;
}

export interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  order: number;
  steps: Step[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  modules: Module[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  category: string;
  tags: string[];
  prerequisites?: string[];
  estimatedDuration: number; // in hours
}
