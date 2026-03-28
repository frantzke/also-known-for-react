import Chip from "@/components/ui/Chip";
import Divider from "@/components/ui/Divider";
import type { TMDBTvShow } from "@/lib/types";

interface TvInfoProps {
  show: TMDBTvShow;
}

export default function TvInfo({ show }: TvInfoProps) {
  const year = show.first_air_date?.substring(0, 4);
  const headerTitle = `${show.name}${year ? ` (${year})` : ""}`;

  const createdBy = show.created_by?.map((c) => c.name).join(", ");

  const airingDates = show.last_air_date
    ? `${show.first_air_date} - ${show.last_air_date}`
    : show.first_air_date;

  const runTime =
    show.episode_run_time?.length > 0 ? show.episode_run_time.join(", ") : null;

  return (
    <>
      <h2 className="text-2xl md:text-4xl lg:text-6xl font-light mb-2">
        {headerTitle}
      </h2>
      <p className="text-base font-light text-neutral-300 mb-4">
        {show.overview}
      </p>
      <Divider />
      <div className="flex flex-wrap mb-2">
        {show.genres.map((genre) => (
          <Chip key={genre.id}>{genre.name}</Chip>
        ))}
      </div>
      {createdBy && (
        <p className="text-base mb-1">
          <span className="font-light text-neutral-400">Created by </span>
          {createdBy}
        </p>
      )}
      {airingDates && (
        <p className="text-base mb-1">
          <span className="font-light text-neutral-400">Airing </span>
          {airingDates}
        </p>
      )}
      <p className="text-base mb-1">
        <span className="font-light text-neutral-400">Seasons </span>
        {show.number_of_seasons}
        <span className="font-light text-neutral-400 ml-4">Episodes </span>
        {show.number_of_episodes}
      </p>
      {runTime && (
        <p className="text-base mb-1">
          <span className="font-light text-neutral-400">Episode length </span>
          {runTime} min
        </p>
      )}
      <p className="text-base mb-1">
        <span className="font-light text-neutral-400">Rating </span>
        {show.vote_average.toFixed(1)} / 10
        <span className="text-neutral-500 text-sm ml-1">
          ({show.vote_count} votes)
        </span>
      </p>
    </>
  );
}
