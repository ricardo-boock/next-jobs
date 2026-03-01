import type { RemotiveResponse } from "@/types/remotive";

const REMOTIVE_URL = "https://remotive.com/api/remote-jobs";

export async function getJobs(): Promise<RemotiveResponse> {
  if (process.env.NODE_ENV === "development") {
    const data = await import("@/data/jobs.json");
    return data.default as RemotiveResponse;
  }

  const res = await fetch(REMOTIVE_URL, {
    cache: "force-cache",
    next: { revalidate: 60 * 60 * 6 }, // 6h
  });

  if (!res.ok) throw new Error("Failed to fetch jobs");

  return res.json();
}
