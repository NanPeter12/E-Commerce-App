import { nextAuthConfig } from "_/next-auth/nextAuth.config";
import NextAuth from "next-auth";



const nextHandler = NextAuth(nextAuthConfig);

export { nextHandler as GET, nextHandler as POST };
