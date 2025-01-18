import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, MessageCircle, Share, Share2 } from "lucide-react";
import Image from "next/image";

function DummyPost() {
  return (
    <div className="p-4 rounded border flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>SR</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-sm justify-center">
          <span>Shivang Rathore</span>
          <div className="flex gap-2 items-end justify-center">
            <span className="text-gray-600 font-medium">@shivang</span>
            <span className="text-xs text-gray-700">08:40 Today</span>
          </div>
        </div>
      </div>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius minima
        maiores saepe, ratione velit sit neque atque iste id, magnam temporibus
        mollitia tempora aperiam hic repellat enim debitis explicabo rem.
      </p>
      {/* <Image */}
      {/*   src="https://placehold.co/600x400.png" */}
      {/*   alt="Placeholder Image" */}
      {/*   width={600} */}
      {/*   height={400} */}
      {/*   className="w-full object-cover border border-border rounded-lg" */}
      {/* /> */}
      <hr />
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Heart className="fill-red-500 text-red-500" />
          <span>600</span>
        </Button>
        <Button variant="outline" size="sm">
          <MessageCircle className="" />
          <span>5 </span>
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

export default function Home() {
  const numPosts = 10;
  return (
    <div className="flex flex-col gap-10">
      {new Array(numPosts).fill(0).map((_, i) => (
        <DummyPost key={i} />
      ))}
    </div>
  );
}
