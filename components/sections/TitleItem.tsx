"use client";

import Link from "next/link";
import PosterImage from "@/components/ui/PosterImage";
import type { SearchResult } from "@/lib/types";

interface TitleItemProps {
  title: SearchResult;
  onItemClicked: () => void;
}

function getSubtitle(title: SearchResult): string {
  if (title.media_type === "movie" && title.release_date) {
    return `Movie (${title.release_date.substring(0, 4)})`;
  }
  if (title.media_type === "tv" && title.first_air_date) {
    return `TV (${title.first_air_date.substring(0, 4)})`;
  }
  if (title.media_type === "person" && title.known_for_department) {
    return title.known_for_department;
  }
  return "";
}

function getRoute(title: SearchResult): string {
  const routes: Record<string, string> = {
    movie: `/movie/${title.id}`,
    tv: `/tv/${title.id}`,
    person: `/person/${title.id}`,
  };
  return routes[title.media_type] || "/";
}

export default function TitleItem({ title, onItemClicked }: TitleItemProps) {
  const posterPath = title.poster_path || title.profile_path;
  const name = title.title || title.name || "";

  return (
    <>
      <Link
        href={getRoute(title)}
        className="flex py-4 hover:bg-hover transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        onClick={onItemClicked}
      >
        <div className="w-24 shrink-0">
          <PosterImage posterPath={posterPath} alt={name} size="sm" />
        </div>
        <div className="px-4 py-2">
          <h2 className="text-base font-normal">{name}</h2>
          <p className="text-base font-light text-neutral-400">
            {getSubtitle(title)}
          </p>
        </div>
      </Link>
      <hr className="border-neutral-700" />
    </>
  );
}
