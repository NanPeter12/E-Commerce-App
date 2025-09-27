"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginForm from "./LoginForm";

export default function LoginPage() {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user) {

      router.replace("/");
    }
  }, [session, status, router]);

  return (
    <div className="md:w-1/2 mx-auto min-h-screen md:p-[50px] p-5">
      <h1 className="text-6xl font-bold mb-5 text-center">Login To Your Fresh Cart</h1>
      <LoginForm />
    </div>
  );
}
