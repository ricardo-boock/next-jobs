import { Suspense } from "react";
import { getJobs } from "@/lib/jobs";
import { RemotiveResponse } from "@/types/remotive";
import { FavoritesClient } from "./FavoritesClient/FavoritesClient";

export default async function Favorites() {
  const data: RemotiveResponse = await getJobs();

  return (
    <Suspense fallback={<div>Loading favorites…</div>}>
      <FavoritesClient jobs={data.jobs} />
    </Suspense>
  );
}
