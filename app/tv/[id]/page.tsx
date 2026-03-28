import { fetchTvShow } from "@/lib/tmdb";
import DetailHeader from "@/components/detail/DetailHeader";
import TvInfo from "@/components/detail/TvInfo";
import CastSection from "@/components/detail/CastSection";
import { notFound } from "next/navigation";
import type { CastCredit } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TvPage({ params }: PageProps) {
  const { id } = await params;
  const tvId = parseInt(id, 10);

  if (isNaN(tvId)) notFound();

  let show;
  try {
    show = await fetchTvShow(tvId);
  } catch {
    notFound();
  }

  const cast: CastCredit[] = show.aggregate_credits.cast.map((member) => ({
    id: member.id,
    name: member.name,
    character: member.roles
      .map((r) => r.character)
      .filter(Boolean)
      .join(" / "),
    profile_path: member.profile_path,
    order: member.order,
    credit_id: member.roles[0]?.credit_id ?? "",
  }));

  return (
    <>
      <DetailHeader posterPath={show.poster_path} title={show.name}>
        <TvInfo show={show} />
      </DetailHeader>
      <CastSection cast={cast} />
    </>
  );
}
