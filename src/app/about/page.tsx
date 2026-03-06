import { ExternalLink } from "lucide-react";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { cn } from "@/lib/utils";

export default function About() {
  return (
    <>
      <h1>About Next Jobs</h1>

      <p>
        Next Jobs is a personal portfolio project built to demonstrate modern
        web development using Next.js, React, TypeScript, and Tailwind CSS. The
        platform showcases a simple remote job board interface where users can
        browse job listings, filter results, and save favorite jobs.
      </p>

      <p>
        This website is intended for demonstration and educational purposes. It
        is not a commercial job marketplace and does not provide recruiting
        services or job application management.
      </p>

      <h2 className={cn("border-b")}>Features</h2>

      <ul>
        <li>Search and filter remote job listings</li>
        <li>Sort job results by date or title</li>
        <li>Save favorite jobs locally in your browser</li>
        <li>Responsive interface for desktop and mobile devices</li>
      </ul>

      <h2 className={cn("border-b")}>Data Source</h2>

      <p>
        Job listings displayed on this website are provided by the Remotive
        public job API. All job information, including company names and
        descriptions, originates from this external data source.
      </p>

      <h2 className={cn("border-b")}>Privacy</h2>

      <p>
        This project does not provide user accounts and does not collect
        personal data through forms or registration.
      </p>

      <p>
        If you save jobs as favorites, the job IDs are stored locally in your
        browser using <code>localStorage</code>. This information remains on
        your device and is not transmitted to any server operated by this
        website.
      </p>

      <h2 className={cn("border-b")}>Open Source</h2>

      <p>
        The source code for this project is publicly available as part of a
        developer portfolio.
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
