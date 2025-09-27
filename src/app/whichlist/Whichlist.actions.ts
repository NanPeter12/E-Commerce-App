"use server";

import { getAuthenticatedUserToken } from "../utils/getUserToken";
import { revalidateTag } from "next/cache";

export async function addProductToWhichlist(productId: string) {
  const Token = await getAuthenticatedUserToken();

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: Token as string,
      },
      body: JSON.stringify({ productId }),
    });

    const final = await res.json();

    revalidateTag("userWhichlist");

    return final;
  } catch (error) {
    return null;
  }
}

export async function deleteSpecificItemFromTheWhichlist(productId: string) {
  const Token = await getAuthenticatedUserToken();

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: Token as string,
        },
      }
    );

    const final = await res.json();

    revalidateTag("userWhichlist");

    return final;
  } catch (error) {
    return null;
  }
}
