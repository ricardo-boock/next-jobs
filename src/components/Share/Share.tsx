import { cn } from "@/lib/utils";
import { ShareDrawer } from "./ShareDrawer";
import { SharePopover } from "./SharePopover";
import { ShareProps } from "./ShareTypes";

export const Share = ({
  title,
  description,
  socialTitle,
  socialUrl,
  socialHashtag,
}: ShareProps) => {
  return (
    <>
      <ShareDrawer
        className={cn("md:hidden")}
        title={title}
        description={description}
        socialTitle={socialTitle}
        socialUrl={socialUrl}
        socialHashtag={socialHashtag}
        buttonSize={60}
      />

      <SharePopover
        className={cn("hidden md:block")}
        title={title}
        description={description}
        socialTitle={socialTitle}
        socialUrl={socialUrl}
        socialHashtag={socialHashtag}
        buttonSize={40}
      />
    </>
  );
};
