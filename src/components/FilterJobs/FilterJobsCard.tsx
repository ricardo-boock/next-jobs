import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FilterJobs } from "./FilterJobs";
import { FilterJobsCardProps } from "./FilterJobsTypes";

export const FilterJobsCard = ({
  className,
  title,
  description,
  jobs,
}: FilterJobsCardProps) => {
  return (
    <div className={cn(className)}>
      <Card className={cn("gap-3")}>
        {(title || description) && (
          <CardHeader>
            {title && (
              <CardTitle>
                <h3 className={cn("mt-0")}>{title}</h3>
              </CardTitle>
            )}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}

        <CardContent>
          <FilterJobs jobs={jobs} />
        </CardContent>
      </Card>
    </div>
  );
};
