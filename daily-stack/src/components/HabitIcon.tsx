import type { CSSProperties } from "react";
import type { HabitIcon } from "@/types/habit";
import {
  Activity,
  Apple,
  BookOpen,
  Code2,
  Dumbbell,
  Droplets,
  Flame,
  Heart,
  Moon,
  PersonStanding,
  Sparkles,
} from "lucide-react";

const ICON_MAP: Record<
  HabitIcon,
  React.ComponentType<{ className?: string; style?: CSSProperties }>
> = {
  running: PersonStanding,
  dumbbell: Dumbbell,
  activity: Activity,
  apple: Apple,
  book: BookOpen,
  heart: Heart,
  moon: Moon,
  water: Droplets,
  meditation: Sparkles,
  code: Code2,
};

export const ICON_OPTIONS: { value: HabitIcon; label: string }[] = [
  { value: "running", label: "Running" },
  { value: "dumbbell", label: "Gym" },
  { value: "activity", label: "Exercise" },
  { value: "apple", label: "Nutrition" },
  { value: "book", label: "Learning" },
  { value: "heart", label: "Wellness" },
  { value: "moon", label: "Sleep" },
  { value: "water", label: "Hydration" },
  { value: "meditation", label: "Mindfulness" },
  { value: "code", label: "Coding" },
];

export function HabitIconDisplay({
  icon,
  className,
  style,
}: {
  icon: HabitIcon;
  className?: string;
  style?: CSSProperties;
}) {
  const Icon = ICON_MAP[icon] ?? Flame;
  return <Icon className={className} style={style} />;
}
