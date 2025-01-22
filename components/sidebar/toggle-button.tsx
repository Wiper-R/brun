"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebarToggle } from "@/providers/sidebar-toggle.provider";

export default function SidebarToggleButton() {
  const { isOpen, toggle } = useSidebarToggle();
  return (
    <Button
      size="icon"
      variant="outline"
      type="button"
      className="lg:hidden"
      onClick={toggle}
    >
      {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
    </Button>
  );
}
