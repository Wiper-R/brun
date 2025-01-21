"use client";

import { useQuery } from "react-query";
import { getComments } from "../actions";
import { useAuth } from "@/providers/auth.provider";
import { Loader2 } from "lucide-react";
import { CommentPostReferenceCard } from "@/components/comment-post-reference-card";

export default function CommentsContainer() {
  const {
    auth: { user, state },
  } = useAuth();
  const { data } = useQuery({
    async queryFn() {
      const result = await getComments({ username: null });
      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
  });
  return (
    <div className="my-4">
      <div className="text-xl font-semibold">Your comments</div>
      <hr className="my-4" />
      {data && data.length > 0 ? (
        data.map((c) => (
          <CommentPostReferenceCard comment={c} key={c.id} user={user!} />
        ))
      ) : (
        <div>Your haven't comment on any post</div>
      )}
    </div>
  );
}
