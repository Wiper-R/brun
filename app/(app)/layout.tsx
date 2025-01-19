import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import Sidebar from "@/components/sidebar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <MaxWidthWrapper className="flex flex-grow relative p-0 gap-20">
      <Sidebar className="top-[72px] h-[calc(100vh-72px)]" />
      <div className="max-w-2xl w-full p-2">{children}</div>
    </MaxWidthWrapper>
  );
}
