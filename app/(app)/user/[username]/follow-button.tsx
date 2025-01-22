"use client";
import { follow } from "@/actions";
import { Button } from "@/components/ui/button";
import { unfollow } from "../../actions";
import { useState } from "react";

export default function FollowButton({
  username,
  following,
}: {
  username: string;
  following: boolean;
}) {
  const [isFollowing, setIsFollowing] = useState(following);
  async function handleClick() {
    if (isFollowing) {
      setIsFollowing(false);
      await unfollow(username);
    } else {
      setIsFollowing(true);
      await follow(username);
    }
  }
  return (
    <Button
      size="sm"
      onClick={handleClick}
      variant={isFollowing ? "secondary" : "default"}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
