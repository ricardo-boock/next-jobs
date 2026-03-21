import { Suspense } from "react";
import { getJobs } from "@/lib/jobs";
import { RemotiveResponse } from "@/types/remotive";
import { FavoritesClient } from "./components/FavoritesClient/FavoritesClient";
import Loading from "./loading";

export default async function Favorites() {
  const data: RemotiveResponse = await getJobs();

  return (
    <Suspense fallback={<Loading />}>
      <FavoritesClient jobs={data.jobs} />
    </Suspense>
  );
}
