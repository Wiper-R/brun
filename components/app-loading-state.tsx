"use client";
import { useAuth } from "@/providers/auth.provider";
import { PropsWithChildren } from "react";
import Logo from "./logo";

export default function AppLoadingState({ children }: PropsWithChildren) {
  const {
    auth: { state },
  } = useAuth();
  if (state == "loading") {
    return (
      <div
        className="flex-grow flex flex-col gap-2 items-center justify-center"
        key={"authentication loading state"}
      >
        <Logo />
      </div>
    );
  }
  return children;
}
