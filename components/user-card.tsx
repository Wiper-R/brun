import { formatTime } from "@/lib/utils";
import { User } from "@/types";
import { UserAvatar } from "./user-avatar";
import Link from "next/link";

type UserCardProps = {
  time?: Date;
  user: User;
};

export default function UserCard({ user, time }: UserCardProps) {
  return (
    <Link className="flex gap-2" href={`/profile/${user.username}`}>
      <UserAvatar {...user} />
      <div className="flex flex-col text-sm justify-center">
        <span>{user.name}</span>
        <div className="flex gap-2 items-center">
          <span className="text-gray-600 font-medium">@{user.username}</span>
          {time && (
            <span className="text-xs text-gray-700">{formatTime(time)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
