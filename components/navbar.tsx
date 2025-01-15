"use client";
import { useAuth } from "@/providers/auth.provider";
import Logo from "./logo";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { Button } from "./ui/button";

export function Navbar() {
  const {
    auth: { user },
  } = useAuth();
  return (
    <header className="bg-white shadow">
      <MaxWidthWrapper className="flex justify-between p-4 items-center">
        <Logo />
        <div className="flex items-center">
          <Button variant="ghost">Signup</Button>
          <Button variant="ghost">Login</Button>
          <span>{user?.name}</span>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
