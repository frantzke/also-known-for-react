"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "./useDebounce";
import { searchMulti } from "@/lib/tmdb-client";
import type { SearchResult } from "@/lib/types";

export function useSearch() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const debouncedQuery = useDebounce(searchText, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    searchMulti(debouncedQuery)
      .then((data) => {
        if (!cancelled) setResults(data);
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const reset = useCallback(() => {
    setSearchText("");
    setResults([]);
    setIsExpanded(false);
    setIsLoading(false);
  }, []);

  const onType = useCallback((text: string) => {
    setSearchText(text);
    setIsExpanded(true);
    if (text.trim()) setIsLoading(true);
  }, []);

  return {
    searchText,
    results,
    isLoading,
    isExpanded,
    setIsExpanded,
    onType,
    reset,
  };
}
