import NextAuth from "next-auth";
// import { nextAuthConfig } from "../../../../next-auth/nextAuth.config";
import { nextAuthConfig } from "../../../../next-auth/nextAuth.config"; 


const nextHandler = NextAuth(nextAuthConfig);

export { nextHandler as GET, nextHandler as POST };
