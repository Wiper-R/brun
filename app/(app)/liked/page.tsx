import PostsContainer from "@/components/posts-container";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="text-xl font-bold text-gray-800">Liked Posts</h3>
      <PostsContainer type={"liked"} />
    </div>
  );
}
