import { getPost } from "../../actions";
import { notFound } from "next/navigation";
import PostPage from "./post-page";

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const result = await getPost(postId);
  if (!result.success || !result.data) notFound();
  return <PostPage post={result.data} />;
}
