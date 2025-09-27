export type CartProduct = {
  count: number;
  price: number;
  product: {
    id: string;
    title: string;
    imageCover: string;
  };
};

export type CartResponse = {
  status: string;
  cartId: string;
  numOfCartItems: number;
  data: {
    products: CartProduct[];
    totalCartPrice: number;
  };
};
