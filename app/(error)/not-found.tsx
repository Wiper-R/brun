import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <MaxWidthWrapper className="flex-col flex-grow flex items-center justify-center text-sm gap-0">
      <span>{"The page you are looking for doesn't exists."}</span>
      <span>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "link" }), "p-0 m-0")}
        >
          Click here
        </Link>{" "}
        to go back to home page
      </span>
    </MaxWidthWrapper>
  );
}
