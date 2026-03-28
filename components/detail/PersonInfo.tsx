import Chip from "@/components/ui/Chip";
import Divider from "@/components/ui/Divider";
import type { TMDBPerson } from "@/lib/types";

interface PersonInfoProps {
  person: TMDBPerson;
}

export default function PersonInfo({ person }: PersonInfoProps) {
  return (
    <>
      <h2 className="text-2xl md:text-4xl lg:text-6xl font-light mb-2">
        {person.name}
      </h2>
      {person.biography && (
        <p className="text-base font-light text-neutral-300 mb-4">
          {person.biography}
        </p>
      )}
      <Divider />
      {person.known_for_department && (
        <div className="mb-2">
          <Chip>{person.known_for_department}</Chip>
        </div>
      )}
      {person.birthday && (
        <p className="text-base mb-1">
          <span className="font-light text-neutral-400">Born </span>
          {person.birthday}
          {person.place_of_birth && (
            <span className="text-neutral-400">
              {" "}
              in {person.place_of_birth}
            </span>
          )}
        </p>
      )}
      {person.deathday && (
        <p className="text-base mb-1">
          <span className="font-light text-neutral-400">Died </span>
          {person.deathday}
        </p>
      )}
    </>
  );
}
