// "use server";

// import React from "react";
// import { LoginSchemaType } from "./login.types";
// import { cookies } from "next/headers";

// export async function handleLogin(data: LoginSchemaType) {
//   try {
//     const res = await fetch(
//       "https://ecommerce.routemisr.com/api/v1/auth/signin",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );
//     const finalResponse = await res.json();

//     if (finalResponse.message === "success") {
//       const { token } = finalResponse;
//       const cookie = await cookies();
//       cookie.set({
//         name: "token",
//         value: token,
//         // path: "/",
//         httpOnly: true,
//         sameSite: "strict",
//       });

//       return true;
//     } else {
//       return finalResponse.message;
//     }
//   } catch (error) {
// return null;   }
// }
