"use server";
import { CartResponse } from "../_interfaces/cart";
import { getAuthenticatedUserToken } from "../utils/getUserToken";

export async function getUserCart(): Promise<CartResponse | null> {
  const userToken = await getAuthenticatedUserToken();

  if (!userToken) return null;

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: userToken as string,
      },
      cache: "force-cache",
      next: { tags: ["userCart"] },
    });

    const final: CartResponse = await res.json();
    return final;

  } catch (error) {
    return null;
  }
}
