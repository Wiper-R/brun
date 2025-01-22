import { Label } from "@/components/ui/label";
import PrivacySettings from "./privacy-settings";
import UserSettings from "./user-settings";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <h3 className="text-xl font-semibold my-4">User Settings</h3>
      <hr />
      <UserSettings />
      <h3 className="text-xl font-semibold mb-4 mt-8">Devices and Session</h3>
      <hr />
      <div className="flex justify-between items-center my-4">
        <Label>Logout from current device</Label>
        <Link
          href="/logout"
          className={buttonVariants({
            variant: "destructive",
            className: "w-fit",
          })}
        >
          Logout
        </Link>
      </div>
      <h3 className="text-xl font-semibold mb-4 mt-8">Privacy Settings</h3>
      <hr />
      <PrivacySettings />
    </div>
  );
}
