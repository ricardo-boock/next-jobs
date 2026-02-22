import { cn } from "@/lib/utils";

export function FullBleed({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("-mx-[calc((100vw-100%)/2)] max-w-full", className)}>
      {children}
    </div>
  );
}
