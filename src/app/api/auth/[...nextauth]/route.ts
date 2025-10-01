// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import { nextAuthConfig } from "_/next-auth/nextAuth.config";

const handler = NextAuth(nextAuthConfig as NextAuthOptions);

export { handler as GET, handler as POST };
