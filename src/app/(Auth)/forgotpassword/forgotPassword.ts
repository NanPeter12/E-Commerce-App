"use server";

export async function handleForgotPassword(email: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    return data;
    
  } catch (error) {
    alert("Server error, please try again.");
  }
}
