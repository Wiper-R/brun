"use client";

import { getFollowers } from "@/app/(app)/actions";
import { useQuery } from "react-query";
import { Input } from "../ui/input";
import { useDebounceValue } from "usehooks-ts";
import { UserList } from "../user-list";
import queryKeyFactory from "@/lib/query-key-factory";

export function FollowersList() {
  const [search, setSearch] = useDebounceValue("", 200);
  const { data, isLoading } = useQuery({
    async queryFn() {
      const result = await getFollowers({ search });
      if (!result.success) throw new Error("Couldn't fetch followers");
      return result.data;
    },
    queryKey: queryKeyFactory.me.followers(search),
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
      <UserList isLoading={isLoading} data={data} />
    </div>
  );
}
