import { fetchTvShow } from "@/lib/tmdb";
import DetailHeader from "@/components/detail/DetailHeader";
import TvInfo from "@/components/detail/TvInfo";
import CastSection from "@/components/detail/CastSection";
import { notFound } from "next/navigation";

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

  return (
    <>
      <DetailHeader posterPath={show.poster_path} title={show.name}>
        <TvInfo show={show} />
      </DetailHeader>
      <CastSection cast={show.credits.cast} />
    </>
  );
}
