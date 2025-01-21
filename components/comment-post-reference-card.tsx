import { getComments } from "@/app/(app)/actions";
import { User } from "@/types";
import Link from "next/link";
import UserCard from "./user-card";

type CommentType = Extract<
  Awaited<ReturnType<typeof getComments>>,
  { success: true }
>["data"][0];

export function CommentPostReferenceCard({
  comment,
  user,
}: {
  comment: CommentType;
  user: User;
}) {
  return (
    <div className="p-6 border rounded-md">
      <blockquote className="ml-6 p-4 pt-0 pr-0 flex justify-center flex-col relative">
        <Link href={`/posts/${comment.post.id}`} className="absolute inset-0" />
        <div className="absolute w-1 h-full bg-gray-500/40 -left-4 rounded-full" />
        <div className="flex justify-between">
          <UserCard user={comment.post.author} />
          <span className="text-sm text-gray-500">(Post)</span>
        </div>
        <p className="text-sm mt-2">{comment.post.content}</p>
      </blockquote>
      <div className="mt-4">
        <div className="flex justify-between">
          <UserCard user={user!} time={comment.createdAt} />
          <span className="text-sm text-gray-500">(Comment)</span>
        </div>
        <p className="text-sm mt-2">{comment.content}</p>
      </div>
    </div>
  );
}
