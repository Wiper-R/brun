import { User } from "@/types";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import UserCard from "./user-card";
import { Button } from "./ui/button";

export function UserList({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data?: User[];
}) {
  return isLoading ? (
    <div className="flex justify-center">
      <Loader2 className="animate-spin" />
    </div>
  ) : data && data.length > 0 ? (
    <ScrollArea className="flex max-h-60 flex-col gap-2">
      <div className="pr-4">
        {data?.map((user) => (
          <div
            key={user.username}
            className="p-1 flex justify-between items-center"
          >
            <UserCard user={user!} />
            <Button variant="secondary" size="sm">
              Unfollow
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  ) : (
    <p className="text-sm text-gray-600 text-center">No result found</p>
  );
}
