"use client";
import { useState } from "react";
import { handleForgotPassword } from "../forgotpassword/forgotPassword";
import { Label } from "@radix-ui/react-label";
import { Input } from "_/components/ui/input";
import { Button } from "_/components/ui/button";
import { useRouter } from "next/navigation";

type Password = {
  statusMsg: string;
  message?: string;
};

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  async function ForgotPass(e: React.FormEvent) {
    e.preventDefault();

    const data: Password = await handleForgotPassword(email); 

    if (data?.statusMsg === "success") {
      alert("Reset code has been sent to your email.");
      router.push("/verify-reset-code");
    } else {
      alert(data?.message || "Something went wrong!");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
      <form onSubmit={ForgotPass} className="space-y-4">
        <div>
          <Label className="font-semibold" htmlFor="email">Email Address : </Label>
          <Input
            className="my-3"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-green-600 text-white hover:bg-green-700 cursor-pointer"
        >
          Send Reset Code
        </Button>
      </form>
    </div>
  );
}



