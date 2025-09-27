import { ProductType } from "../_interfaces/products";

export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
      cache: "force-cache",
    });
    const finalResult = await res.json();
    return finalResult.data as ProductType[];
  } catch (error) {
    return [];
  }
}

export async function getSpecifiedProducts(
  id: string
): Promise<ProductType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {
        cache: "no-store",
      }
    );
    const finalResult = await res.json();
    return finalResult.data as ProductType;
  } catch (error) {
    return null;
  }
}
