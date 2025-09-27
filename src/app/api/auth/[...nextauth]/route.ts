import NextAuth from "next-auth";
// import { nextAuthConfig } from "../../../../next-auth/nextAuth.config";
import { nextAuthConfig } from "../../../../next-auth/nextAuth.config"; // <--- هذا المسار صحيح الآن


const nextHandler = NextAuth(nextAuthConfig);

export { nextHandler as GET, nextHandler as POST };
