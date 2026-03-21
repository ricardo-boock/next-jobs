import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ShareButton } from "./ShareButton";
import { ShareList } from "./ShareList";
import { ShareDrawerProps } from "./Share.types";

export const ShareDrawer = ({
  className,
  title,
  description,
  socialTitle,
  socialUrl,
  socialHashtag,
  buttonSize,
}: ShareDrawerProps) => {
  return (
    <div className={cn(className)}>
      <Drawer>
        <DrawerTrigger asChild>
          <ShareButton />
        </DrawerTrigger>
        <DrawerContent className={cn("pb-15")}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          <div className={cn("grid grid-cols-3 mx-auto gap-x-6 gap-y-3 pb-5")}>
            <ShareList
              socialTitle={socialTitle}
              socialUrl={socialUrl}
              socialHashtag={socialHashtag}
              buttonSize={buttonSize}
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
