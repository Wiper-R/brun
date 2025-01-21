"use client";
import { ImageIcon, SendHorizonal, SmileIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useForm } from "react-hook-form";
import { CreatePostSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "@/app/(app)/actions";
import { MAX_POST_CONTENT } from "@/lib/constants";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@/providers/auth.provider";
import { UserAvatar } from "./user-avatar";
import { useQueryClient } from "react-query";
import queryKeyFactory from "@/lib/query-key-factory";
import { useRef } from "react";

export function NewPostForm() {
  const {
    auth: { user },
  } = useAuth();
  const form = useForm<CreatePostSchema>({
    defaultValues: { content: "" },
    resolver: zodResolver(CreatePostSchema),
  });
  const queryClient = useQueryClient();
  async function onSubmit(values: CreatePostSchema) {
    form.reset();
    updateTextareaHeight();
    await createPost(values);
    await queryClient.invalidateQueries(queryKeyFactory.me.posts("feed"));
  }
  const textareaRef = useRef<HTMLTextAreaElement>(null!);
  function updateTextareaHeight() {
    const target = textareaRef.current;
    target.style.height = `auto`;
    target.style.height = `${target.scrollHeight}px`;
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="">
        <CardContent className="p-4">
          <div className="flex items-start gap-2 ">
            {user && <UserAvatar {...user} />}
            <Textarea
              id="new-chat-input"
              placeholder="What is in your mind!?"
              className="min-h-0 h-auto !ring-0 overflow-hidden resize-none border-0 border-b-2 rounded-none p-2"
              rows={1}
              maxLength={MAX_POST_CONTENT}
              {...form.register("content", {
                onChange: updateTextareaHeight,
              })}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)();
                }
              }}
              ref={(e) => {
                const el = e as HTMLTextAreaElement;
                form.register("content").ref(el);
                textareaRef.current = el;
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex px-4 gap-2">
          <Button variant="outline" size="icon" type="submit">
            <ImageIcon />
          </Button>
          <Button variant="outline" size="icon" type="submit">
            <SmileIcon />
          </Button>
          <div className="flex-grow" />
          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-400">
              {form.watch("content").length}/{MAX_POST_CONTENT}
            </span>
            <Button type="submit">
              <span>Send</span>
              <SendHorizonal />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
