import PrivacySettings from "./privacy-settings";
import UserSettings from "./user-settings";

export default function Page() {
  return (
    <div>
      <h3 className="text-xl font-semibold my-4">User Settings</h3>
      <hr />
      <UserSettings />
      <h3 className="text-xl font-semibold mb-4 mt-8">Privacy Settings</h3>
      <hr />
      <PrivacySettings />
    </div>
  );
}
