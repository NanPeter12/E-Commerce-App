import React from 'react'
import { ProductCardTypeProps } from './ProductCard.types';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from "react-icons/fa";
import AddToCartBtn from '../allCartComponents/AddToCartBtn/AddToCartBtn';
import AddToWishlistBtn from '../AllWhichlistComponents/AddToWhichlistBtn/AddToWhichlistBtn/AddToWhichlistBtn';

export default function ProductCard({ product }: ProductCardTypeProps) {

    return (
        <div
            key={product._id}
            className="bg-neutral-900 rounded-2xl p-5 shadow-md hover:shadow-green-500/30 
            transition-transform duration-300 flex flex-col justify-between hover:scale-105"
        >
            {/* img product*/}
            <Link href={`/productDetails/${product._id}`} className="relative w-full h-48 rounded overflow-hidden block">
                <Image
                    src={product.imageCover}
                    alt={product.slug}
                    fill
                    className="object-cover"
                />
            </Link>

            {/* info product*/}
            <div className="flex flex-col flex-grow mt-4">
                <Link href={`/productDetails/${product._id}`}>
                    <h2 className="text-lg font-semibold text-white line-clamp-1">
                        {product.slug}
                    </h2>
                </Link>
                <p className="text-gray-400 text-sm line-clamp-2 min-h-[40px]">
                    {product.description.slice(0, 60)}...
                </p>
                <p className="text-green-400 text-xs mt-2">
                    {product.category?.name || "Unknown"}
                </p>
            </div>

            {/* price + rate*/}
            <div className="flex justify-between items-center mt-4">
                {product.priceAfterDiscount ? (
                    <div className="flex flex-col">
                        <span className="text-gray-400 line-through text-sm">
                            ${product.price}
                        </span>
                        <span className="text-green-400 font-bold text-lg">
                            ${product.priceAfterDiscount}
                        </span>
                    </div>
                ) : (
                    <span className="text-green-400 font-bold text-lg">
                        ${product.price}
                    </span>
                )}

                <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: Math.floor(product.ratingsAverage) }).map((_, i) => (
                        <FaStar key={i} />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                        {product.ratingsAverage}
                    </span>
                </div>
            </div>

            {/*  Add to Cart */}
            <div className="flex items-center justify-between gap-3 rounded-xl shadow-md p-2 hover:shadow-lg hover:scale-[1.02] transition">
                <AddToCartBtn productId={product._id} />
                <AddToWishlistBtn productId={product._id} />
            </div>


        </div>
    )
}

