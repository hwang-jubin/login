import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

interface SessionContent {
  id?: number;
  username?: string;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "login-cookie",
    password: process.env.COOKIE_PASSWORD!,
  });
}
