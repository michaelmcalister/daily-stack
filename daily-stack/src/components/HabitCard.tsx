"use client";

import { Flame, Trophy, Zap } from "lucide-react";
import type { Habit, HabitCompletion } from "@/types/habit";
import { getHabitStats } from "@/lib/streaks";
import { HabitIconDisplay } from "./HabitIcon";
import { ChainGrid } from "./ChainGrid";

interface HabitCardProps {
  habit: Habit;
  completions: HabitCompletion[];
  onToggleToday: () => void;
  onToggleDate: (date: string) => void;
  onDelete?: () => void;
}

export function HabitCard({
  habit,
  completions,
  onToggleToday,
  onToggleDate,
  onDelete,
}: HabitCardProps) {
  const stats = getHabitStats(completions, habit.id);

  return (
    <article className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 backdrop-blur-sm transition-colors hover:border-zinc-700/80">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${habit.color}22`,
              color: habit.color,
            }}
          >
            <HabitIconDisplay icon={habit.icon} className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-zinc-100">{habit.name}</h3>
            <p className="text-sm text-zinc-500">
              {stats.completedToday ? "Chain extended today" : "Mark today to keep the chain"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleToday}
          className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
            stats.completedToday
              ? "text-white shadow-lg"
              : "border border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-750"
          }`}
          style={
            stats.completedToday
              ? {
                  backgroundColor: habit.color,
                  boxShadow: `0 4px 20px ${habit.color}44`,
                }
              : undefined
          }
        >
          {stats.completedToday ? "Done ✓" : "Mark done"}
        </button>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <StatPill
          icon={<Flame className="h-3.5 w-3.5" style={{ color: habit.color }} />}
          label="Current"
          value={stats.currentStreak}
          suffix="days"
        />
        <StatPill
          icon={<Trophy className="h-3.5 w-3.5 text-amber-400" />}
          label="Best"
          value={stats.longestStreak}
          suffix="days"
        />
        <StatPill
          icon={<Zap className="h-3.5 w-3.5 text-sky-400" />}
          label="Total"
          value={stats.totalCompletions}
          suffix="days"
        />
      </div>

      <ChainGrid
        habit={habit}
        completions={completions}
        onToggle={onToggleDate}
      />

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="mt-4 text-xs text-zinc-600 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
        >
          Remove habit
        </button>
      )}
    </article>
  );
}

function StatPill({
  icon,
  label,
  value,
  suffix,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-950/50 px-3 py-2">
      <div className="mb-0.5 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-zinc-500">
        {icon}
        {label}
      </div>
      <div className="text-lg font-semibold tabular-nums text-zinc-100">
        {value}
        <span className="ml-1 text-xs font-normal text-zinc-500">{suffix}</span>
      </div>
    </div>
  );
}
