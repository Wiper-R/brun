import UserCard from "./user-card";
import { CommentWithAuthor } from "@/types";

export function CommentCard({ comment }: { comment: CommentWithAuthor }) {
  return (
    <div className="border-b py-4">
      <UserCard user={comment.author} time={comment.createdAt} />
      <p className="mt-4 text-sm">{comment.content}</p>
    </div>
  );
}
