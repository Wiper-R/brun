import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "../ui/dialog";
import { FollowersList } from "./followers-list";
export async function FollowersDialog({
  Trigger,
}: {
  Trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Followers</DialogTitle>
        </DialogHeader>
        <FollowersList />
      </DialogContent>
    </Dialog>
  );
}
