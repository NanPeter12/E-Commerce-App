"use server";
import { getAuthenticatedUserToken } from "_/app/utils/getUserToken";
import { revalidatePath } from "next/cache";
import { Router } from "next/router";

export type shippingAddressType = {
  details: string;
  phone: string;
  city: string;
};

export async function createCashOrder(
  cartId: string | null,
  shippingAddress: shippingAddressType
) {
  const TOKEN = await getAuthenticatedUserToken();

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token: TOKEN as string,
          "Content-Type": "application/json",
        },
      }
    );

    const final = await res.json();
    if (final.status == "success") {
      revalidatePath("/cart");

      return true;
    } else {
      return false;
    }
  } catch (error) {
    return null;
  }
}
