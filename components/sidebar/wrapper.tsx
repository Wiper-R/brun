"use client";

import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/providers/sidebar-toggle.provider";
import { PropsWithChildren } from "react";

export default function Wrapper({ children }: PropsWithChildren) {
  const { isOpen } = useSidebarToggle();
  return (
    <aside
      className={cn(
        "top-[72px] h-[calc(100vh-72px)] fixed z-40 lg:block w-full flex-col flex-grow max-w-[240px] border-r border-border lg:sticky bg-white overflow-auto -translate-x-full lg:translate-x-0 transition-all",
        { "translate-x-0": isOpen },
      )}
    >
      {children}
    </aside>
  );
}
