"use client";

import Image from "next/image";
import { useState } from "react";

interface PosterImageProps {
  posterPath: string | null;
  alt: string;
  size?: "sm" | "md" | "lg";
  fill?: boolean;
  className?: string;
}

const TMDB_SIZES = {
  sm: "w185",
  md: "w342",
  lg: "w500",
} as const;

const DIMENSIONS = {
  sm: { width: 96, height: 144 },
  md: { width: 192, height: 288 },
  lg: { width: 342, height: 513 },
} as const;

export default function PosterImage({
  posterPath,
  alt,
  size = "md",
  fill = false,
  className = "",
}: PosterImageProps) {
  const [hasError, setHasError] = useState(false);

  const src =
    posterPath && !hasError
      ? `https://image.tmdb.org/t/p/${TMDB_SIZES[size]}${posterPath}`
      : "/nopicture.jpg";

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        onError={() => setHasError(true)}
        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
      />
    );
  }

  const { width, height } = DIMENSIONS[size];
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      onError={() => setHasError(true)}
    />
  );
}
