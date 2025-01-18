"use client";
import { useAuth } from "@/providers/auth.provider";
import Logo from "./logo";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Navbar() {
  const {
    auth: { user, state: authState },
  } = useAuth();
  return (
    <header className="bg-background/40 sticky top-0 shadow backdrop-blur-md z-50 flex items-center h-[72px]">
      <MaxWidthWrapper className="flex justify-between p-4 items-center">
        <Logo />
        <div className="flex items-center">
          {authState == "loading" ? (
            <Loader2 className="animate-spin" />
          ) : user ? (
            <Avatar>
              <AvatarImage />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
          ) : (
            <>
              <Button variant="ghost">Signup</Button>
              <Button variant="ghost">Login</Button>
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
