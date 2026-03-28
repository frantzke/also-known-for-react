"use client";

import TitleList from "@/components/sections/TitleList";
import type { SearchResult } from "@/lib/types";

interface ListData {
  key: string;
  header: string;
  subheader: string;
  mediaType?: string;
  titles: SearchResult[];
}

interface HomeContentProps {
  lists: ListData[];
}

export default function HomeContent({ lists }: HomeContentProps) {
  return (
    <div className="py-8">
      {lists.map((list) => (
        <TitleList
          key={list.key}
          header={list.header}
          subheader={list.subheader}
          titles={list.titles}
          mediaType={list.mediaType}
        />
      ))}
    </div>
  );
}
