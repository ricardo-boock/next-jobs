import { Heart, MapPin } from "lucide-react";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cleanJobTitle, cn, normalizeJobSalary } from "@/lib/utils";
import { JobPreview } from "@/types/remotive";

export const JobItem = ({ job }: { job: JobPreview }) => {
  return (
    <Card key={job.id} className={cn("gap-0 relative")}>
      <CardHeader className={cn("flex justify-between mb-2 md:mb-0")}>
        <CardTitle className={cn("text-lg max-w-[calc(100%-45px)]")}>
          {cleanJobTitle(job.title)}
        </CardTitle>

        <Button
          variant="link"
          size="icon"
          className={cn(
            "rounded-lg text-muted-foreground hover:text-red-500 hover:bg-gray-100 transition-colors absolute right-0 -translate-x-1/2",
          )}
        >
          <Heart className={cn("w-2 h-2")} />
        </Button>
      </CardHeader>

      <CardContent className={cn("grid gap-1")}>
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
        <div className={cn("flex gap-2 flex-wrap my-1")}>
          {job.category && (
            <Badge variant="secondary" className={cn("rounded-md")}>
              {job.category}
            </Badge>
          )}
          {job.job_type && (
            <Badge variant="outline" className={cn("rounded-md capitalize")}>
              {job.job_type.replace("_", "-")}
            </Badge>
          )}
          {job.salary && (
            <Badge variant="outline" className={cn("rounded-md")}>
              {normalizeJobSalary(job.salary)}
            </Badge>
          )}
        </div>
        <div className={cn("flex items-end justify-between mt-2")}>
          <LinkButton
            className={cn("no-underline")}
            variant="outline"
            href={`/jobs/${job.id}`}
          >
            View Details
          </LinkButton>
          <p className={cn("text-xs text-muted-foreground m-0")}>
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
            }).format(new Date(job.publication_date))}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
