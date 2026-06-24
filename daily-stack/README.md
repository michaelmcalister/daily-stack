# Daily Stack

A **don't break the chain** habit tracker. Stack your daily wins and build unbroken streaks across the habits that matter to you.

![Daily Stack](https://img.shields.io/badge/stack-your-habits-emerald)

## Features

- **Chain visualization** — GitHub-style contribution grids show your consistency at a glance
- **Streak tracking** — Current streak, personal best, and total completions per habit
- **Today's Stack** — Quick daily check-off panel for all habits
- **Pre-loaded habits** — Jogging, Gym, Push Ups, Eating Healthy, Education & Training
- **Custom habits** — Add your own with icons and colors
- **Local-first** — Data stays in your browser (no account required)
- **Retroactive logging** — Click any past day on the chain grid to fill gaps

## Getting Started

```bash
cd daily-stack
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- [date-fns](https://date-fns.org/) for date handling
- [Lucide](https://lucide.dev/) icons

## The Method

Inspired by Jerry Seinfeld's "don't break the chain" technique: mark each day you complete a habit. The visual chain of filled squares becomes motivation to keep going — miss a day and the chain breaks.

**Daily Stack** extends this idea by letting you stack multiple habits side by side, each with its own chain, color, and streak stats.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Start production server  |
| `npm run lint` | Run ESLint               |

## License

MIT
