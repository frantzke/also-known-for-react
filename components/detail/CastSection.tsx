"use client";

import { useLazyCast } from "@/lib/hooks/useLazyCast";
import ActorItem from "@/components/sections/ActorItem";
import Spinner from "@/components/ui/Spinner";
import Divider from "@/components/ui/Divider";
import type { CastCredit } from "@/lib/types";

interface CastSectionProps {
  cast: CastCredit[];
}

export default function CastSection({ cast }: CastSectionProps) {
  const { loadedCast, isLoadingMore, hasMore, sentinelRef } = useLazyCast(cast);

  if (cast.length === 0) return null;

  return (
    <section>
      <Divider />
      <h3 className="text-2xl font-light mb-4">Cast</h3>
      {loadedCast.map((actor) => (
        <ActorItem key={actor.id} actor={actor} />
      ))}
      {(isLoadingMore || hasMore) && (
        <div
          ref={sentinelRef}
          className="flex items-center justify-center py-8"
        >
          <Spinner />
        </div>
      )}
    </section>
  );
}
