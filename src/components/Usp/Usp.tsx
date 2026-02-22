import { cn } from "@/lib/utils";

type UspProps = {
  className?: string;
  description: string;
  icon: React.ReactNode;
  title: string;
};

export const Usp = (props: UspProps) => {
  return (
    <article className={cn("grid gap-2 text-center", props.className)}>
      <div className="w-12 h-12 rounded-lg bg-blue-100 grid place-items-center mx-auto mb-2">
        {props.icon}
      </div>
      <h2 className={cn("text-xl font-bold")}>{props.title}</h2>
      <p className={cn("text-gray-600 max-w-[40ch] mx-auto")}>
        {props.description}
      </p>
    </article>
  );
};
