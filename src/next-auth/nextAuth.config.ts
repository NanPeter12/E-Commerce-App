import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Fresh Cart",

      async authorize(credentials) {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );

        const finalRes = await res.json();
        console.log("finalRes", finalRes);

        if (finalRes.message === "success") {
          const DecodedOBJ: any = jwtDecode(finalRes.token);
          console.log("DecodedOBJ", DecodedOBJ);

          return {
            id: DecodedOBJ.id,
            name: finalRes.user.name,
            email: finalRes.user.email,
            credentialsToken: finalRes.token,
          };
        }
        return null;
      },

      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.credentialsToken = user.credentialsToken;
        token.userID = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      const t = token as { userID?: string; credentialsToken?: string };

      if (session.user) {
        session.user.id = t.userID;
        session.user.credentialsToken = t.credentialsToken;
      }
      return session;
    },
  },

  session: {
    maxAge: 60 * 60 * 24 * 7,
  },
};
