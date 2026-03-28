import Chip from "@/components/ui/Chip";
import Divider from "@/components/ui/Divider";
import type { TMDBMovie } from "@/lib/types";

interface MovieInfoProps {
  movie: TMDBMovie;
}

export default function MovieInfo({ movie }: MovieInfoProps) {
  const year = movie.release_date?.substring(0, 4);
  const headerTitle = `${movie.title}${year ? ` (${year})` : ""}`;

  const directors = movie.credits.crew
    .filter((c) => c.job === "Director")
    .map((c) => c.name);

  const writers = movie.credits.crew
    .filter((c) => c.job === "Screenplay" || c.job === "Writer")
    .map((c) => c.name);

  return (
    <>
      <h2 className="text-2xl md:text-4xl lg:text-6xl font-light mb-2">
        {headerTitle}
      </h2>
      <p className="text-base font-light text-neutral-300 mb-4">
        {movie.overview}
      </p>
      <Divider />
      <div className="flex flex-wrap mb-2">
        {movie.genres.map((genre) => (
          <Chip key={genre.id}>{genre.name}</Chip>
        ))}
      </div>
      {directors.length > 0 && (
        <p className="text-base mb-1">
          <span className="font-light text-neutral-400">Directed by </span>
          {directors.join(", ")}
        </p>
      )}
      {writers.length > 0 && (
        <p className="text-base mb-1">
          <span className="font-light text-neutral-400">Written by </span>
          {writers.join(", ")}
        </p>
      )}
      {movie.runtime > 0 && (
        <p className="text-base mb-1">
          <span className="font-light text-neutral-400">Runtime </span>
          {movie.runtime} min
        </p>
      )}
      <p className="text-base mb-1">
        <span className="font-light text-neutral-400">Rating </span>
        {movie.vote_average.toFixed(1)} / 10
        <span className="text-neutral-500 text-sm ml-1">
          ({movie.vote_count} votes)
        </span>
      </p>
    </>
  );
}
