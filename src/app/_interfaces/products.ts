export type ProductType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageCover: string;
  images?: string[];
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  ratingsQuantity: number; 

  ratingsAverage: number;
  category: CategoryType;
  brand?: BrandType;
};

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type BrandType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};
