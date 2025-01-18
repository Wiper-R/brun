import env from "@/env";
import { SessionData } from "@/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export default async function getSessionData() {
  return await getIronSession<SessionData>(await cookies(), {
    cookieName: "session",
    password: env.JWT_SECRET,
  });
}
