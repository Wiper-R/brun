import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { cn, formatTime, toAbbr } from "@/lib/utils";
import { PostWithAuthor } from "@/types";
import { likePost } from "@/app/(app)/actions";

export function PostCard({ post }: { post: PostWithAuthor }) {
  return (
    <div className="p-4 rounded border flex flex-col gap-4 bg-white">
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>{toAbbr(post.author.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-sm justify-center">
          <span>{post.author.name}</span>
          <div className="flex gap-2 items-end justify-center">
            <span className="text-gray-600 font-medium">
              @{post.author.username}
            </span>
            <span className="text-xs text-gray-700">
              {formatTime(post.createdAt)}
            </span>
          </div>
        </div>
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
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={async () => await likePost(post.id)}
        >
          <Heart
            className={cn(post.likes.length > 0 && "text-red-500 fill-red-500")}
          />
          {post.numLikes > 0 && <span>{post.numLikes}</span>}
        </Button>
        <Button variant="outline" size="sm">
          <MessageCircle className="" />
          {post._count.comments > 0 && <span>{post._count.comments}</span>}
        </Button>
        <div className="flex-grow" />
        <Button variant="outline" size="sm">
          <Bookmark className="" />
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="" />
        </Button>
      </div>
    </div>
  );
}
