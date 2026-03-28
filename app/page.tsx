import { fetchList } from "@/lib/tmdb";
import type { SearchResult } from "@/lib/types";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

interface ListConfig {
  key: string;
  header: string;
  subheader: string;
  apiPath: string;
  mediaType?: string;
}

const LIST_CONFIGS: ListConfig[] = [
  {
    key: "trending",
    header: "Trending",
    subheader: "Trending this week",
    apiPath: "/trending/all/week",
  },
  {
    key: "playing",
    header: "Now Playing",
    subheader: "Currently in theaters",
    apiPath: "/movie/now_playing",
    mediaType: "movie",
  },
  {
    key: "popular",
    header: "Popular",
    subheader: "Popular movies",
    apiPath: "/movie/popular",
    mediaType: "movie",
  },
  {
    key: "upcoming",
    header: "Upcoming",
    subheader: "Coming soon to theaters",
    apiPath: "/movie/upcoming",
    mediaType: "movie",
  },
  {
    key: "topTV",
    header: "Top Rated TV",
    subheader: "Highest rated TV shows",
    apiPath: "/tv/top_rated",
    mediaType: "tv",
  },
  {
    key: "popularPeople",
    header: "Popular People",
    subheader: "Popular actors and actresses",
    apiPath: "/person/popular",
    mediaType: "person",
  },
];

export default async function Home() {
  const results = await Promise.allSettled(
    LIST_CONFIGS.map((config) => fetchList<SearchResult>(config.apiPath)),
  );

  const lists = LIST_CONFIGS.map((config, i) => {
    const result = results[i];
    return {
      ...config,
      titles: result?.status === "fulfilled" ? result.value : [],
    };
  });

  return <HomeContent lists={lists} />;
}
