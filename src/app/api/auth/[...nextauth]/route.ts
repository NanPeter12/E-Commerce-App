import NextAuth from "next-auth";
import { nextAuthConfig } from "_/next-auth/nextAuth.config";


const nextHandler = NextAuth(nextAuthConfig);

export { nextHandler as GET, nextHandler as POST };
