import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FavButtonProps = {
  isFav: boolean;
  onToggleFav: () => void;
};

export const FavButton = ({ isFav, onToggleFav }: FavButtonProps) => {
  return (
    <Button
      variant="link"
      size="icon"
      className={cn(
        "rounded-lg text-muted-foreground hover:text-red-500 hover:bg-gray-100 transition-colors",
        "absolute right-0 -translate-x-1/2",
        isFav && "text-red-500",
      )}
      onClick={onToggleFav}
    >
      <Heart className={cn("w-2 h-2")} fill={isFav ? "red" : "none"} />
    </Button>
  );
};
