import { CategoryType } from "../_interfaces/products";

export async function getAllCategories(): Promise<null | CategoryType[]> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        cache: "no-cache",
      }
    );
    const finalResult = await res.json();
    return finalResult.data;
  } catch (error) {
    return null;
  }
}

export async function getSubCategoriesByCategory(
  _id: string
): Promise<CategoryType[] | []> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${_id}/subcategories`,
      {
        cache: "no-cache",
      }
    );
    const finalResult = await res.json();
    console.log("finalResultCateg", finalResult);
    return finalResult.data;
  } catch (error) {
    return [];
  }
}
