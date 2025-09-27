export async function getAllOrders(userId: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      { cache: "no-cache" } 
    );
    const final = await res.json();
    return final; 
  } catch (error) {
    return null;
  }
}
