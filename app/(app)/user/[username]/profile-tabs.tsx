"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "react-query";
import { getComments, getProfile, getUserPosts } from "../../actions";
import { PostCard } from "@/components/post-card";
import { CommentPostReferenceCard } from "@/components/comment-post-reference-card";
import queryKeyFactory from "@/lib/query-key-factory";

function PostsView({ username }: { username: string }) {
  const { data } = useQuery({
    async queryFn() {
      const result = await getUserPosts(username);
      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
    queryKey: queryKeyFactory.users.posts(username),
  });
  return (
    <div className="space-y-6">
      {data && data.length > 0 ? (
        data.map((post) => <PostCard post={post} key={post.id} />)
      ) : (
        <p className="text-gray-800 mt-4 text-sm">This user hasn't posted</p>
      )}
    </div>
  );
}
function CommentsView({ username }: { username: string }) {
  const { data } = useQuery({
    async queryFn() {
      const result = await getComments({ username });
      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
    queryKey: queryKeyFactory.users.comments(username),
  });

  const { data: user } = useQuery({
    async queryFn() {
      const result = await getProfile(username);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result.data;
    },
    queryKey: queryKeyFactory.users.all(username),
  });
  return (
    <div className="space-y-6">
      {data && user && data.length > 0 ? (
        data.map((post) => (
          <CommentPostReferenceCard comment={post} user={user} key={post.id} />
        ))
      ) : (
        <p className="text-gray-800 mt-4 text-sm">
          This user hasn't posted any comments
        </p>
      )}
    </div>
  );
}

export default function ProfileTabs({ username }: { username: string }) {
  return (
    <Tabs defaultValue="posts">
      <TabsList className="bg-transparent gap-0">
        <TabsTrigger
          value="posts"
          className="shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 rounded-none"
        >
          Posts
        </TabsTrigger>
        <TabsTrigger
          value="comments"
          className="shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 rounded-none"
        >
          Comments
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <PostsView username={username} />
      </TabsContent>
      <TabsContent value="comments">
        <CommentsView username={username} />
      </TabsContent>
    </Tabs>
  );
}
