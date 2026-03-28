"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-light mb-4">An error occurred</h1>
      <p className="text-neutral-400 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-primary text-black rounded hover:opacity-80 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}
