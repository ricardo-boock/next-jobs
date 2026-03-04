import { getJobs } from "@/lib/jobs";
import { RemotiveResponse } from "@/types/remotive";
import JobsClient from "./components/JobsClient/JobsClient";
import { Suspense } from "react";

export default async function Jobs() {
  const data: RemotiveResponse = await getJobs();

  return (
    <Suspense fallback={<div>Loading jobs…</div>}>
      <JobsClient jobs={data.jobs} />
    </Suspense>
  );
}
