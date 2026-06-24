"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { HabitIcon } from "@/types/habit";
import { HABIT_COLORS } from "@/lib/defaults";
import { HabitIconDisplay, ICON_OPTIONS } from "./HabitIcon";

interface AddHabitModalProps {
  onAdd: (name: string, icon: HabitIcon, color: string) => void;
}

export function AddHabitButton({ onAdd }: AddHabitModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<HabitIcon>("heart");
  const [color, setColor] = useState(HABIT_COLORS[5]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), icon, color);
    setName("");
    setIcon("heart");
    setColor(HABIT_COLORS[5]);
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 px-6 py-5 text-zinc-400 transition-colors hover:border-zinc-600 hover:bg-zinc-900/50 hover:text-zinc-200"
      >
        <Plus className="h-5 w-5" />
        Add a new habit
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-zinc-100">New habit</h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Morning meditation"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
            autoFocus
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">
            Icon
          </label>
          <div className="flex flex-wrap gap-2">
            {ICON_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setIcon(opt.value)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                  icon === opt.value
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-400"
                    : "border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-zinc-600"
                }`}
                title={opt.label}
              >
                <HabitIconDisplay icon={opt.value} className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">
            Color
          </label>
          <div className="flex flex-wrap gap-2">
            {HABIT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                  color === c ? "border-white scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full rounded-xl bg-emerald-600 py-2.5 font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Create habit
        </button>
      </form>
    </div>
  );
}
