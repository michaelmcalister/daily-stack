import type { AppData, Habit } from "@/types/habit";
import { DEFAULT_HABITS, STORAGE_KEY } from "./defaults";

function createId(): string {
  return crypto.randomUUID();
}

function createDefaultData(): AppData {
  const now = new Date().toISOString();
  return {
    habits: DEFAULT_HABITS.map((habit) => ({
      ...habit,
      id: createId(),
      createdAt: now,
    })),
    completions: [],
  };
}

export function loadData(): AppData {
  if (typeof window === "undefined") {
    return createDefaultData();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultData();

    const parsed = JSON.parse(raw) as AppData;
    if (!parsed.habits?.length) return createDefaultData();

    return parsed;
  } catch {
    return createDefaultData();
  }
}

export function saveData(data: AppData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function createHabit(
  name: string,
  icon: Habit["icon"],
  color: string
): Habit {
  return {
    id: createId(),
    name,
    icon,
    color,
    createdAt: new Date().toISOString(),
  };
}
