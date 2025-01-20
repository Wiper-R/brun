"use client";

import { getFollowers } from "@/app/(app)/actions";
import { useQuery } from "react-query";
import UserCard from "../user-card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { useDebounceValue } from "usehooks-ts";
import { Loader2 } from "lucide-react";

export function FollowersList() {
  const [search, setSearch] = useDebounceValue("", 200);
  const { data, isLoading } = useQuery({
    async queryFn() {
      const result = await getFollowers({ search });
      if (!result.success) throw new Error("Couldn't fetch followers");
      return result.data;
    },

    queryKey: ["followers", search],
  });

  return (
    <div className="mt-4">
      <Input
        placeholder="Search for users"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <hr className="my-4" />
      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : data && data.length > 0 ? (
        <ScrollArea className="flex max-h-60 flex-col gap-2">
          <div className="pr-4">
            {data?.map((user) => (
              <div
                key={user.id}
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
      )}
    </div>
  );
}
