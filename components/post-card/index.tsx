import { PostWithAuthor } from "@/types";
import Link from "next/link";
import UserCard from "../user-card";
import Controls from "./controls";

export function PostCard({ post }: { post: PostWithAuthor }) {
  return (
    <Link
      className="p-4 rounded border flex flex-col gap-4 bg-white border-border"
      href={`/posts/${post.id}`}
    >
      <UserCard user={post.author} time={post.createdAt} />
      <p className="text-sm">{post.content}</p>
      {/* <Image */}
      {/*   src="https://placehold.co/600x400.png" */}
      {/*   alt="Placeholder Image" */}
      {/*   width={600} */}
      {/*   height={400} */}
      {/*   className="w-full object-cover border border-border rounded-lg" */}
      {/* /> */}
      <hr />
      <Controls post={post} />
    </Link>
  );
}
