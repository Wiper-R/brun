import Logo from "./logo";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { Button } from "./ui/button";
import { getUser } from "@/actions";
import { UserAvatar } from "./user-avatar";
import Link from "next/link";
import SidebarToggleButton from "./sidebar/toggle-button";

export async function Navbar() {
  const user = await getUser();
  return (
    <header className="bg-background/40 sticky top-0 shadow backdrop-blur-md z-50 flex items-center h-[72px]">
      <MaxWidthWrapper className="flex justify-between p-4 items-center">
        <div className="flex gap-4 items-center">
          <Link href="/">
            <Logo />
          </Link>
          <SidebarToggleButton />
        </div>
        <div className="flex items-center">
          {user ? (
            <UserAvatar {...user} />
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
