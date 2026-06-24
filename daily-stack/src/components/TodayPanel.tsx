"use client";

import type { CSSProperties } from "react";
import { Check, Flame, Layers, Link2 } from "lucide-react";
import type { Habit, HabitCompletion } from "@/types/habit";
import { getHabitStats, getOverallStats } from "@/lib/streaks";
import { HabitIconDisplay } from "./HabitIcon";

interface TodayPanelProps {
  habits: Habit[];
  completions: HabitCompletion[];
  onToggle: (habitId: string) => void;
}

export function TodayPanel({ habits, completions, onToggle }: TodayPanelProps) {
  const overall = getOverallStats(
    completions,
    habits.map((h) => h.id)
  );

  return (
    <section className="rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-6 backdrop-blur-sm">
      <div className="mb-5 flex items-center gap-2">
        <Layers className="h-5 w-5 text-emerald-400" />
        <h2 className="text-lg font-semibold text-zinc-100">Today&apos;s Stack</h2>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-3">
        <OverviewStat
          icon={<Check className="h-4 w-4 text-emerald-400" />}
          label="Done today"
          value={`${overall.completedToday}/${habits.length}`}
        />
        <OverviewStat
          icon={<Flame className="h-4 w-4 text-orange-400" />}
          label="Best streak"
          value={`${overall.bestStreak}d`}
        />
        <OverviewStat
          icon={<Link2 className="h-4 w-4 text-sky-400" />}
          label="Active chains"
          value={String(overall.totalChainsActive)}
        />
      </div>

      <div className="space-y-2">
        {habits.map((habit) => {
          const { completedToday } = getHabitStats(completions, habit.id);
          return (
            <button
              key={habit.id}
              type="button"
              onClick={() => onToggle(habit.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                completedToday
                  ? "border bg-zinc-800/80"
                  : "bg-zinc-950/50 hover:bg-zinc-800/40"
              }`}
              style={
                completedToday
                  ? ({ borderColor: `${habit.color}55` } as CSSProperties)
                  : undefined
              }
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  completedToday ? "text-white" : ""
                }`}
                style={{
                  backgroundColor: completedToday
                    ? habit.color
                    : `${habit.color}22`,
                  color: completedToday ? "white" : habit.color,
                }}
              >
                {completedToday ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <HabitIconDisplay icon={habit.icon} className="h-4 w-4" />
                )}
              </div>
              <span
                className={`flex-1 font-medium ${
                  completedToday ? "text-zinc-100" : "text-zinc-300"
                }`}
              >
                {habit.name}
              </span>
              {completedToday && (
                <span
                  className="text-xs font-medium"
                  style={{ color: habit.color }}
                >
                  +1 day
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function OverviewStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-950/60 px-3 py-3 text-center">
      <div className="mb-1 flex justify-center">{icon}</div>
      <div className="text-lg font-bold tabular-nums text-zinc-100">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-zinc-500">
        {label}
      </div>
    </div>
  );
}
