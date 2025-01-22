"use client";
import { useQuery } from "react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getTopPosts } from "@/app/(app)/actions";
import UserCard from "./user-card";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import queryKeyFactory from "@/lib/query-key-factory";
import React from "react";

export default function TopPosts() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data } = useQuery({
    async queryFn() {
      const result = await getTopPosts();
      if (!result.success) {
        throw new Error(result.message);
      }
      return result.data;
    },
    queryKey: queryKeyFactory.posts.top(),
  });
  if (pathname != "/" || searchParams.get("type")) {
    return <></>;
  }
  if (!data || data.length == 0) {
    return <></>;
  }
  return (
    <div className="self-start sticky top-[72px] pt-4 hidden xl:block max-w-[300px] w-full">
      <Card>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-lg text-center">Top Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-4 grid gap-2">
          {data && data.length > 0 ? (
            data.map((post) => (
              <React.Fragment key={post.id}>
                <hr />
                <div key={post.id} className="rounded space-y-1 relative">
                  <Link
                    href={`/posts/${post.id}`}
                    className="absolute inset-0"
                  />
                  <UserCard user={post.author} time={post.createdAt} />
                  <p className="line-clamp-2 text-gray-700 text-sm">
                    {post.content}
                  </p>
                </div>
              </React.Fragment>
            ))
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
