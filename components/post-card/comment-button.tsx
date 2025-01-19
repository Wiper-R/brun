"use client";
import { PostCommentSchema, PostWithAuthor } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toAbbr } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { MAX_POST_CONTENT } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { postComment } from "@/actions";
import { useAuth } from "@/providers/auth.provider";
import { UserAvatar } from "../user-avatar";

export function PostCommentButton({ post }: { post: PostWithAuthor }) {
  const {
    auth: { user },
  } = useAuth();
  const form = useForm<PostCommentSchema>({
    resolver: zodResolver(PostCommentSchema),
    defaultValues: { content: "", postId: post.id },
  });
  async function onSubmit(values: PostCommentSchema) {
    const comment = await postComment(values);
    console.log(comment);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="pointer-events-auto">
          <MessageCircle className="" />
          {post._count.comments > 0 && <span>{post._count.comments}</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogTitle className="hidden" />
          <div className="relative">
            <div className="relative">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>{toAbbr(post.author.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-gray-800">
                  <span className="text-base">{post.author.name}</span>
                  <span className="text-sm">@{post.author.username}</span>
                </div>
              </div>
              <div className="ml-12 text-sm text-gray-700 mt-4">
                {post.content}
              </div>
              <div className="absolute top-0 -bottom-8 left-5 -z-10 border-l" />
            </div>
            <div className="flex gap-2 mt-8">
              <UserAvatar {...user!} />

              <Textarea
                placeholder="Post your reply"
                className="min-h-0 h-auto !ring-0 overflow-hidden resize-none border-0 border-b-2 rounded-none p-2"
                rows={1}
                maxLength={MAX_POST_CONTENT}
                {...form.register("content", {
                  onChange: function (e) {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = `auto`;
                    target.style.height = `${target.scrollHeight}px`;
                  },
                })}
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 mt-4">
            <span className="text-sm text-gray-700">
              {form.watch("content").length}/{MAX_POST_CONTENT}
            </span>
            <Button>Post</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
