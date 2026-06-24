"use client";

import { useCallback, useEffect, useState } from "react";
import type { AppData, Habit, HabitIcon } from "@/types/habit";
import { createHabit, loadData, saveData } from "@/lib/storage";
import { getTodayKey } from "@/lib/dates";

export function useHabits() {
  const [data, setData] = useState<AppData | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setData(loadData());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated && data) {
      saveData(data);
    }
  }, [data, hydrated]);

  const toggleCompletion = useCallback((habitId: string, date?: string) => {
    const dateKey = date ?? getTodayKey();
    setData((prev) => {
      if (!prev) return prev;
      const exists = prev.completions.some(
        (c) => c.habitId === habitId && c.date === dateKey
      );

      return {
        ...prev,
        completions: exists
          ? prev.completions.filter(
              (c) => !(c.habitId === habitId && c.date === dateKey)
            )
          : [...prev.completions, { habitId, date: dateKey }],
      };
    });
  }, []);

  const addHabit = useCallback(
    (name: string, icon: HabitIcon, color: string) => {
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          habits: [...prev.habits, createHabit(name, icon, color)],
        };
      });
    },
    []
  );

  const deleteHabit = useCallback((habitId: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        habits: prev.habits.filter((h) => h.id !== habitId),
        completions: prev.completions.filter((c) => c.habitId !== habitId),
      };
    });
  }, []);

  const updateHabit = useCallback((habitId: string, updates: Partial<Habit>) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        habits: prev.habits.map((h) =>
          h.id === habitId ? { ...h, ...updates } : h
        ),
      };
    });
  }, []);

  const resetData = useCallback(() => {
    localStorage.removeItem("daily-stack-data");
    setData(loadData());
  }, []);

  return {
    data,
    hydrated,
    toggleCompletion,
    addHabit,
    deleteHabit,
    updateHabit,
    resetData,
  };
}
