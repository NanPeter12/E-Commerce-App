"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { Input } from "_/components/ui/input";
import { Button } from "_/components/ui/button";

import { verifyResetCode } from "../verify-reset-code/verifyPass"; 

export default function VerifyResetCodePage() {
    
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const data = await verifyResetCode(resetCode);

    if (data.status === "Success") {
      alert("Code verified successfully ✅");
      router.push("/reset-password"); 
    } else {
      alert(data.message || "Invalid reset code ❌");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Reset Code</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <Label htmlFor="resetCode" className="font-semibold">
            Reset Code :
          </Label>
          <Input
            id="resetCode"
            type="text"
            placeholder="Enter the code sent to your email"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            required
            className="my-3"
          />
        </div>
        <Button
          type="submit"
          className="bg-green-600 w-full text-white p-3 rounded-lg hover:bg-green-700 transition-all"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
    </div>
  );
}
