import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-light mb-4">404 Not Found</h1>
      <Link href="/" className="text-primary hover:underline">
        Go home
      </Link>
    </div>
  );
}
