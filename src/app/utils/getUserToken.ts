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


// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";
// import { AuthUser } from "../../next-auth/nextAuth.config";

// export async function getAuthenticatedUserToken(): Promise<string | undefined> {
//   const cookieStore = await cookies(); 
//   const sessionCookie = cookieStore.get("next-auth.session-token")?.value;

//   if (!sessionCookie) return undefined;

//   const decodedToken = (await decode({
//     token: sessionCookie,
//     secret: process.env.NEXTAUTH_SECRET || "",
//   })) as AuthUser | null;

//   return decodedToken?.credentialsToken;
// }



// import { AuthUser } from "_/next-auth/nextAuth.types";
// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export async function getAuthenticatedUserToken(): Promise<string | undefined> {
//   // جلب الـ cookies
//   const cookieStore = await cookies();
//   const sessionCookie = cookieStore.get(
//     process.env.NODE_ENV === "production"
//       ? "__Secure-next-auth.session-token"
//       : "next-auth.session-token"
//   )?.value;

//   if (!sessionCookie) return undefined;

//   // Decode الـ JWT
//  const decodedToken = (await decode({
//      token: sessionCookie,
//      secret: process.env.NEXTAUTH_SECRET || "",
//    })) as AuthUser | null;
   
//   if (!decodedToken || typeof decodedToken !== "object" || !("accessToken" in decodedToken)) {
//     return undefined;
//   }

//   return decodedToken.accessToken as string;
// }

import { AuthUser } from "_/next-auth/nextAuth.types";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAuthenticatedUserToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token"
  )?.value;

  if (!sessionCookie) return undefined;

  const decodedToken = (await decode({
    token: sessionCookie,
    secret: process.env.NEXTAUTH_SECRET || "",
  })) as AuthUser | null;

  if (!decodedToken || typeof decodedToken !== "object" || !("accessToken" in decodedToken)) {
    return undefined;
  }

  return decodedToken.accessToken;
}
