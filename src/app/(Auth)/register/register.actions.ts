"use server";
import { cookies } from "next/headers";
import { RegisterSchemaType } from "./register.types";

export async function handleRegister(data: RegisterSchemaType) {

  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const finalResponse = await res.json();

    if (finalResponse.message === "success") {
      const { token } = finalResponse;

      const cookie = await cookies();
      cookie.set("token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
      }); 

      return true;
    } 
    else {
      return finalResponse.message;
    }
  } catch (error) {
    return "Something went wrong!";
  }
}
