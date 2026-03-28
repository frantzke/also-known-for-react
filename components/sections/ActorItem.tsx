"use client";

import { useRouter } from "next/navigation";
import PosterCard from "@/components/ui/PosterCard";
import Divider from "@/components/ui/Divider";
import Spinner from "@/components/ui/Spinner";
import { fetchCredit } from "@/lib/tmdb-client";
import type { CastMemberWithCredits } from "@/lib/types";

interface ActorItemProps {
  actor: CastMemberWithCredits;
}

export default function ActorItem({ actor }: ActorItemProps) {
  const router = useRouter();
  const sorted = [...(actor.combined_credits?.cast || [])].sort(
    (a, b) =>
      b.vote_count * (b.vote_average / 10) -
      a.vote_count * (a.vote_average / 10),
  );
  const seen = new Set<number>();
  const roles = sorted.filter((role) => {
    if (seen.has(role.id)) return false;
    seen.add(role.id);
    return true;
  });
  const hasNoRoles = roles.length === 0;

  const handleTitleClick = async (id: number, creditId: string) => {
    try {
      const credit = await fetchCredit(creditId);
      if (credit.media_type === "movie") {
        router.push(`/movie/${credit.media?.id || id}`);
      } else {
        router.push(`/tv/${credit.media?.id || id}`);
      }
    } catch {
      // Fallback: try movie route
      router.push(`/movie/${id}`);
    }
  };

  return (
    <div className="w-full">
      <div className="flex py-4 overflow-x-auto overflow-y-hidden scrollbar-gold">
        <PosterCard
          posterPath={actor.profile_path}
          name={actor.name}
          role={actor.character}
          href={`/person/${actor.id}`}
        />
        <Divider vertical accent />
        {hasNoRoles ? (
          <div className="flex items-center justify-center px-8">
            <Spinner />
          </div>
        ) : (
          roles.map((role, index) => (
            <PosterCard
              key={`${actor.id}-${role.id}-${index}`}
              posterPath={role.poster_path}
              name={role.title || role.name || ""}
              role={role.character}
              onClick={() => handleTitleClick(role.id, role.credit_id)}
            />
          ))
        )}
      </div>
      <Divider />
    </div>
  );
}
