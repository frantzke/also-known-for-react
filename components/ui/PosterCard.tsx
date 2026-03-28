"use client";

import Link from "next/link";
import PosterImage from "./PosterImage";

interface PosterCardProps {
  posterPath: string | null;
  name: string;
  role?: string;
  href?: string;
  onClick?: () => void;
}

const sharedClasses =
  "w-48 mx-2 shrink-0 hover:scale-[1.03] transition-transform focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded";

function CardContent({
  posterPath,
  name,
  trimmedRole,
}: {
  posterPath: string | null;
  name: string;
  trimmedRole: string | undefined;
}) {
  return (
    <>
      <PosterImage posterPath={posterPath} alt={name} size="md" />
      <p className="text-base mt-1 mb-0 truncate">{name}</p>
      {trimmedRole && (
        <p className="text-sm font-light text-primary mb-0">As {trimmedRole}</p>
      )}
    </>
  );
}

export default function PosterCard({
  posterPath,
  name,
  role,
  href,
  onClick,
}: PosterCardProps) {
  const trimmedRole =
    role && role.length > 100 ? `${role.substring(0, 97)}...` : role;

  if (href) {
    return (
      <Link href={href} className={sharedClasses}>
        <CardContent
          posterPath={posterPath}
          name={name}
          trimmedRole={trimmedRole}
        />
      </Link>
    );
  }

  return (
    <button type="button" className={sharedClasses} onClick={onClick}>
      <CardContent
        posterPath={posterPath}
        name={name}
        trimmedRole={trimmedRole}
      />
    </button>
  );
}
