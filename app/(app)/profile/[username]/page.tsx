import { getUser } from "@/actions";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

export default async function Page() {
  const user = await getUser();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center my-4">
        <UserAvatar className="w-20 h-20 text-3xl" {...user!} />
        <div className="grid w-full">
          <div className="flex justify-between">
            <div className="grid">
              <span>{user?.name}</span>
              <span className="text-sm font-semibold text-gray-600">
                @{user?.username}
              </span>
            </div>
            <Button size="sm">Follow</Button>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex gap-1 items-center text-sm">
              <span className="font-bold">1000</span>
              <span>Followers</span>
            </div>
            <div className="flex gap-1 items-center text-sm">
              <span className="font-bold">1000</span>
              <span>Following</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
