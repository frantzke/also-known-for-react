import PosterImage from "@/components/ui/PosterImage";

interface DetailHeaderProps {
  posterPath: string | null;
  title: string;
  children: React.ReactNode;
}

export default function DetailHeader({
  posterPath,
  title,
  children,
}: DetailHeaderProps) {
  return (
    <div className="grid grid-cols-12 gap-4 py-8">
      <div className="col-span-12 sm:col-span-6 md:col-span-4">
        <div className="relative aspect-[2/3]">
          <PosterImage posterPath={posterPath} alt={title} size="lg" fill />
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-8 text-left">
        {children}
      </div>
    </div>
  );
}
