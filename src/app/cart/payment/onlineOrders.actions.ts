"use server";
import { getAuthenticatedUserToken } from "_/app/utils/getUserToken";
import { revalidatePath } from "next/cache";
import { shippingAddressType } from "./Cash Order.actions";

export async function createOnlineOrder(
  cartId: string | null,
  shippingAddress: shippingAddressType
) {
  const TOKEN = await getAuthenticatedUserToken();

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.MY_Domain}`,
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
    if (final.status === "success") {
      revalidatePath("/cart"); 
      return final; 
    }
  } catch (error) {
    return null;
  }
}
