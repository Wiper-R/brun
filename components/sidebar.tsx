import Link from "next/link";
import {
  BookmarkIcon,
  Heart,
  HomeIcon,
  LucideIcon,
  MessageCircle,
  Search,
  StickyNote,
  User2Icon,
  UserRoundCheck,
} from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { getUser } from "@/actions";
import { FollowersDialog } from "./followers-dialog";
import { UserSearchDialog } from "./user-search-dialog";

type SidebarProps = {
  label: string;
  icon: LucideIcon;
  href: string;
  variant?: "default" | "ghost";
};

function SidebarItem({
  icon: Icon,
  label,
  href,
  variant = "ghost",
}: SidebarProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant,
        }),
        "justify-start",
      )}
    >
      {<Icon className="!h-5 !w-5 " />}
      <span>{label}</span>
    </Link>
  );
}

export default async function Sidebar({ className }: { className?: string }) {
  const user = await getUser();
  return (
    <aside
      className={cn(
        "flex w-full flex-col flex-grow  h-full max-w-[240px] border-r border-border p-2 sticky top-0 bg-white",
        className,
      )}
    >
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "default" }),
          "rounded-full mt-2",
        )}
      >
        <StickyNote />
        <span>New Post</span>
      </Link>
      <hr className="my-4" />
      <SidebarItem label="Home" icon={HomeIcon} href="/" />
      <SidebarItem
        label="Your Profile"
        icon={User2Icon}
        href={`/profile/${user!.username}`}
      />
      <UserSearchDialog
        Trigger={
          <Button variant="ghost" className="justify-start">
            {<Search className="!h-5 !w-5 " />}
            <span>Search</span>
          </Button>
        }
      />
      <SidebarItem
        label="Saved Posts"
        icon={BookmarkIcon}
        href="/?type=saved"
      />
      <FollowersDialog
        Trigger={
          <Button variant="ghost" className="justify-start">
            {<UserRoundCheck className="!h-5 !w-5 " />}
            <span>Followers</span>
          </Button>
        }
      />
      <SidebarItem label="Liked Posts" icon={Heart} href="/?type=liked" />
      <SidebarItem label="Comments" icon={MessageCircle} href="/comments" />
    </aside>
  );
}
