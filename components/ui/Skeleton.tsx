interface SkeletonProps {
  variant?: "card" | "list-item";
  className?: string;
}

export default function Skeleton({
  variant = "card",
  className = "",
}: SkeletonProps) {
  if (variant === "list-item") {
    return (
      <div className={`animate-pulse space-y-2 p-4 ${className}`}>
        <div className="h-4 bg-neutral-800 rounded w-3/4" />
        <div className="h-4 bg-neutral-800 rounded w-1/2" />
        <div className="h-4 bg-neutral-800 rounded w-2/3" />
      </div>
    );
  }

  return (
    <div
      className={`animate-pulse bg-neutral-800 rounded w-48 h-72 mx-2 shrink-0 ${className}`}
    />
  );
}
