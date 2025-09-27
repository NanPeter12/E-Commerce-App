import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getWhichlistItems } from "../_services/whichlist.services";
// import RemoveFromWhichlistBtn from "../_Components/AllWhichlistComponents/RemoveFromWhichlistBtn/RemoveFromWhichlistBtn";
import { WishlistResponse, WishlistProduct } from "./whichlist.types";
import AddToCartBtn from "../_Components/allCartComponents/AddToCartBtn/AddToCartBtn";
import WishlistBtn from "../_Components/AllWhichlistComponents/HeartWishlistBtn/HeartWishlistBtn";

export default async function Page() {
    const whichListItems: WishlistResponse | null = await getWhichlistItems();

    if (!whichListItems || whichListItems.count === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-96  rounded-2xl shadow-inner p-8 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
                    <span className="text-4xl">❤️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
                <p className="text-gray-500 mb-6">
                    Start exploring products and add your favorites to the wishlist!
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                    Browse Products
                </Link>
            </div>

        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
                Our <span className="text-green-400">Whichlist</span>
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {whichListItems.data.map((item: WishlistProduct) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
                    >
                        {/* product image */}
                        <Link href={`/products/${item.id}`} className="block relative h-48">
                            <Image
                                src={item.imageCover}
                                alt={item.title}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </Link>

                        {/* product info */}
                        <div className="flex flex-col flex-grow mt-3">
                            <h2 className="text-sm font-semibold line-clamp-2">{item.title}</h2>
                            <p className="text-gray-500 text-xs line-clamp-2 mt-1">
                                {item.description}
                            </p>

                            <p className="text-green-600 font-bold mt-2">
                                {item.priceAfterDiscount
                                    ? `${item.priceAfterDiscount} EGP`
                                    : `${item.price} EGP`}
                            </p>
                            {item.priceAfterDiscount && (
                                <p className="text-gray-400 line-through text-xs">
                                    {item.price} EGP
                                </p>
                            )}

                            {/* product rating */}
                            <p className="text-yellow-500 text-xs mt-2">
                                ⭐ {item.ratingsAverage} ({item.ratingsQuantity} reviews)
                            </p>

                            {/* date of adding product */}
                            <p className="text-gray-400 text-xs mt-1">
                                Added on: {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center justify-between gap-1.5">
                            <AddToCartBtn productId={item.id} />

                            {/* clear btn */}

                            <WishlistBtn productId={item.id} />
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}
