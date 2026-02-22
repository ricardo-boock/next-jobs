import { ExternalLink } from "lucide-react";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

export default function About() {
  return (
    <>
      <h1
        className={cn(
          "scroll-m-20 pb-3 text-4xl font-bold tracking-tight text-balance",
        )}
      >
        About Next Jobs
      </h1>

      <p className={cn("leading-7 [&:not(:first-child)]:mt-6")}>
        NextJobs is a modern job board platform designed to help you discover
        remote job opportunities from companies around the world. Our clean,
        minimal interface makes it easy to search, filter, and save jobs that
        match your interests.
      </p>

      <h2
        className={cn(
          "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-7 first:mt-0",
        )}
      >
        Features
      </h2>

      <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2")}>
        <li>Smart search functionality to find relevant positions quickly</li>
        <li>Advanced filters by category, company, and keywords</li>
        <li>Save your favorite jobs for easy access later</li>
        <li>Clean, professional design focused on usability</li>
        <li>Responsive layout that works on desktop and mobile</li>
      </ul>

      <h2
        className={cn(
          "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-7 first:mt-0",
        )}
      >
        Data Source
      </h2>

      <p className={cn("leading-7 [&:not(:first-child)]:mt-6")}>
        Job listings on NextJobs are provided by Remotive, a trusted platform
        for remote job opportunities. We display curated remote positions from
        companies across various industries and locations.
      </p>

      <h2
        className={cn(
          "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-7 first:mt-0",
        )}
      >
        Open Source
      </h2>

      <p className={cn("leading-7 [&:not(:first-child)]:mt-6")}>
        This project is built as a portfolio demonstration of modern web
        development practices. The codebase showcases React, TypeScript,
        Tailwind CSS, and other contemporary technologies used in production
        applications.
      </p>

      <div className={cn("mt-10 flex gap-3 flex-wrap")}>
        <LinkButton href="/jobs">Browse Jobs</LinkButton>

        <LinkButton
          href="https://github.com/ricardo-boock/next-jobs"
          target="_blank"
          variant="outline"
        >
          View on GitHub
          <ExternalLink className="ml-2 h-4 w-4" />
        </LinkButton>
      </div>
    </>
  );
}
