"use client";

import Skeleton from "@/components/ui/Skeleton";
import TitleItem from "@/components/sections/TitleItem";
import type { SearchResult } from "@/lib/types";

interface SearchDropdownProps {
  results: SearchResult[];
  isLoading: boolean;
  isExpanded: boolean;
  onItemClicked: () => void;
}

export default function SearchDropdown({
  results,
  isLoading,
  isExpanded,
  onItemClicked,
}: SearchDropdownProps) {
  if (!isExpanded) return null;

  return (
    <div className="absolute z-10 w-full top-14 left-0 bg-surface flex flex-col rounded-b-lg shadow-lg max-h-[70vh] overflow-y-auto">
      {isLoading && <Skeleton variant="list-item" />}
      {results.map((title) => (
        <TitleItem key={title.id} title={title} onItemClicked={onItemClicked} />
      ))}
    </div>
  );
}
