"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { fetchPersonWithCredits } from "@/lib/tmdb-client";
import type { CastCredit, CastMemberWithCredits } from "@/lib/types";

const BATCH_SIZE = 5;

export function useLazyCast(allCast: CastCredit[]) {
  const [loadedCast, setLoadedCast] = useState<CastMemberWithCredits[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadedCountRef = useRef(0);
  const isLoadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMore = loadedCountRef.current < allCast.length;

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || loadedCountRef.current >= allCast.length)
      return;

    isLoadingRef.current = true;
    setIsLoadingMore(true);
    const start = loadedCountRef.current;
    const batch = allCast.slice(start, start + BATCH_SIZE);

    const promises = batch.map((member) =>
      fetchPersonWithCredits(member.id).then((person) => ({
        id: person.id,
        name: person.name,
        character: member.character,
        profile_path: person.profile_path,
        combined_credits: person.combined_credits,
      })),
    );

    const results = await Promise.allSettled(promises);
    const fulfilled = results
      .filter(
        (r): r is PromiseFulfilledResult<CastMemberWithCredits> =>
          r.status === "fulfilled",
      )
      .map((r) => r.value);

    loadedCountRef.current = start + batch.length;
    setLoadedCast((prev) => [...prev, ...fulfilled]);
    isLoadingRef.current = false;
    setIsLoadingMore(false);
  }, [allCast]);

  // IntersectionObserver for infinite scroll (also handles initial load)
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return { loadedCast, isLoadingMore, hasMore, sentinelRef };
}
