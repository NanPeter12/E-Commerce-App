"use client"

import { Button } from "_/components/ui/button"
import { useContext } from "react";
import { CartContext } from "_/app/Contexts/cartContext";
import { clearCartItems } from "_/app/cart/cart.actions";

export default function ClearAllCartBtn() {
    const { updateCartCount } = useContext(CartContext);

    async function handleClearAllCart() {
        const res = await clearCartItems();

        if (res.message === "success") {
            updateCartCount(0); 
        }
    }


    return (
        <>
            <Button
                onClick={handleClearAllCart}
                variant="destructive"
                className="cursor-pointer w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition"
            >
                Clear Cart
            </Button>
        </>
    )
}
