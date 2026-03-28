interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className = "" }: SpinnerProps) {
  return (
    <div
      className={`h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent ${className}`}
    />
  );
}
