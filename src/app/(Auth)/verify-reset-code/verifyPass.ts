"use server";

export async function verifyResetCode(resetCode: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      }
    );

    const data = await res.json();
    return data; 
    
  } catch (error) {
    return { status: "Error", message: "Server error, please try again." };
  }
}
