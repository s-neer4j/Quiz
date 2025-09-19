export enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Level {
  name: string;
  difficulty: Difficulty;
  quizLength: number;
  questions: Question[];
}

export interface Language {
  name: string;
  code: string;
  flag: string;
  description: string;
  levels: Level[];
}

export type QuizData = Language[];

export interface User {
  name:string;
  email: string;
  picture: string;
  unlockedAchievements: string[];
  hasSelectedAvatar?: boolean;
  longestStreakEver?: number;
}

export interface QuizResult {
  languageName: string;
  levelName: string;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  date: string; // ISO string format
}

export interface SavedQuizState {
  languageCode: string;
  levelName: string;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  userAnswers: (string | null)[];
}

export interface LeaderboardUser {
  name: string;
  picture: string;
  score: number;
  isCurrentUser?: boolean;
}