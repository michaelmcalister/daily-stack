"use client";

import { useMemo } from "react";
import type { Habit, HabitCompletion } from "@/types/habit";
import {
  formatShortDay,
  getLastNDays,
  isFutureDate,
  toDateKey,
} from "@/lib/dates";

interface ChainGridProps {
  habit: Habit;
  completions: HabitCompletion[];
  days?: number;
  onToggle?: (date: string) => void;
}

export function ChainGrid({
  habit,
  completions,
  days = 84,
  onToggle,
}: ChainGridProps) {
  const completionSet = useMemo(
    () =>
      new Set(
        completions
          .filter((c) => c.habitId === habit.id)
          .map((c) => c.date)
      ),
    [completions, habit.id]
  );

  const dayList = useMemo(() => getLastNDays(days), [days]);

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex min-w-0 flex-col gap-1">
        <div className="mb-1 flex gap-1 pl-8 text-[10px] uppercase tracking-wider text-zinc-500">
          {dayList
            .filter((_, i) => i % 14 === 0)
            .map((day) => (
              <span key={toDateKey(day)} className="w-[52px] shrink-0">
                {formatShortDay(day)}
              </span>
            ))}
        </div>
        <div className="flex gap-1">
          <div className="flex w-7 shrink-0 flex-col justify-around text-[10px] text-zinc-500">
            <span>M</span>
            <span>W</span>
            <span>F</span>
          </div>
          <div className="flex gap-[3px]">
            {Array.from({ length: Math.ceil(days / 7) }, (_, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }, (_, dayIdx) => {
                  const dayIndex = weekIdx * 7 + dayIdx;
                  const day = dayList[dayIndex];
                  if (!day) return <div key={dayIdx} className="h-3 w-3" />;

                  const dateKey = toDateKey(day);
                  const completed = completionSet.has(dateKey);
                  const future = isFutureDate(day);

                  return (
                    <button
                      key={dateKey}
                      type="button"
                      disabled={future || !onToggle}
                      onClick={() => onToggle?.(dateKey)}
                      title={`${dateKey}${completed ? " — done" : ""}`}
                      className={`chain-cell h-3 w-3 rounded-sm transition-all ${
                        future
                          ? "cursor-default bg-zinc-800/40"
                          : onToggle
                            ? "cursor-pointer hover:ring-1 hover:ring-white/30"
                            : "cursor-default"
                      }`}
                      style={{
                        backgroundColor: completed
                          ? habit.color
                          : "rgb(39 39 42)",
                        opacity: completed ? 1 : future ? 0.3 : 0.7,
                        boxShadow: completed
                          ? `0 0 8px ${habit.color}55`
                          : undefined,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
