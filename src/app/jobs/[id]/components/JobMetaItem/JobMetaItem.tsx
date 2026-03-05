import {
  AriaAttributes,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type JobMetaItemProps = {
  className?: string;
  icon: ReactNode;
  title: string;
  description: string;
};

type IconProps = {
  className?: string;
} & AriaAttributes & {
    focusable?: boolean | "true" | "false";
  };

function isStylableIcon(node: ReactNode): node is ReactElement<IconProps> {
  return isValidElement(node);
}

export const JobMetaItem = ({
  className,
  icon,
  title,
  description,
}: JobMetaItemProps) => {
  const styledIcon = isStylableIcon(icon)
    ? cloneElement(icon, {
        className: cn("w-5 h-5 text-gray-600", icon.props.className),
        "aria-hidden": true,
        focusable: false,
      })
    : icon;

  return (
    <div className={cn("flex gap-3", className)}>
      <div
        className={cn(
          "w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0",
        )}
      >
        {styledIcon}
      </div>
      <div>
        <div className={cn("text-sm text-gray-600")}>{title}</div>
        <div className={cn("font-medium capitalize")}>{description}</div>
      </div>
    </div>
  );
};
