import { FavButton } from "./FavButton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type FavButtonTooltipProps = {
  isFav: boolean;
  onToggleFav: () => void;
};

export const FavButtonTooltip = ({
  isFav,
  onToggleFav,
}: FavButtonTooltipProps) => {
  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return canHover ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <FavButton isFav={isFav} onToggleFav={onToggleFav} />
      </TooltipTrigger>
      <TooltipContent>
        <p className={cn("m-0")}>
          {isFav ? "Remove from favorites" : "Add to favorites"}
        </p>
      </TooltipContent>
    </Tooltip>
  ) : (
    <FavButton isFav={isFav} onToggleFav={onToggleFav} />
  );
};
