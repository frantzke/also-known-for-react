// TMDB API proxy — keeps the API key server-side
// Client components call /api/tmdb/... which forwards to TMDB

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const baseUrl = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;

  if (!baseUrl || !apiKey) {
    return NextResponse.json(
      { error: "TMDB API not configured" },
      { status: 500 },
    );
  }

  const tmdbPath = `/${path.join("/")}`;
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${baseUrl}${tmdbPath}${searchParams ? `?${searchParams}` : ""}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `TMDB API error: ${res.status}` },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
