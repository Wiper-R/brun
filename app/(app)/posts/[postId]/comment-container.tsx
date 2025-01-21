"use client";

import { useQuery } from "react-query";
import { getPostComments } from "../../actions";
import { CommentCard } from "@/components/comment";
import queryKeyFactory from "@/lib/query-key-factory";

export default function CommentContainer({ postId }: { postId: string }) {
  const comments = useQuery({
    async queryFn() {
      const result = await getPostComments(postId);
      if (!result.success) return null;
      return result.data;
    },

    queryKey: queryKeyFactory.posts.comments(postId),
  });
  return (
    <div className="flex my-4 flex-col">
      {comments.data?.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
