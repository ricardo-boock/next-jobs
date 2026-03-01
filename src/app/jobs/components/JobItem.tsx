import { Heart, MapPin } from "lucide-react";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, normalizeSalary } from "@/lib/utils";
import { JobPreview } from "@/types/remotive";

export const JobItem = ({ job }: { job: JobPreview }) => {
  return (
    <article
      key={job.id}
      className={cn("grid gap-2 border border-gray-200 rounded-lg p-4")}
    >
      <div className={cn("flex justify-between")}>
        <h1 className={cn("text-lg font-bold")}>{job.title}</h1>
        <Button
          variant="link"
          size="icon"
          className={cn(
            "rounded-lg text-muted-foreground hover:text-red-500 hover:bg-gray-100 transition-colors",
          )}
        >
          <Heart className={cn("w-5 h-5")} />
        </Button>
      </div>

      <div className={cn("flex items-center gap-2 text-sm")}>
        <span>{job.company_name}</span> <span>•</span>
        <span className={cn("flex items-center gap-0.5")}>
          <MapPin className={cn("w-3.25 h-3.25")} />
          Remote ({job.candidate_required_location})
        </span>
      </div>
      <div className={cn("flex gap-2 my-1")}>
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
            {normalizeSalary(job.salary)}
          </Badge>
        )}
      </div>
      <div className={cn("flex items-end justify-between")}>
        <LinkButton variant="outline" href={`/jobs/${job.id}`}>
          View Details
        </LinkButton>
        <p className={cn("text-xs text-muted-foreground")}>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
          }).format(new Date(job.publication_date))}
        </p>
      </div>
    </article>
  );
};
