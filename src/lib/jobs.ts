import { env } from "@/lib/env";
import type { RemotiveResponse } from "@/types/remotive";

export async function getJobs(): Promise<RemotiveResponse> {
  if (process.env.NODE_ENV === "development") {
    const data = await import("@/data/jobs.json");
    return data.default as RemotiveResponse;
  }

  const res = await fetch(env.REMOTIVE_API, {
    cache: "force-cache",
    next: { revalidate: 60 * 60 * 6 }, // 6h
  });

  if (!res.ok) throw new Error("Failed to fetch jobs");

  return res.json() as Promise<RemotiveResponse>;
}
