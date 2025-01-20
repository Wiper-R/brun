import { getUser } from "@/actions";
import { UserAvatar } from "@/components/user-avatar";
import { getProfile } from "../../actions";
import { notFound } from "next/navigation";
import FollowButton from "./follow-button";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const user = (await getUser())!;
  const { username } = await params;
  const result = await getProfile(username);
  if (!result.success || !result.data) {
    notFound();
  }
  const profile = result.data;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center my-4">
        <UserAvatar className="w-20 h-20 text-3xl" {...profile} />
        <div className="grid w-full">
          <div className="flex justify-between">
            <div className="grid">
              <span>{profile?.name}</span>
              <span className="text-sm font-semibold text-gray-600">
                @{profile?.username}
              </span>
            </div>
            {user.username != profile.username && (
              <FollowButton username={profile.username} />
            )}
          </div>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex gap-1 items-center text-sm">
              <span className="font-bold">{profile._count.followers}</span>
              <span>Followers</span>
            </div>
            <div className="flex gap-1 items-center text-sm">
              <span className="font-bold">{profile._count.following}</span>
              <span>Following</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
