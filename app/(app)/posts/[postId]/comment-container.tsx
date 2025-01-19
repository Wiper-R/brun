"use client";

import { useQuery } from "react-query";
import { getComments } from "../../actions";
import { CommentCard } from "@/components/comment";

export default function CommentContainer({ postId }: { postId: string }) {
  const comments = useQuery({
    async queryFn() {
      const result = await getComments(postId);
      if (!result.success) return null;
      return result.data;
    },

    queryKey: ["posts", postId, "comments"],
  });
  return (
    <div className="flex my-4 flex-col">
      {comments.data?.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
