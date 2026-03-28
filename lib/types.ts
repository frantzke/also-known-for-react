// TMDB API response types

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: Genre[];
  credits: {
    cast: CastCredit[];
    crew: CrewCredit[];
  };
}

export interface TMDBTvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  last_air_date: string;
  vote_average: number;
  vote_count: number;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  genres: Genre[];
  created_by: { id: number; name: string }[];
  credits: {
    cast: CastCredit[];
    crew: CrewCredit[];
  };
}

export interface TMDBPerson {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  known_for_department: string;
  combined_credits: {
    cast: PersonCastCredit[];
    crew: PersonCrewCredit[];
  };
}

export interface CastCredit {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  credit_id: string;
}

export interface CrewCredit {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
}

export interface PersonCastCredit {
  id: number;
  title?: string;
  name?: string;
  character: string;
  poster_path: string | null;
  media_type: "movie" | "tv";
  popularity: number;
  credit_id: string;
}

export interface PersonCrewCredit {
  id: number;
  title?: string;
  name?: string;
  job: string;
  department: string;
  poster_path: string | null;
  media_type: "movie" | "tv";
  popularity: number;
  credit_id: string;
}

// A cast member with their full person details + filmography
export interface CastMemberWithCredits {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  combined_credits: {
    cast: PersonCastCredit[];
    crew: PersonCrewCredit[];
  };
}

export interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv" | "person";
  poster_path: string | null;
  profile_path: string | null;
  release_date?: string;
  first_air_date?: string;
  known_for_department?: string;
  popularity: number;
}

export interface TMDBListResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface TMDBCreditResponse {
  media_type: "movie" | "tv";
  id: string;
  media: {
    id: number;
  };
}
