<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- The application lives in the `daily-stack/` subdirectory, not the repo root. Run all `npm` commands (`dev`, `build`, `lint`, `start`) from inside `daily-stack/`.
- This is a local-first Next.js 16 app: all habit data is persisted in the browser's `localStorage`. There is no backend, database, or environment variables to configure — `npm run dev` is the only service needed to test end to end.
- Scripts are documented in `daily-stack/README.md` / `daily-stack/package.json`. Dev server runs at http://localhost:3000.
- Note: the `main` branch is an empty stub; the actual codebase lives on the feature branch.
