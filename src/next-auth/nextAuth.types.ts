import { Session } from "next-auth";  // <--- استورد Session
import { JWT } from "next-auth/jwt";

// -----------------------------
// User Type
// -----------------------------
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  accessToken: string; // token من API
};

// -----------------------------
// Extend NextAuth Types
// -----------------------------
declare module "next-auth" {
  interface Session {
    user: AuthUser;
    accessToken?: string;
  }

  interface User extends AuthUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    accessToken?: string;
  }
}

// -----------------------------
// Callback Params Types
// -----------------------------
export type JwtCallbackParams = {
  token: JWT;
  user?: any;
    account?: any;
  profile?: any;
  isNewUser?: boolean;
};

export type SessionCallbackParams = {
  session: Session;  // <--- دلوقتي TS يعرفه
  token: JWT;
};
