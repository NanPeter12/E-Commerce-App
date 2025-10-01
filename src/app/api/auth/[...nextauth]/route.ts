// app/api/auth/[...nextauth]/route.ts
import { authOptions } from "_/next-auth/nextAuth.config";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
