import { fetchPerson } from "@/lib/tmdb";
import DetailHeader from "@/components/detail/DetailHeader";
import PersonInfo from "@/components/detail/PersonInfo";
import CreditsGrid from "@/components/detail/CreditsGrid";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PersonPage({ params }: PageProps) {
  const { id } = await params;
  const personId = parseInt(id, 10);

  if (isNaN(personId)) notFound();

  let person;
  try {
    person = await fetchPerson(personId);
  } catch {
    notFound();
  }

  const knownForScore = (c: { vote_count: number; vote_average: number }) =>
    c.vote_count * (c.vote_average / 10);

  const castCredits = [...person.combined_credits.cast].sort(
    (a, b) => knownForScore(b) - knownForScore(a),
  );
  const crewCredits = [...person.combined_credits.crew].sort(
    (a, b) => knownForScore(b) - knownForScore(a),
  );

  return (
    <>
      <DetailHeader posterPath={person.profile_path} title={person.name}>
        <PersonInfo person={person} />
      </DetailHeader>
      <CreditsGrid title="Cast Credits" credits={castCredits} />
      <CreditsGrid title="Crew Credits" credits={crewCredits} />
    </>
  );
}
