import { toAbbr } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserAvatar({
  avatarUrl = null,
  name,
  className,
}: {
  avatarUrl?: string | null;
  name: string;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarFallback>{toAbbr(name)}</AvatarFallback>
      <AvatarImage src={avatarUrl || undefined} />
    </Avatar>
  );
}
