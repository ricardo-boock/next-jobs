import { Share2 } from "lucide-react";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Button } from "@/components/ui/button";

export const ShareButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof Button>
>((props, ref) => {
  return (
    <Button ref={ref} variant="outline" {...props}>
      <Share2 className="w-4 h-4" />
    </Button>
  );
});

ShareButton.displayName = "ShareButton";
