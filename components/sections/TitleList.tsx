"use client";

import { useRouter } from "next/navigation";
import PosterCard from "@/components/ui/PosterCard";
import Skeleton from "@/components/ui/Skeleton";
import type { SearchResult } from "@/lib/types";

interface TitleListProps {
  header: string;
  subheader: string;
  titles: SearchResult[];
  mediaType?: string;
}

function getName(title: SearchResult): string {
  return title.title || title.name || "";
}

function getPosterPath(title: SearchResult): string | null {
  return title.poster_path || title.profile_path;
}

export default function TitleList({
  header,
  subheader,
  titles,
  mediaType,
}: TitleListProps) {
  const router = useRouter();
  const isLoaded = titles && titles.length > 0;

  const handleClick = (id: number, itemMediaType?: string) => {
    const type = itemMediaType || mediaType;
    const routes: Record<string, string> = {
      person: `/person/${id}`,
      tv: `/tv/${id}`,
      movie: `/movie/${id}`,
    };
    router.push(routes[type || "movie"] || `/movie/${id}`);
  };

  return (
    <section className="pb-8">
      <h3 className="text-3xl md:text-5xl font-light pl-2 border-l-[0.5rem] border-primary">
        {header}
      </h3>
      <h5 className="text-lg font-light text-neutral-400 mt-1 mb-4">
        {subheader}
      </h5>
      <div className="flex py-4 overflow-x-auto overflow-y-hidden scrollbar-gold">
        {!isLoaded
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
          : titles.map((title) => (
              <PosterCard
                key={title.id}
                posterPath={getPosterPath(title)}
                name={getName(title)}
                onClick={() => handleClick(title.id, title.media_type)}
              />
            ))}
      </div>
    </section>
  );
}
