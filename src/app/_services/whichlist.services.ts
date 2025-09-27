"use server";
import { getAuthenticatedUserToken } from "../utils/getUserToken";
import { WishlistResponse } from "../whichlist/whichlist.types";

export async function getWhichlistItems(): Promise<WishlistResponse | null> {
  const userToken = await getAuthenticatedUserToken();
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: userToken as string,
      },
      cache: "force-cache",
      next: { tags: ["userWhichlist"] },
    });

    const final: WishlistResponse = await res.json();
    return final;

  } catch (error) {
    return null;
  }
}
