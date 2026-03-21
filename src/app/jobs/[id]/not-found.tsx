import { LinkButton } from "@/components/LinkButton/LinkButton";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className={cn("text-center")}>
      <h1>Not found</h1>
      <p>Could not find the requested job.</p>
      <LinkButton className={cn("no-underline")} href="/jobs">
        Return to jobs overview
      </LinkButton>
    </div>
  );
}
