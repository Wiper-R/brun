import { logout } from "@/actions";
import { redirect } from "next/navigation";

export async function GET() {
  await logout();
  redirect("/signin");
}
