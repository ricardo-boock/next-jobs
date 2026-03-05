import { ExternalLink } from "lucide-react";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { cn } from "@/lib/utils";

export default function About() {
  return (
    <>
      <h1>About Next Jobs</h1>

      <p>
        NextJobs is a modern job board platform designed to help you discover
        remote job opportunities from companies around the world. Our clean,
        minimal interface makes it easy to search, filter, and save jobs that
        match your interests.
      </p>

      <h2 className={cn("border-b")}>Features</h2>

      <ul>
        <li>Smart search functionality to find relevant positions quickly</li>
        <li>Advanced filters by category, company, and keywords</li>
        <li>Save your favorite jobs for easy access later</li>
        <li>Clean, professional design focused on usability</li>
        <li>Responsive layout that works on desktop and mobile</li>
      </ul>

      <h2 className={cn("border-b")}>Data Source</h2>

      <p>
        Job listings on NextJobs are provided by Remotive, a trusted platform
        for remote job opportunities. We display curated remote positions from
        companies across various industries and locations.
      </p>

      <h2 className={cn("border-b")}>Open Source</h2>

      <p>
        This project is built as a portfolio demonstration of modern web
        development practices. The codebase showcases React, TypeScript,
        Tailwind CSS, and other contemporary technologies used in production
        applications.
      </p>

      <div className={cn("mt-10 flex gap-3 flex-wrap")}>
        <LinkButton className={cn("no-underline")} href="/jobs">
          Browse Jobs
        </LinkButton>

        <LinkButton
          className={cn("no-underline")}
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
