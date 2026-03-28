# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Dev server with Turbopack (port 3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # ESLint
npm run typecheck        # tsc --noEmit

# E2E tests (Playwright)
npm run test:e2e         # Run all projects (old-app on :3000, new-app on :3001)
npm run test:e2e:new     # Run new-app project only
npx playwright test --config=e2e/playwright.config.ts --project=new-app -g "test name"  # Single test
```

## Environment

Requires TMDB API credentials — see `.env.example`:

- `TMDB_BASE_URL` — TMDB API base URL
- `TMDB_API_KEY` — Bearer token for TMDB authentication

## Architecture

Next.js 16 App Router with React 19. Movie/TV discovery app powered by TMDB API.

### TMDB API Proxy Pattern

Two API clients exist to keep the TMDB API key server-side:

- **`lib/tmdb.ts`** — Server-side client. Called from Server Components and route handlers. Makes direct TMDB API requests with Bearer token auth and 5-minute `force-cache` revalidation.
- **`lib/tmdb-client.ts`** — Client-side client. Called from Client Components. Routes all requests through `/api/tmdb/[...path]` which proxies to TMDB, so the API key never reaches the browser.
- **`app/api/tmdb/[...path]/route.ts`** — The catch-all proxy route that forwards client requests to TMDB.

### Routes

- `/` — Home page with trending movies/TV/people sections (force-dynamic, fetched with Promise.allSettled)
- `/movie/[id]` — Movie detail with cast
- `/tv/[id]` — TV show detail with cast
- `/person/[id]` — Person detail with filmography credits

### Search System

- `useSearch` hook debounces input (500ms via `useDebounce`) and fetches multi-search results from the client-side TMDB client
- Desktop: `SearchDropdown` inline in Navbar
- Mobile: `SearchIcon` opens `SearchOverlay` full-screen

### Lazy Cast Loading

`useLazyCast` hook loads actor details in batches of 5 using IntersectionObserver for infinite scroll on detail pages.

## Tailwind Theme

Dark theme with custom breakpoints different from Tailwind defaults:

- `sm`: 600px, `md`: 960px, `lg`: 1264px
- Primary color: `--color-primary` (#fbc02d gold)
- Surface: `--color-surface` (rgb(18,18,18))
- Defined in `app/globals.css`

## Types

All TMDB types live in `lib/types.ts`. Path alias `@/*` maps to the project root.
