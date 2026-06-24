import type { Habit } from "@/types/habit";

export const DEFAULT_HABITS: Omit<Habit, "id" | "createdAt">[] = [
  { name: "Jogging", icon: "running", color: "#10b981" },
  { name: "Gym", icon: "dumbbell", color: "#f97316" },
  { name: "Push Ups", icon: "activity", color: "#ef4444" },
  { name: "Eating Healthy", icon: "apple", color: "#84cc16" },
  { name: "Education & Training", icon: "book", color: "#3b82f6" },
];

export const HABIT_COLORS = [
  "#10b981",
  "#f97316",
  "#ef4444",
  "#84cc16",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#14b8a6",
  "#eab308",
  "#6366f1",
];

export const STORAGE_KEY = "daily-stack-data";
