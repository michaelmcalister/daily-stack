import { addDays, parseISO } from "date-fns";
import type { HabitCompletion } from "@/types/habit";
import { toDateKey } from "./dates";

function getCompletionSet(
  completions: HabitCompletion[],
  habitId: string
): Set<string> {
  return new Set(
    completions.filter((c) => c.habitId === habitId).map((c) => c.date)
  );
}

function getSortedDates(completionSet: Set<string>): string[] {
  return Array.from(completionSet).sort();
}

function countStreakEndingOn(
  completionSet: Set<string>,
  endDate: string
): number {
  if (!completionSet.has(endDate)) return 0;

  let streak = 0;
  let cursor = endDate;

  while (completionSet.has(cursor)) {
    streak += 1;
    const prev = toDateKey(addDays(parseISO(cursor), -1));
    cursor = prev;
  }

  return streak;
}

function longestStreakFromDates(dates: string[]): number {
  if (dates.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const prev = parseISO(dates[i - 1]);
    const expected = toDateKey(addDays(prev, 1));

    if (dates[i] === expected) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

export function getHabitStats(
  completions: HabitCompletion[],
  habitId: string
): {
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completedToday: boolean;
} {
  const completionSet = getCompletionSet(completions, habitId);
  const today = toDateKey(new Date());
  const yesterday = toDateKey(addDays(new Date(), -1));

  const streakFromToday = countStreakEndingOn(completionSet, today);
  const streakFromYesterday = countStreakEndingOn(completionSet, yesterday);

  const currentStreak = Math.max(streakFromToday, streakFromYesterday);
  const sortedDates = getSortedDates(completionSet);

  return {
    currentStreak,
    longestStreak: longestStreakFromDates(sortedDates),
    totalCompletions: completionSet.size,
    completedToday: completionSet.has(today),
  };
}

export function getOverallStats(
  completions: HabitCompletion[],
  habitIds: string[]
): {
  totalChainsActive: number;
  bestStreak: number;
  completedToday: number;
} {
  let bestStreak = 0;
  let completedToday = 0;
  let totalChainsActive = 0;

  for (const habitId of habitIds) {
    const stats = getHabitStats(completions, habitId);
    bestStreak = Math.max(bestStreak, stats.currentStreak);
    if (stats.completedToday) completedToday += 1;
    if (stats.currentStreak > 0) totalChainsActive += 1;
  }

  return { totalChainsActive, bestStreak, completedToday };
}
