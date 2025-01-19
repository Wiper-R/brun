import { PostWithAuthor } from "@/types";
import Link from "next/link";
import UserCard from "../user-card";
import Controls from "./controls";

export function PostCard({ post }: { post: PostWithAuthor }) {
  return (
    <div
      className="p-4 rounded border flex flex-col gap-4 bg-white border-border relative"
      role="link"
    >
      <Link href={`/posts/${post.id}`} className="absolute inset-0" />
      <div className="relative z-10">
        <UserCard user={post.author} time={post.createdAt} />
      </div>
      <p className="text-sm">{post.content}</p>
      {/* <Image */}
      {/*   src="https://placehold.co/600x400.png" */}
      {/*   alt="Placeholder Image" */}
      {/*   width={600} */}
      {/*   height={400} */}
      {/*   className="w-full object-cover border border-border rounded-lg" */}
      {/* /> */}
      <hr />
      <div className="relative z-10 pointer-events-none">
        <Controls post={post} />
      </div>
    </div>
  );
}
