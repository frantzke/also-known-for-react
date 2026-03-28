interface DividerProps {
  vertical?: boolean;
  accent?: boolean;
  className?: string;
}

export default function Divider({
  vertical = false,
  accent = false,
  className = "",
}: DividerProps) {
  if (vertical) {
    return (
      <div
        className={`w-px self-stretch mx-2 shrink-0 ${accent ? "bg-primary" : "bg-neutral-700"} ${className}`}
      />
    );
  }

  return (
    <hr
      className={`${accent ? "border-primary" : "border-neutral-700"} my-4 ${className}`}
    />
  );
}
