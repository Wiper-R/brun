import { toAbbr } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserAvatar({
  avatarUrl = null,
  name,
}: {
  avatarUrl?: string | null;
  name: string;
}) {
  return (
    <Avatar>
      <AvatarFallback>{toAbbr(name)}</AvatarFallback>
      <AvatarImage src={avatarUrl || undefined} />
    </Avatar>
  );
}
