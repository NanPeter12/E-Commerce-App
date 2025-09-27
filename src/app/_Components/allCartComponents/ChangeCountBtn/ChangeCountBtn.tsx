"use client"
import { Button } from "_/components/ui/button";
import React, { useContext } from "react";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { CartContext } from "_/app/Contexts/cartContext";
import { changeCount } from "_/app/cart/cart.actions";

export default function ChangeCountBtn({ isIncrement = false, productId, newCount }: { isIncrement?: boolean, productId: string, newCount: number }) {
  const { updateCartCount } = useContext(CartContext);

  async function handleChangeCount() {

    const count = await changeCount(productId, newCount);
    
    if (count.status === "success") {
      toast.success(`Product Count is ${newCount}`, { position: "top-center", duration: 3000 });
      updateCartCount(count.numOfCartItems);

    } else {
      toast.error(count.message, { position: "top-center", duration: 3000 });
    }
  }

  return (
    <Button
      disabled={newCount == 0}
      onClick={handleChangeCount}
      variant="ghost"
      size="icon"
      className={`w-8 h-8 rounded-full transition cursor-pointer
        ${isIncrement
          ? "bg-green-100 text-green-600 hover:bg-green-200"
          : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
        }`}
    >
      {isIncrement ? <Plus size={16} /> : <Minus size={16} />}
    </Button>
  );
}
