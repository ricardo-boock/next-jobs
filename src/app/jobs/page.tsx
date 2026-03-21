import { Suspense } from "react";
import { getJobs } from "@/lib/jobs";
import { RemotiveResponse } from "@/types/remotive";
import JobsClient from "./components/JobsClient/JobsClient";
import Loading from "./loading";

export default async function Jobs() {
  const data: RemotiveResponse = await getJobs();

  return (
    <Suspense fallback={<Loading />}>
      <JobsClient jobs={data.jobs} />
    </Suspense>
  );
}
