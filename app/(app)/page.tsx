import { NewPostForm } from "@/components/new-post-form";
import PostsContainer from "@/components/posts-container";
import { GetPostsType } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const _type = (await searchParams).type;
  const type = await GetPostsType.parseAsync(_type);
  return (
    <div className="flex flex-col gap-10 py-2">
      <NewPostForm />
      <PostsContainer type={type} />
    </div>
  );
}
