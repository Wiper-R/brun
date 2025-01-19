import { NewPostForm } from "@/components/new-post-form";
import PostsContainer from "@/components/posts-container";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-2">
      <NewPostForm />
      <PostsContainer />
    </div>
  );
}
