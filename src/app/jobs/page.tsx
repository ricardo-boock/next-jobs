import { getJobs } from "@/lib/jobs";
import { RemotiveResponse } from "@/types/remotive";
import JobsClient from "./components/JobsClient/JobsClient";

export default async function Jobs() {
  const data: RemotiveResponse = await getJobs();

  return <JobsClient jobs={data.jobs} />;
}
