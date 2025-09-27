"use client";
import React, { createContext, useState, useEffect } from "react";
import {
  addProductToWhichlist,
  deleteSpecificItemFromTheWhichlist,
} from "../whichlist/Whichlist.actions";
import { getWhichlistItems } from "../_services/whichlist.services";

export interface WishlistItem {
  id: string;
  title?: string;
  imageCover?: string;
  price?: number;
}

type WishlistContextType = {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  refetchWishlist: () => Promise<void>;
};

export const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  async function loadWishlist() {
    const res = await getWhichlistItems();
    if (res?.data) setWishlistItems(res.data);
  }

  useEffect(() => {
    loadWishlist();
  }, []);

  const addToWishlist = async (productId: string) => {
    const res = await addProductToWhichlist(productId);
    if (res?.status === "success") {
      setWishlistItems((prev) => [...prev, res.data]);
      await loadWishlist();
    }
  };

  const removeFromWishlist = async (productId: string) => {
    const res = await deleteSpecificItemFromTheWhichlist(productId);
    if (res?.status === "success") {
      setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
      await loadWishlist();
    }
  };

  const isInWishlist = (productId: string) =>
    wishlistItems.some((item) => item.id === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        refetchWishlist: loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
