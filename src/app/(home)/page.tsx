import { Filter, Heart, Sparkles } from "lucide-react";
import { FullBleed } from "@/components/FullBleed/FullBleed";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { SearchBarNavigate } from "@/components/SearchBar/SearchBarNavigate";
import { SectionSeparator } from "@/components/SectionSeparator/SectionSeparator";
import { Usp } from "@/components/Usp/Usp";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={cn("md:mt-15 md:mb-25")}>
        <h1 className={cn("text-6xl font-bold text-center")}>
          Find Remote Jobs Faster.
        </h1>
        <p className={cn("text-center text-lg mt-7 max-w-[70ch] mx-auto")}>
          Search and filter remote job opportunities from top companies. Save
          your favorites and never miss the perfect position.
        </p>
        <SearchBarNavigate targetUrl="/jobs" />
      </section>

      <FullBleed>
        <SectionSeparator />
      </FullBleed>

      {/* Feature Section */}
      <section
        className={cn(
          "md:my-25 flex justify-center gap-10 flex-col md:flex-row",
        )}
      >
        <Usp
          icon={<Sparkles className={cn("w-6 h-6 text-blue-600")} />}
          title="Smart Search"
          description="Find relevant jobs quickly with our intelligent keyword search and filtering."
        />
        <Usp
          icon={<Filter className={cn("w-6 h-6 text-blue-600")} />}
          title="Advanced Filters"
          description="Narrow down results by category, company, and more to find your ideal position."
        />
        <Usp
          icon={<Heart className={cn("w-6 h-6 text-blue-600")} />}
          title="Save Favorites"
          description="Bookmark interesting jobs and keep track of opportunities you want to apply for."
        />
      </section>

      <FullBleed>
        <SectionSeparator />
      </FullBleed>

      {/* CTA Section */}
      <section className={cn("md:mt-25 md:mb-15")}>
        <p className={cn("text-4xl font-bold text-center leading-none")}>
          Ready to start your job search?
        </p>
        <p className={cn("text-center text-lg mt-7 max-w-[70ch] mx-auto")}>
          Browse hundreds of remote positions from companies around the world.
        </p>
        <LinkButton
          className={cn("mx-auto mt-7 block no-underline")}
          href="/jobs"
        >
          Browse Jobs
        </LinkButton>
      </section>
    </>
  );
}
