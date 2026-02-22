import { Filter, Heart, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { SectionSeparator } from "@/components/SectionSeparator/SectionSeparator";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Usp } from "@/components/Usp/Usp";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={cn("mt-15 mb-25")}>
        <h1 className={cn("text-6xl font-bold text-center")}>
          Find Remote Jobs Faster.
        </h1>
        <p className={cn("text-center text-lg mt-7 max-w-[70ch] mx-auto")}>
          Search and filter remote job opportunities from top companies. Save
          your favorites and never miss the perfect position.
        </p>
        <Field
          className={cn("mt-7 max-w-[70ch] mx-auto")}
          orientation={"horizontal"}
        >
          <Input type="search" placeholder="Search keywords..." />
          <Button>Search</Button>
        </Field>
      </section>

      <SectionSeparator />

      {/* Feature Section */}
      <section
        className={cn("my-25 flex justify-center gap-10 flex-col md:flex-row")}
      >
        <Usp
          icon={<Sparkles className="w-6 h-6 text-blue-600" />}
          title="Smart Search"
          description="Find relevant jobs quickly with our intelligent keyword search and filtering."
        />
        <Usp
          icon={<Filter className="w-6 h-6 text-blue-600" />}
          title="Advanced Filters"
          description="Narrow down results by category, company, and more to find your ideal position."
        />
        <Usp
          icon={<Heart className="w-6 h-6 text-blue-600" />}
          title="Save Favorites"
          description="Bookmark interesting jobs and keep track of opportunities you want to apply for."
        />
      </section>

      <SectionSeparator />

      {/* CTA Section */}
      <section className={cn("mt-25 mb-15")}>
        <p className={cn("text-4xl font-bold text-center")}>
          Ready to start your job search?
        </p>
        <p className={cn("text-center text-lg mt-7 max-w-[70ch] mx-auto")}>
          Browse hundreds of remote positions from companies around the world.
        </p>
        <LinkButton className={cn("mx-auto mt-7 block")} href="/jobs">
          Browse Jobs
        </LinkButton>
      </section>
    </>
  );
}
