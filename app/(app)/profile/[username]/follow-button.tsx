"use client";
import { follow } from "@/actions";
import { Button } from "@/components/ui/button";

export default function FollowButton({ username }: { username: string }) {
  return (
    <Button size="sm" onClick={async () => await follow(username)}>
      Follow
    </Button>
  );
}
