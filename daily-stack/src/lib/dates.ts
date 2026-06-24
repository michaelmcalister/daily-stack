import {
  addDays,
  eachDayOfInterval,
  format,
  isAfter,
  isBefore,
  isToday,
  parseISO,
  startOfDay,
  subDays,
} from "date-fns";

export function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function parseDateKey(key: string): Date {
  return parseISO(key);
}

export function getLastNDays(n: number): Date[] {
  const end = startOfDay(new Date());
  const start = subDays(end, n - 1);
  return eachDayOfInterval({ start, end });
}

export function getWeeksGrid(days: number): Date[][] {
  const allDays = getLastNDays(days);
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  for (const day of allDays) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

export function isFutureDate(date: Date): boolean {
  return isAfter(startOfDay(date), startOfDay(new Date()));
}

export function isPastDate(date: Date): boolean {
  return isBefore(startOfDay(date), startOfDay(new Date())) && !isToday(date);
}

export function formatDisplayDate(date: Date): string {
  return format(date, "MMM d, yyyy");
}

export function formatShortDay(date: Date): string {
  return format(date, "EEE");
}

export function getTodayKey(): string {
  return toDateKey(new Date());
}

export function addDayToKey(key: string, delta: number): string {
  return toDateKey(addDays(parseDateKey(key), delta));
}
