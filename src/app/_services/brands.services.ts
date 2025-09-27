import { BrandType } from "_/app/_interfaces/products";

export async function getAllBrands(): Promise<BrandType[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
    const finalRes = await res.json();
    return finalRes.data as BrandType[];
  } catch (error) {
    return [];
  }
}

export async function getSpecifiedBrand(_id: string): Promise<BrandType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${_id}`
    );
    const finalRes = await res.json();
    // console.log("finalRes", finalRes);
    return finalRes.data as BrandType;
  } catch (error) {
    return null;
  }
}

