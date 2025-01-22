"use client";
import { createContextHelper } from "@/lib/create-context-helper";
import { PropsWithChildren, SetStateAction, useEffect, useState } from "react";

type SidebarToggle = {
  isOpen: boolean;
  toggle: () => void;
};
const [Context, useContext] = createContextHelper<SidebarToggle>();

export default function SidebarToggleProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen((o) => !o);
  }
  function onResize() {
    setIsOpen(false);
  }
  useEffect(() => {
    const signal = new AbortController();
    window.addEventListener("resize", onResize, signal);
    return () => {
      signal.abort();
    };
  }, []);
  return (
    <Context.Provider value={{ isOpen, toggle }}>{children}</Context.Provider>
  );
}

export { useContext as useSidebarToggle };
