# Also Known For

A movie and TV discovery app built with Next.js and the TMDB API. Browse trending titles, explore actor filmographies, and search across movies, TV shows, and people.

## Features

- **Trending & curated lists** — Now Playing, Popular, Upcoming, and Top Rated sections on the home page
- **Movie & TV detail pages** — Overview, metadata, and full cast
- **Person pages** — Biography and filmography with lazy-loaded credits
- **Search** — Debounced multi-search with desktop dropdown and mobile full-screen overlay
- **Infinite scroll cast loading** — Actor details fetched in batches via IntersectionObserver

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5.9**
- **Tailwind CSS 4**

## Getting Started

### Prerequisites

- Node.js 18+
- A [TMDB API](https://developer.themoviedb.org/) account and Bearer token

### Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

Add your TMDB credentials to `.env.local`:

```
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_bearer_token_here
```

### Development

```bash
npm run dev        # Start dev server on http://localhost:3000
```

### Production

```bash
npm run build
npm run start
```

### Linting & Type Checking

```bash
npm run lint
npm run typecheck
```

### E2E Tests

```bash
npm run test:e2e       # All test projects
npm run test:e2e:new   # New app tests only
```

## Architecture

The TMDB API key is kept server-side using a proxy pattern:

- **Server Components** call TMDB directly via `lib/tmdb.ts` (with 5-minute cache)
- **Client Components** call `/api/tmdb/[...path]` which proxies requests to TMDB via `lib/tmdb-client.ts`

### Routes

| Route          | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `/`            | Home — trending, now playing, popular, upcoming, top rated |
| `/movie/[id]`  | Movie detail with cast                                     |
| `/tv/[id]`     | TV show detail with cast                                   |
| `/person/[id]` | Person detail with filmography                             |
