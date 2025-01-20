import { NewPostForm } from "@/components/new-post-form";
import PostsContainer from "@/components/posts-container";

export default async function Page() {
  return (
    <div className="flex flex-col py-2 gap-4">
      <NewPostForm />
      <PostsContainer type={"feed"} />
    </div>
  );
}
