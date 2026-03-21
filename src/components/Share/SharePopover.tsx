import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ShareList } from "./ShareList";
import { SharePopoverProps } from "./Share.types";
import { ShareButton } from "./ShareButton";

export const SharePopover = ({
  className,
  title,
  description,
  socialTitle,
  socialUrl,
  socialHashtag,
  buttonSize,
}: SharePopoverProps) => {
  return (
    <div className={cn(className)}>
      <Popover>
        <PopoverTrigger asChild>
          <ShareButton />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          sideOffset={8}
          className={cn("w-[calc(100vw-2rem)] max-w-sm sm:w-fit p-4")}
        >
          <PopoverHeader className={cn("mb-3")}>
            <PopoverTitle className={cn("text-lg")}>{title}</PopoverTitle>
            {description && (
              <PopoverDescription>{description}</PopoverDescription>
            )}
          </PopoverHeader>
          <div className={cn("grid grid-cols-3 gap-2 w-fit")}>
            <ShareList
              socialTitle={socialTitle}
              socialUrl={socialUrl}
              socialHashtag={socialHashtag}
              buttonSize={buttonSize}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
