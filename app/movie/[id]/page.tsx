import { fetchMovie } from "@/lib/tmdb";
import DetailHeader from "@/components/detail/DetailHeader";
import MovieInfo from "@/components/detail/MovieInfo";
import CastSection from "@/components/detail/CastSection";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const movieId = parseInt(id, 10);

  if (isNaN(movieId)) notFound();

  let movie;
  try {
    movie = await fetchMovie(movieId);
  } catch {
    notFound();
  }

  return (
    <>
      <DetailHeader posterPath={movie.poster_path} title={movie.title}>
        <MovieInfo movie={movie} />
      </DetailHeader>
      <CastSection cast={movie.credits.cast} />
    </>
  );
}
