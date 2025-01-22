import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import Sidebar from "@/components/sidebar/index";
import TopPosts from "@/components/top-posts";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <MaxWidthWrapper className="flex flex-grow relative p-0 gap-4 xl:gap-10">
      <Sidebar />
      <div className="max-w-2xl w-full p-2 mx-auto lg:mx-0">{children}</div>
      <TopPosts />
    </MaxWidthWrapper>
  );
}
