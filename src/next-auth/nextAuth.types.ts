import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      credentialsToken?: string;
    };
  }

  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    credentialsToken?: string;
  }

  interface JWT {
    userID?: string;
    name?: string | null;
    email?: string | null;
    credentialsToken?: string;
  }
}
