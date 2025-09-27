"use client"
import { CartProvider } from "_/app/Contexts/cartContext"
import { WishlistProvider } from "_/app/Contexts/WhiclistContext"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export default function MySessionProvider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <CartProvider>
                <WishlistProvider>
                    {children}
                </WishlistProvider>
            </CartProvider>
        </SessionProvider>
    )
}