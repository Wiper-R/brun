import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function MaxWidthWrapper({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("mx-auto max-w-7xl px-8 w-full", className)}
    />
  );
}
