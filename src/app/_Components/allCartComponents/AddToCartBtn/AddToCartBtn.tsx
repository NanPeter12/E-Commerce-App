"use client"
import { addProductToCart } from '_/app/cart/cart.actions'
import { CartContext } from '_/app/Contexts/cartContext'
import { deleteSpecificItemFromTheWhichlist } from '_/app/whichlist/Whichlist.actions'
import React, { useContext } from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { toast } from 'sonner'

type AddToCartBtnProps = {
    productId: string;
}
export default function AddToCartBtn({ productId }: AddToCartBtnProps) {

    const { updateCartCount } = useContext(CartContext);
;

    async function handleAddToCart() {
        const res = await addProductToCart(productId);

        if (res.status === "success") {
            toast.success(res.message, { position: "top-center", duration: 3000 });
            updateCartCount(res.numOfCartItems);

            await deleteSpecificItemFromTheWhichlist(productId);
        } else {
            toast.error(res.message, { position: "top-center", duration: 3000 });
        }
    }

    return (
        <>
            {<button
                className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg 
                hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm font-medium cursor-pointer"
                onClick={handleAddToCart}

            >
                <FaCartPlus className="w-4 h-4 " />
                Add to Cart
            </button>}
        </>
    )
}
