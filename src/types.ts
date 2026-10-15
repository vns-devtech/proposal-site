export type ReasonCategory = 'all' | 'sweet' | 'playful' | 'habits' | 'deep' | 'future';

export interface Reason {
  id: number;
  text: string;
  category: 'sweet' | 'playful' | 'habits' | 'deep' | 'future';
  isFavorite?: boolean;
}

export interface QuizOption {
  label: string;
  reaction: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface MemoryItem {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  story: string;
  placeholderDesc: string;
  colorGradient: string;
}

export interface EasterEgg {
  id: string;
  title: string;
  description: string;
  secretMessage: string;
  unlocked: boolean;
}
