import React from 'react'
import { getSpecifiedProducts } from "../../_services/products.services"
import { ProductType } from '../../_interfaces/products'
import ProductGallery from "../../_Components/ProductDetailsImgs/ProductDetailsImgs"
import AddToWishlistBtn from '_/app/_Components/AllWhichlistComponents/AddToWhichlistBtn/AddToWhichlistBtn/AddToWhichlistBtn'

import AddToCartBtn from '_/app/_Components/allCartComponents/AddToCartBtn/AddToCartBtn'
import { ProductDetailsProps } from './ProductDetails.types'

export default async function page(props: ProductDetailsProps) {

    const { id } =  props.params;
    const specifiedProduct: ProductType | null = await getSpecifiedProducts(id);

    if (!specifiedProduct) {
        return (
            <div className="text-center py-20 text-xl font-bold text-red-500">
                Product not found.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl border border-gray-100 rounded-2xl p-6 md:p-10">
                {/* Left: Product Images */}
                <div className="flex justify-center items-start">
                    <ProductGallery
                        mainImage={specifiedProduct.imageCover}
                        images={specifiedProduct.images || []}
                    />
                </div>

                {/* Right: Product Details */}
                <div className="flex flex-col justify-between">
                    {/* Title + Description */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
                            {specifiedProduct.title}
                        </h1>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            {specifiedProduct.description}
                        </p>

                        {/* Brand & Category */}
                        <div className="flex flex-wrap items-center gap-6 mb-6 border-b pb-4">
                            {specifiedProduct.brand && (
                                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                                    <img
                                        src={specifiedProduct.brand.image}
                                        alt={specifiedProduct.brand.name}
                                        className="w-8 h-8 object-contain rounded-full"
                                    />
                                    <span className="text-sm font-semibold text-gray-700">
                                        {specifiedProduct.brand.name}
                                    </span>
                                </div>
                            )}
                            {specifiedProduct.category && (
                                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                                  
                                    <span className="text-sm font-semibold text-gray-700">
                                        Category: {specifiedProduct.category.name}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            {specifiedProduct.priceAfterDiscount ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl font-extrabold text-green-600">
                                        ${specifiedProduct.priceAfterDiscount}
                                    </span>
                                    <span className="text-xl text-gray-400 line-through">
                                        ${specifiedProduct.price}
                                    </span>
                                    <span className="text-base font-bold text-red-500 bg-red-50 p-1 rounded">
                                        -{Math.round(
                                            100 - (specifiedProduct.priceAfterDiscount / specifiedProduct.price) * 100
                                        )}%
                                    </span>
                                </div>
                            ) : (
                                <span className="text-4xl font-extrabold text-green-600">
                                    ${specifiedProduct.price}
                                </span>
                            )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex text-yellow-500 text-xl">
                                {"⭐".repeat(Math.floor(specifiedProduct.ratingsAverage))}
                                <span className="text-gray-300">
                                    {"⭐".repeat(5 - Math.floor(specifiedProduct.ratingsAverage))}
                                </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-600">
                                ({specifiedProduct.ratingsAverage} rating, {specifiedProduct.ratingsQuantity} reviews)
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <AddToCartBtn productId={specifiedProduct.id} />
                            <AddToWishlistBtn productId={specifiedProduct.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}