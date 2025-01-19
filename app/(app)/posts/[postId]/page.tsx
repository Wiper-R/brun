import Link from "next/link";
import { getPost } from "../../actions";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const result = await getPost(postId);
  if (!result.success || !result.data) notFound();
  return (
    <div className="flex flex-col">
      <Link href="/">Go back</Link>;{postId}
    </div>
  );
}
