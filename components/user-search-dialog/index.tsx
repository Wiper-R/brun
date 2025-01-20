import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "../ui/dialog";
import { SearchUserList } from "./search-user-list";
export async function UserSearchDialog({
  Trigger,
}: {
  Trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Users</DialogTitle>
        </DialogHeader>
        <SearchUserList />
      </DialogContent>
    </Dialog>
  );
}
