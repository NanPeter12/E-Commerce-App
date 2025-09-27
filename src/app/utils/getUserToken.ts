// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";


// export async function getAuthenticatedUserToken() {
//   const cookie = await cookies();

//   const sessionToken = cookie.get("next-auth.session-token")?.value;

//   const DECODEDTOKEN = await decode({
//     token: sessionToken,
//     secret: process.env.NEXTAUTH_SECRET || "",
//   });


//   return DECODEDTOKEN?.credentialsToken;
// }


import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { AuthUser } from "../../next-auth/nextAuth.config";

export async function getAuthenticatedUserToken(): Promise<string | undefined> {
  // جلب الكوكيز
  const cookieStore = await cookies(); // await لأنه بيرجع Promise
  const sessionCookie = cookieStore.get("next-auth.session-token")?.value;

  if (!sessionCookie) return undefined;

  const decodedToken = (await decode({
    token: sessionCookie,
    secret: process.env.NEXTAUTH_SECRET || "",
  })) as AuthUser | null;

  return decodedToken?.credentialsToken;
}



