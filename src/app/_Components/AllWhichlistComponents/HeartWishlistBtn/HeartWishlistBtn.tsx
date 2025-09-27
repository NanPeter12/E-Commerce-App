"use client";
import { useContext, useState } from "react";
import { WishlistContext } from "../../../Contexts/WhiclistContext";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function WishlistBtn({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const wishlistCtx = useContext(WishlistContext);
  const { data: session } = useSession();

  if (!wishlistCtx) return null;

  const { addToWishlist, removeFromWishlist, isInWishlist } = wishlistCtx;

  const inWishlist = isInWishlist(productId);

  async function toggle() {
    if (loading) return;

    if (!session) {
      toast.error("You must be logged in to add to wishlist!", {
        position: "top-center",
      });
      return;
    }

    setLoading(true);

    try {
      if (inWishlist) {
        await removeFromWishlist(productId);
        toast.success("Removed from wishlist ❤️", { position: "top-center" });
      } else {
        await addToWishlist(productId);
        toast.success("Added to wishlist ❤️", { position: "top-center" });
      }
    } catch {
      toast.error("Something went wrong!", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="p-2 rounded-full transition-colors cursor-pointer"
    >
      <FaHeart
        className={`w-8 h-8 mt-3 transition-colors ${inWishlist ? "text-red-600" : "text-gray-400 hover:text-red-500"
          }`}
      />
    </button>
  );
}
