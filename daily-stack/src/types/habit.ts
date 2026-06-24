export type HabitIcon =
  | "running"
  | "dumbbell"
  | "activity"
  | "apple"
  | "book"
  | "heart"
  | "moon"
  | "water"
  | "meditation"
  | "code";

export interface Habit {
  id: string;
  name: string;
  icon: HabitIcon;
  color: string;
  createdAt: string;
}

export interface HabitCompletion {
  habitId: string;
  date: string;
}

export interface AppData {
  habits: Habit[];
  completions: HabitCompletion[];
}

export interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completedToday: boolean;
}
