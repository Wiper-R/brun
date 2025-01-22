"use client";

import { likePost, savePost } from "@/app/(app)/actions";
import { Button } from "../ui/button";
import { PostWithAuthor } from "@/types";
import { cn } from "@/lib/utils";
import { Bookmark, Heart, Share2 } from "lucide-react";
import { PostCommentButton } from "./comment-button";
import { useState } from "react";
import { toast } from "sonner";
export default function Controls({ post }: { post: PostWithAuthor }) {
  const [hasLiked, setHasLiked] = useState(post.likes.length > 0);
  const [likeCount, setLikeCount] = useState(post.numLikes);
  async function handleLike() {
    if (hasLiked) return;
    setHasLiked(true);
    setLikeCount((c) => c + 1);
    const res = await likePost(post.id);
    if (!res.success) {
      setHasLiked(false);
      setLikeCount((c) => c - 1);
    }
  }

  async function handleSavePost() {
    const res = await savePost(post.id);
    if (res.success) {
      toast.success("Saved posted successfully");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleLike}
        className={cn(
          "pointer-events-auto",
          hasLiked && "text-red-500 hover:text-red-500 ",
        )}
      >
        <Heart className={cn(hasLiked && "text-red-500 fill-red-500")} />
        {likeCount > 0 && <span>{likeCount}</span>}
      </Button>
      <PostCommentButton post={post} />
      <div className="flex-grow" />
      <Button
        variant="outline"
        size="sm"
        className={cn("pointer-events-auto")}
        onClick={handleSavePost}
      >
        <Bookmark
          className={cn(
            post.savedPost.length > 0 && "text-blue-500 fill-blue-500",
          )}
        />
      </Button>
      <Button variant="outline" size="sm" className="pointer-events-auto">
        <Share2 className="" />
      </Button>
    </div>
  );
}
