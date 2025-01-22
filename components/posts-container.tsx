"use client";
import { getPosts } from "@/app/(app)/actions";
import { PostCard } from "./post-card";
import { useQuery } from "react-query";
import { GetPostsType } from "@/types";
import { Loader2 } from "lucide-react";
import SadBot from "@/public/sad-bot.png";
import Image from "next/image";
import Link from "next/link";
import queryKeyFactory from "@/lib/query-key-factory";

function NoResultMessage({ type }: { type: GetPostsType }) {
  return (
    <div className="flex items-center gap-4 text-sm flex-col mt-4">
      <Image src={SadBot} alt="Sad bot" className="w-40" width={160} />
      {type == "feed" ? (
        <p>
          Your feed is quite empty, you can start following others or{" "}
          <Link href="#new-chat-input" className="underline font-medium">
            post your own content.
          </Link>{" "}
        </p>
      ) : (
        <p>
          You do not have any {type} posts. Consider adding some{" "}
          <Link href={"/"} className="underline font-medium">
            here
          </Link>
        </p>
      )}
    </div>
  );
}

export default function PostsContainer({ type }: { type: GetPostsType }) {
  const { data, isLoading } = useQuery({
    async queryFn() {
      const data = await getPosts({ type });
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
    queryKey: queryKeyFactory.me.posts(type),
  });

  return (
    <div className="gap-4 grid">
      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : data && data.length > 0 ? (
        data.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <NoResultMessage type={type} />
      )}
    </div>
  );
}
