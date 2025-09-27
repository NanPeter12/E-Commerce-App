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
import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

// نوع الـ JWT بعد فك التشفير
type CustomJwtPayload = {
  id: string;
};

// نوع المستخدم بعد تسجيل الدخول
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  credentialsToken: string;
};

// Type augmentation لـ NextAuth
declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
  interface User extends AuthUser {}
  interface JWT {
    credentialsToken?: string;
    userID?: string;
  }
}

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Fresh Cart",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },

      authorize: async (credentials) => {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          console.error("API login failed:", res.status, res.statusText);
          return null;
        }

        const finalRes = await res.json();


        if (finalRes.message === "success") {
          const decoded = jwtDecode<CustomJwtPayload>(finalRes.token);

          return {
            id: decoded.id,
            name: finalRes.user.name,
            email: finalRes.user.email,
            credentialsToken: finalRes.token,
          } as AuthUser;
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser;
        token.credentialsToken = authUser.credentialsToken;
        token.userID = authUser.id;
      }
      return token;
    },

    session({ session, token }) {
      if (session.user && token.userID && token.credentialsToken) {
        session.user = {
          ...session.user,
          id: token.userID,
          credentialsToken: token.credentialsToken,
        } as AuthUser;
      }
      return session;
    },
  },

  session: {
    maxAge: 60 * 60 * 24 * 7, // 7 أيام
  },

  secret: process.env.NEXTAUTH_SECRET,
};
