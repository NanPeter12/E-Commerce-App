"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { Input } from "_/components/ui/input";
import { Button } from "_/components/ui/button";
import { resetPassword } from "./resetPass";

export default function ResetPasswordPage() {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const data = await resetPassword(email, newPassword);
    setLoading(false);
    
    if (data.ok) {
      alert("Password reset successful ✅");
      router.push("/login");
    } else {
      alert(data.message || "Unable to reset password ❌");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <Label htmlFor="email" className="font-semibold">Email : </Label>
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

        <div>
          <Label htmlFor="newPassword" className="font-semibold">New Password : </Label>
          <Input
            className="my-3"
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>



        <Button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
