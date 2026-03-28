"use client";

import { X } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import TitleItem from "@/components/sections/TitleItem";
import type { SearchResult } from "@/lib/types";

interface SearchOverlayProps {
  searchText: string;
  results: SearchResult[];
  isLoading: boolean;
  onType: (text: string) => void;
  onClose: () => void;
  onItemClicked: () => void;
}

export default function SearchOverlay({
  searchText,
  results,
  isLoading,
  onType,
  onClose,
  onItemClicked,
}: SearchOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black overflow-auto">
      <div className="sticky top-0 z-10 flex items-center bg-surface px-4 py-2">
        <input
          type="text"
          placeholder="Search Movies, TV Shows, and People"
          value={searchText}
          onChange={(e) => onType(e.target.value)}
          autoFocus
          className="flex-1 bg-white text-black rounded px-4 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <button
          onClick={onClose}
          className="ml-2 p-2 text-white"
          aria-label="Close search"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="bg-surface">
        {isLoading && <Skeleton variant="list-item" />}
        {results.map((title) => (
          <TitleItem
            key={title.id}
            title={title}
            onItemClicked={onItemClicked}
          />
        ))}
      </div>
    </div>
  );
}
