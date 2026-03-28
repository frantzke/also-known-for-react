"use client";

import { useRouter } from "next/navigation";
import PosterCard from "@/components/ui/PosterCard";
import Divider from "@/components/ui/Divider";
import { fetchCredit } from "@/lib/tmdb-client";
import type { PersonCastCredit, PersonCrewCredit } from "@/lib/types";

interface CreditsGridProps {
  title: string;
  credits: (PersonCastCredit | PersonCrewCredit)[];
}

function getName(credit: PersonCastCredit | PersonCrewCredit): string {
  return credit.title || credit.name || "";
}

function getRole(credit: PersonCastCredit | PersonCrewCredit): string {
  if ("character" in credit) return credit.character;
  if ("job" in credit) return credit.job;
  return "";
}

export default function CreditsGrid({ title, credits }: CreditsGridProps) {
  const router = useRouter();

  if (credits.length === 0) return null;

  const handleClick = async (id: number, creditId: string) => {
    try {
      const credit = await fetchCredit(creditId);
      if (credit.media_type === "movie") {
        router.push(`/movie/${credit.media?.id || id}`);
      } else {
        router.push(`/tv/${credit.media?.id || id}`);
      }
    } catch {
      router.push(`/movie/${id}`);
    }
  };

  return (
    <section>
      <Divider />
      <h3 className="text-2xl font-light mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {credits.map((credit, index) => (
          <PosterCard
            key={`${credit.id}-${credit.credit_id}-${index}`}
            posterPath={credit.poster_path}
            name={getName(credit)}
            role={getRole(credit)}
            onClick={() => handleClick(credit.id, credit.credit_id)}
          />
        ))}
      </div>
    </section>
  );
}
