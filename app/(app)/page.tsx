import { NewPostForm } from "@/components/new-post-form";
import PostsContainer from "@/components/posts-container";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <NewPostForm />
      <PostsContainer />
    </div>
  );
}
