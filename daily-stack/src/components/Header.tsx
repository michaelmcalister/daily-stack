import { Layers } from "lucide-react";

export function Header() {
  return (
    <header className="mb-8">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/20">
          <Layers className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
            Daily Stack
          </h1>
          <p className="text-sm text-zinc-500">
            Don&apos;t break the chain
          </p>
        </div>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
        Stack your daily wins. Mark each habit you complete and build unbroken
        chains of consistency — one day at a time.
      </p>
    </header>
  );
}
