import PostsContainer from "@/components/posts-container";

export default function Page() {
  return (
    <div className="flex flex-col py-2 gap-4">
      <h3 className="text-xl font-bold text-gray-800">Saved Posts</h3>
      <PostsContainer type={"saved"} />
    </div>
  );
}
