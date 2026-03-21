"use client";

import {
  ArrowLeft,
  Briefcase,
  Calendar,
  DollarSign,
  ExternalLink,
  Heart,
  MapPin,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";

import { LinkButton } from "@/components/LinkButton/LinkButton";
import { Share } from "@/components/Share/Share";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toggleFavorite } from "@/lib/favorites";
import {
  cleanJobDescription,
  cleanJobTitle,
  cn,
  normalizeJobSalary,
} from "@/lib/utils";

import { type JobDetails } from "@/types/remotive";
import { useFavorites } from "@/hooks/useFavorites";

import { CompanyLogo } from "./components/CompanyLogo/CompanyLogo";
import { JobMetaItem } from "./components/JobMetaItem/JobMetaItem";
import Loading from "./loading";

type JobDetailsClientProps = {
  params: Promise<{ id: string }>;
};

export default function Job({ params }: JobDetailsClientProps) {
  const { id } = use(params);

  const [job, setJob] = useState<JobDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/jobs/${id}`)
      .then(async (result) => {
        if (result.status === 404) {
          if (!cancelled) setMissing(true);
          return null;
        }

        if (!result.ok) {
          throw new Error(await result.text());
        }

        return result.json();
      })
      .then((job) => {
        if (!cancelled && job) setJob(job);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (missing) {
    notFound();
  }

  const favorites = useFavorites();

  const sanitizedDescription = job ? cleanJobDescription(job.description) : "";

  if (error) return <div>Failed: {error}</div>;
  if (!job) return <div>Loading…</div>;

  return (
    <Suspense fallback={<Loading />}>
      <LinkButton
        className={cn("no-underline -mt-5 md:-mt-10 mb-2")}
        variant="link"
        href={"/jobs"}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </LinkButton>
      <div className={cn("grid gap-6")}>
        <Card>
          <CardHeader
            className={cn(
              "flex flex-col md:flex-row items-center gap-2 md:gap-4",
            )}
          >
            <CompanyLogo
              key={job.company_logo_url ?? "no-logo"}
              src={job.company_logo_url}
              alt={job.company_name}
            />
            <CardTitle>
              <h1 className={cn("my-0")}>{cleanJobTitle(job.title)}</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center gap-2 text-sm text-left",
              )}
            >
              <span>{job.company_name}</span>{" "}
              <span className={cn("hidden md:inline")}>•</span>
              <span className={cn("flex items-center gap-0.5")}>
                <MapPin className={cn("w-3.25 h-3.25")} />
                Remote ({job.candidate_required_location})
              </span>
            </div>
            <div className={cn("flex gap-2 mt-5")}>
              {job.category && (
                <Badge variant="secondary" className={cn("rounded-md")}>
                  {job.category}
                </Badge>
              )}
              {job.job_type && (
                <Badge
                  variant="outline"
                  className={cn("rounded-md capitalize")}
                >
                  {job.job_type.replace("_", "-")}
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className={cn("gap-3")}>
            <LinkButton
              className={cn("no-underline")}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
              <ExternalLink className={cn("w-4 h-4")} />
            </LinkButton>
            <Button variant="outline" onClick={() => toggleFavorite(job.id)}>
              <Heart
                className={cn(
                  "w-5 h-5",
                  favorites.includes(job.id) && "text-red-500",
                )}
                fill={favorites.includes(job.id) ? "red" : "none"}
              />
              Save
            </Button>
            <Share
              title="Share this job:"
              socialTitle={`Look what I found on Next Jobs!\n${job.title} at ${job.company_name}!`}
              socialUrl={window.location.href}
            />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <h2 className={cn("my-0")}>Overview</h2>
          </CardHeader>
          <CardContent className={cn("grid grid-cols-1 md:grid-cols-2 gap-4")}>
            {job.job_type && (
              <JobMetaItem
                icon={<Briefcase />}
                title="Job Type"
                description={job.job_type.replace("_", "-")}
              />
            )}
            {job.salary && (
              <JobMetaItem
                icon={<DollarSign />}
                title="Salary"
                description={normalizeJobSalary(job.salary)!}
              />
            )}
            {job.candidate_required_location && (
              <JobMetaItem
                icon={<MapPin />}
                title="Location"
                description={job.candidate_required_location}
              />
            )}
            <JobMetaItem
              icon={<Calendar />}
              title="Posted"
              description={new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(new Date(job.publication_date))}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className={cn("my-0")}>Description</h2>
          </CardHeader>
          <CardContent>
            <div
              className={cn("prose max-w-none")}
              dangerouslySetInnerHTML={{
                __html: sanitizedDescription,
              }}
            />
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
