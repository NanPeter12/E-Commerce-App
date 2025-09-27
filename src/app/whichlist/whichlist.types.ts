export type WishlistProduct = {
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    priceAfterDiscount?: number;
    imageCover: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    createdAt: string;
    updatedAt: string;
};

export type WishlistResponse = {
    status: string; // "success" | "fail"
    count: number;
    data: WishlistProduct[];
};