// Client-side TMDB API calls — goes through /api/tmdb proxy

import type {
  TMDBListResponse,
  SearchResult,
  TMDBPerson,
  TMDBCreditResponse,
} from "./types";

async function clientFetch<T>(path: string): Promise<T> {
  const res = await fetch(`/api/tmdb${path}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function searchMulti(query: string): Promise<SearchResult[]> {
  const encoded = encodeURIComponent(query);
  const data = await clientFetch<TMDBListResponse<SearchResult>>(
    `/search/multi?query=${encoded}&include_adult=false&language=en-US&page=1`,
  );
  return data.results.sort((a, b) => b.popularity - a.popularity);
}

export async function fetchPersonWithCredits(id: number): Promise<TMDBPerson> {
  return clientFetch<TMDBPerson>(
    `/person/${encodeURIComponent(id)}?append_to_response=combined_credits&language=en-US`,
  );
}

export async function fetchCredit(
  creditId: string,
): Promise<TMDBCreditResponse> {
  return clientFetch<TMDBCreditResponse>(
    `/credit/${encodeURIComponent(creditId)}`,
  );
}
