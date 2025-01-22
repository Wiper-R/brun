"use client";
import { User } from "@/types";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import UserCard from "./user-card";
import { Button } from "./ui/button";
import { unfollow } from "@/app/(app)/actions";
import { follow } from "@/actions";
import { useQueryClient } from "react-query";

type UserWithFollowing = {
  isFollowing: boolean;
} & User;

function ActionButton({
  username,
  following,
}: {
  username: string;
  following: boolean;
}) {
  const queryClient = useQueryClient();
  async function handleAction() {
    if (following) {
      await unfollow(username);
    } else {
      await follow(username);
    }
    await Promise.all([
      queryClient.invalidateQueries(["users"]),
      queryClient.invalidateQueries(["me", "followers"]),
    ]);
  }
  return (
    <Button
      variant={following ? "secondary" : "default"}
      size="sm"
      onClick={handleAction}
    >
      {following ? "Unfollow" : "Follow"}
    </Button>
  );
}

export function UserList({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data?: UserWithFollowing[];
}) {
  return isLoading ? (
    <div className="flex justify-center">
      <Loader2 className="animate-spin" />
    </div>
  ) : data && data.length > 0 ? (
    <ScrollArea className="flex max-h-60 flex-col gap-2">
      <div className="pr-4">
        {data.map((user) => (
          <div
            key={user.username}
            className="p-1 flex justify-between items-center"
          >
            <UserCard user={user!} />
            <ActionButton
              username={user.username}
              following={user.isFollowing}
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  ) : (
    <p className="text-sm text-gray-600 text-center">No result found</p>
  );
}
