"use server";
import {  revalidateTag } from "next/cache";
import { getAuthenticatedUserToken } from "../utils/getUserToken";

export async function addProductToCart(productId: string) {
  const TOKEN = await getAuthenticatedUserToken();

  if (!TOKEN) {
    return { status: "error", message: "User not authenticated" };
  }

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "post",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
        token: TOKEN as string,
      },
    });

    const finalRes = await res.json();

    if (finalRes.status === "success") {
      revalidateTag("userCart");
      return {
        status: "success",
        message: finalRes.message,
        numOfCartItems: finalRes.numOfCartItems,
      };
    } else {
      return {
        status: "error",
        message: "Error occurred while adding to cart",
      };
    }
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
}

export async function deleteSpecificItemFromTheCart(productId: string) {
  const TOKEN = await getAuthenticatedUserToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: TOKEN as string,
      },
    }
  );
  const final = await res.json();

  if (final.status === "success") {
    revalidateTag("userCart");
    return {
      status: "success",
      message: "Product deleted succefully",
      numOfCartItems: final.numOfCartItems,
    };
  } else {
    return {
      status: "error",
      message: "Error occurred while deleting this item",
    };
  }
}

export async function changeCount(productId: string, count: number) {
  const TOKEN = await getAuthenticatedUserToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "Put",
      body: JSON.stringify({ count }),
      headers: {
        token: TOKEN as string,
        "Content-Type": "application/json",
      },
    }
  );
  const final = await res.json();

  if (final.status === "success") {
    revalidateTag("userCart");
    return {
      status: "success",
      numOfCartItems: final.numOfCartItems,
    };
  } else {
    return {
      status: "error",
      message: "Error occurred ",
    };
  }
}

export async function clearCartItems() {
  const TOKEN = await getAuthenticatedUserToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart
`,
    {
      method: "DELETE",
      headers: {
        token: TOKEN as string,
      },
    }
  );
  const final = await res.json();

  if (final.message === "success") {
    revalidateTag("userCart");
    return {
      message: final.message,
    };
  } else {
    return {
      message: "Error occurred while clearing the cart ",
    };
  }
}
