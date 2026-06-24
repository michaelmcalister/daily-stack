"use client";

import { useHabits } from "@/hooks/useHabits";
import { AddHabitButton } from "@/components/AddHabitModal";
import { HabitCard } from "@/components/HabitCard";
import { Header } from "@/components/Header";
import { TodayPanel } from "@/components/TodayPanel";

export function Dashboard() {
  const {
    data,
    hydrated,
    toggleCompletion,
    addHabit,
    deleteHabit,
  } = useHabits();

  if (!hydrated || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Header />

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <TodayPanel
            habits={data.habits}
            completions={data.completions}
            onToggle={toggleCompletion}
          />
        </aside>

        <main className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Your chains
            </h2>
            <span className="text-xs text-zinc-600">
              Click any square to toggle a day
            </span>
          </div>

          {data.habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completions={data.completions}
              onToggleToday={() => toggleCompletion(habit.id)}
              onToggleDate={(date) => toggleCompletion(habit.id, date)}
              onDelete={
                data.habits.length > 1
                  ? () => deleteHabit(habit.id)
                  : undefined
              }
            />
          ))}

          <AddHabitButton onAdd={addHabit} />
        </main>
      </div>
    </div>
  );
}
