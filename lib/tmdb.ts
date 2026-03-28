// Server-side TMDB API client
// Used by Server Components — accesses env vars directly

import type {
  TMDBMovie,
  TMDBTvShow,
  TMDBPerson,
  TMDBListResponse,
  SearchResult,
  TMDBCreditResponse,
} from "./types";

const getConfig = () => {
  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;
  if (!baseUrl || !apiKey) {
    throw new Error("TMDB_BASE_URL and TMDB_API_KEY must be set");
  }
  return { baseUrl, apiKey };
};

async function tmdbFetch<T>(path: string): Promise<T> {
  const { baseUrl, apiKey } = getConfig();
  const url = `${baseUrl}${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
    next: { revalidate: 300 }, // cache for 5 minutes
  });
  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function searchMulti(query: string): Promise<SearchResult[]> {
  const encoded = encodeURIComponent(query);
  const data = await tmdbFetch<TMDBListResponse<SearchResult>>(
    `/search/multi?query=${encoded}&include_adult=false&language=en-US&page=1`,
  );
  return data.results.sort((a, b) => b.popularity - a.popularity);
}

export async function fetchMovie(id: number): Promise<TMDBMovie> {
  return tmdbFetch<TMDBMovie>(
    `/movie/${encodeURIComponent(id)}?append_to_response=credits`,
  );
}

export async function fetchTvShow(id: number): Promise<TMDBTvShow> {
  return tmdbFetch<TMDBTvShow>(
    `/tv/${encodeURIComponent(id)}?append_to_response=credits`,
  );
}

export async function fetchPerson(id: number): Promise<TMDBPerson> {
  return tmdbFetch<TMDBPerson>(
    `/person/${encodeURIComponent(id)}?append_to_response=combined_credits&language=en-US`,
  );
}

export async function fetchCredit(
  creditId: string,
): Promise<TMDBCreditResponse> {
  return tmdbFetch<TMDBCreditResponse>(
    `/credit/${encodeURIComponent(creditId)}`,
  );
}

export async function fetchList<T>(apiPath: string): Promise<T[]> {
  const data = await tmdbFetch<TMDBListResponse<T>>(
    `${apiPath}?language=en-US`,
  );
  if (!data.results) {
    throw new Error(`Fetching ${apiPath} failed`);
  }
  return data.results;
}
