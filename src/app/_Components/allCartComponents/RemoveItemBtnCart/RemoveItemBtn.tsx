"use client"

import React, { useContext } from 'react'
import { toast } from 'sonner';
import { CartContext } from '_/app/Contexts/cartContext';
import { deleteSpecificItemFromTheCart } from '_/app/cart/cart.actions';


export default function RemoveItemBtn({ id }: { id: string }) {

    const { updateCartCount } = useContext(CartContext);

    async function handleRemoveItem() {
        const removedItem = await deleteSpecificItemFromTheCart(id);

        if (removedItem.status === "success") {
            toast.success(removedItem.message, { position: "top-center", duration: 3000 });
            updateCartCount(removedItem.numOfCartItems);

        } else {
            toast.error(removedItem.message, { position: "top-center", duration: 3000 });
        }

    }

    return (
        <>
            <button
                className="text-red-500 text-sm hover:underline cursor-pointer bg-amber-200 p-2 font-semibold rounded-2xl"
                onClick={handleRemoveItem}
            >
                Remove
            </button>
        </>
    )
}
