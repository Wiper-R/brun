"use client";

import { likePost, savePost } from "@/app/(app)/actions";
import { Button } from "../ui/button";
import { PostWithAuthor } from "@/types";
import { cn } from "@/lib/utils";
import { Bookmark, Heart, Share2 } from "lucide-react";
import { PostCommentButton } from "./comment-button";

export default function Controls({ post }: { post: PostWithAuthor }) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={async () => await likePost(post.id)}
        className={cn(
          "pointer-events-auto",
          post.likes.length > 0 && "text-red-500 hover:text-red-500 ",
        )}
      >
        <Heart
          className={cn(post.likes.length > 0 && "text-red-500 fill-red-500")}
        />
        {post.numLikes > 0 && <span>{post.numLikes}</span>}
      </Button>
      <PostCommentButton post={post} />
      <div className="flex-grow" />
      <Button
        variant="outline"
        size="sm"
        className="pointer-events-auto"
        onClick={async () => await savePost(post.id)}
      >
        <Bookmark className="" />
      </Button>
      <Button variant="outline" size="sm" className="pointer-events-auto">
        <Share2 className="" />
      </Button>
    </div>
  );
}
