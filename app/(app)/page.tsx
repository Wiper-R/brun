import { NewPostForm } from "@/components/new-post-form";
import PostsContainer from "@/components/posts-container";
import { GetPostsType } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type: _type } = await searchParams;
  const type = await GetPostsType.parseAsync(_type);
  return (
    <div className="flex flex-col py-2 gap-4">
      {type == "feed" && <NewPostForm />}
      <PostsContainer type={type} />
    </div>
  );
}
