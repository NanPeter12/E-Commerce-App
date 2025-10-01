// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { jwtDecode } from "jwt-decode";

// export const nextAuthConfig: NextAuthOptions = {
//   providers: [

//     Credentials({
//       name: "Fresh Cart",

//       authorize: async function (credentials, req) {

//         const res = await fetch(
//           "https://ecommerce.routemisr.com/api/v1/auth/signin",
//           {
//             method: "POST",
//             body: JSON.stringify(credentials),
//             headers: { "Content-Type": "application/json" },
//           }
//         );

//         const finalRes = await res.json();

//         if (finalRes.message === "success") {
//           const DecodedOBJ = jwtDecode(finalRes.token);

//           return {
//             id: DecodedOBJ.id,
//             name: finalRes.user.name,
//             email: finalRes.user.email,
//             credentialsToken: finalRes.token,
//           };
//         }
//         return null;
//       },

//       credentials: {

//         email: { label: "Email", type: "text", placeholder: "email" },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "password",
//         },
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/login",
//   },

//   callbacks: {

//     jwt(params) {

//       if (params.user) {
//         params.token.credentialsToken = params.user.credentialsToken;
//         params.token.userID = params.user.id;
//       }
//       return params.token;
//     },

//     session(params) {
//       params.session.user.id = params.token.userID;
//       return params.session;
//     },
//   },

//   session: {
//     maxAge: 60 * 60 * 24 * 7,
//   },
// };

// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { jwtDecode } from "jwt-decode";

// type CustomJwtPayload = {
//   id: string;
// };

// type AuthUser = {
//   id: string;
//   name: string;
//   email: string;
//   credentialsToken: string;
// };

// export const nextAuthConfig: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: "Fresh Cart",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "email" },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "password",
//         },
//       },
//       authorize: async (credentials) => {
//         const res = await fetch(
//           "https://ecommerce.routemisr.com/api/v1/auth/signin",
//           {
//             method: "POST",
//             body: JSON.stringify(credentials),
//             headers: { "Content-Type": "application/json" },
//           }
//         );
//         const finalRes = await res.json();

//         if (finalRes.message === "success") {
//           const decoded = jwtDecode<CustomJwtPayload>(finalRes.token);

//           return {
//             id: decoded.id,
//             name: finalRes.user.name,
//             email: finalRes.user.email,
//             credentialsToken: finalRes.token,
//           } as AuthUser;
//         }
//         return null;
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/login",
//   },

//   callbacks: {
//     jwt({ token, user }) {
//       if (user) {
//         const authUser = user as AuthUser;
//         token.credentialsToken = authUser.credentialsToken;
//         token.userID = authUser.id;
//       }
//       return token;
//     },
//     session({ session, token }) {
//       if (token.userID) {
//         (session.user as any).id = token.userID;
//       }
//       return session;
//     },
//   },

//   session: {
//     maxAge: 60 * 60 * 24 * 7,
//   },
// };

// src/next-auth/nextAuth.ts
// import { NextAuthOptions, User as NextAuthUser } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { jwtDecode } from "jwt-decode";

// type CustomJwtPayload = {
//   id: string;
// };

// export type AuthUser = {
//   id: string;
//   name: string;
//   email: string;
//   credentialsToken: string;
// };

// declare module "next-auth" {
//   interface Session {
//     user: AuthUser;
//   }
//   interface User extends AuthUser {}
//   interface JWT {
//     credentialsToken?: string;
//     userID?: string;
//   }
// }

// export const nextAuthConfig: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: "Fresh Cart",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "email" },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "password",
//         },
//       },

//       authorize: async (credentials) => {
//         const res = await fetch(
//           "https://ecommerce.routemisr.com/api/v1/auth/signin",
//           {
//             method: "POST",
//             body: JSON.stringify(credentials),
//             headers: { "Content-Type": "application/json" },
//           }
//         );

//         if (!res.ok) {
//           console.error("API login failed:", res.status, res.statusText);
//           return null;
//         }

//         const finalRes = await res.json();

//         if (finalRes.message === "success") {
//           const decoded = jwtDecode<CustomJwtPayload>(finalRes.token);

//           return {
//             id: decoded.id,
//             name: finalRes.user.name,
//             email: finalRes.user.email,
//             credentialsToken: finalRes.token,
//           } as AuthUser;
//         }

//         return null;
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/login",
//   },

//   callbacks: {
//     jwt({ token, user }) {
//       if (user) {
//         const authUser = user as AuthUser;
//         token.credentialsToken = authUser.credentialsToken;
//         token.userID = authUser.id;
//       }
//       return token;
//     },

//     session({ session, token }) {
//       if (session.user && token.userID && token.credentialsToken) {
//         session.user = {
//           ...session.user,
//           id: token.userID,
//           credentialsToken: token.credentialsToken,
//         } as AuthUser;
//       }
//       return session;
//     },
//   },

//   session: {
//     maxAge: 60 * 60 * 24 * 7,
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

import { AuthOptions } from "next-auth";  // مهم
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthUser, JwtCallbackParams, SessionCallbackParams } from "./nextAuth.types";

export const nextAuthConfig: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },

  providers: [
    CredentialsProvider({
      name: "Fresh Cart",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );
        if (!res.ok) return null;
        const data = await res.json();
        if (data.message === "success" && data.user) {
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            accessToken: data.token,
          } as AuthUser;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: JwtCallbackParams) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }: SessionCallbackParams) {
      if (session.user && token) {
        session.user = {
          id: token.id!,
          name: token.name!,
          email: token.email!,
          accessToken: token.accessToken!,
        };
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt" as const, // ✅ هتمنع TypeScript error
    maxAge: 60 * 60 * 24 * 7,
  },

  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};
