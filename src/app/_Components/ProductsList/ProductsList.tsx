"use client";
import { ProductType } from "_/app/_interfaces/products";
import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";


export default function ProductsList({ products }: { products: ProductType[] }) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 sm:p-4 md:p-10 lg:p-16">
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 rounded-xl border border-gray-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
