"use client";
import { getPosts } from "@/app/(app)/actions";
import { PostCard } from "./post-card";
import { useQuery } from "react-query";
import { GetPostsType } from "@/types";

export default function PostsContainer({ type }: { type: GetPostsType }) {
  const { data } = useQuery({
    async queryFn() {
      const data = await getPosts({ type });
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
    queryKey: ["posts", "all", type],
  });

  return (
    <div className="gap-4 grid">
      {data && data.length > 0 ? (
        data.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="text-sm text-center">
          We Could not find any {type} posts.
        </p>
      )}
    </div>
  );
}
