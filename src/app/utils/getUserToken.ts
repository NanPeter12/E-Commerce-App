"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

// tost5dm bs fel server component aw server action 3shan el cookies

export async function getAuthenticatedUserToken() {
  const cookie = await cookies();

  const sessionToken = cookie.get("next-auth.session-token")?.value;

  const DECODEDTOKEN = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET || "",
  });

  return DECODEDTOKEN?.credentialsToken;
}



