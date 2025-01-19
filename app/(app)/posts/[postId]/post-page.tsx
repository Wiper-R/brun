import Controls from "@/components/post-card/controls";
import { buttonVariants } from "@/components/ui/button";
import UserCard from "@/components/user-card";
import { cn } from "@/lib/utils";
import { PostWithAuthor } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CommentContainer from "./comment-container";

function GoBack() {
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "text-gray-700 text-sm items-center gap-4 ml-auto rounded-full",
      )}
    >
      <ArrowLeft className="w-4" />
      {/* <span>Go back</span> */}
    </Link>
  );
}

export default function PostPage({ post }: { post: PostWithAuthor }) {
  return (
    <>
      <div className="mt-6 relative flex items-center gap-2">
        <div className="relative lg:-left-12  lg:absolute">
          <GoBack />
        </div>
        <UserCard user={post.author} time={post.createdAt} />
      </div>
      <div className="mt-4 text-gray-800">{post.content}</div>
      <hr className="my-4" />
      <Controls post={post} />
      <div className="mt-4">
        <h4 className="font-semibold  text-gray-800 text-lg ">Comments</h4>
        <CommentContainer postId={post.id} />
      </div>
    </>
  );
}
