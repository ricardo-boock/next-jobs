import { NextResponse } from "next/server";
import { getJobs } from "@/lib/jobs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const data = await getJobs();
  const job = data.jobs.find((j) => j.id === Number(id));

  if (!job) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
