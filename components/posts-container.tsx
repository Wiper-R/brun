"use client";
import { getFeed } from "@/app/(app)/actions";
import { PostCard } from "./post-card";
import { useQuery } from "react-query";

export default function PostsContainer() {
  const { data } = useQuery({
    async queryFn() {
      const data = await getFeed({});
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
    queryKey: ["posts", "all"],
  });

  return data?.map((post) => <PostCard key={post.id} post={post} />);
}
