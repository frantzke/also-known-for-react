interface ChipProps {
  children: React.ReactNode;
}

export default function Chip({ children }: ChipProps) {
  return (
    <span className="inline-block border border-primary text-primary rounded-full px-3 py-1 text-sm mr-2 mb-2">
      {children}
    </span>
  );
}
