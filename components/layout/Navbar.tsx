"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useSearch } from "@/lib/hooks/useSearch";
import SearchDropdown from "./SearchDropdown";
import SearchOverlay from "./SearchOverlay";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const {
    searchText,
    results,
    isLoading,
    isExpanded,
    setIsExpanded,
    onType,
    reset,
  } = useSearch();
  const [showOverlay, setShowOverlay] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setIsExpanded]);

  const handleItemClicked = () => {
    reset();
    setShowOverlay(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full h-16 bg-surface z-50">
        <div className="flex items-center w-full max-w-[1280px] mx-auto px-6 h-full">
          {/* Logo + title */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/AKF-Logo.ico"
              alt="Also Known For"
              width={40}
              height={40}
            />
            <span className="text-lg font-normal pl-4 hidden sm:inline">
              Also Known For
            </span>
          </Link>

          {/* Desktop search — centered */}
          <div
            ref={searchContainerRef}
            className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 max-w-[640px]"
          >
            <input
              type="text"
              placeholder="Search Movies, TV Shows, and People"
              value={searchText}
              onChange={(e) => onType(e.target.value)}
              onClick={() => setIsExpanded(true)}
              onKeyDown={(e) => e.key === "Enter" && setIsExpanded(true)}
              className="w-full bg-white text-black rounded px-4 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <SearchDropdown
              results={results}
              isLoading={isLoading}
              isExpanded={isExpanded}
              onItemClicked={handleItemClicked}
            />
          </div>

          {/* Mobile search icon */}
          <button
            className="md:hidden ml-auto p-2"
            onClick={() => setShowOverlay(true)}
            aria-label="Search"
          >
            <Search className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile search overlay */}
      {showOverlay && (
        <SearchOverlay
          searchText={searchText}
          results={results}
          isLoading={isLoading}
          onType={onType}
          onClose={() => {
            reset();
            setShowOverlay(false);
          }}
          onItemClicked={handleItemClicked}
        />
      )}
    </>
  );
}
