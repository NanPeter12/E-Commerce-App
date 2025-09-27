"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "_/assets/images/freshcart-logo.svg";
import { useSession, signOut } from "next-auth/react";
import { getUserCart } from "_/app/_services/cart.services";
import { CartContext } from "_/app/Contexts/cartContext";
import { FaBookmark } from "react-icons/fa";

type Links = {
  linkPath: string;
  linkName: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { updateCartCount, cartCount } = useContext(CartContext);

  const session = useSession();



  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getUserCart();
        updateCartCount(res?.numOfCartItems || 0);
      } catch (error) {
        updateCartCount(0);
      }
    };

    if (session.status === "authenticated") {
      fetchCart();
    } else if (session.status === "unauthenticated") {
      updateCartCount(0);
    }
  }, [session.status]);



  if (session.status === "loading") {
    return null;
  }

  function handleActive(linkPath: string) {
    return pathname === linkPath
      ? "text-green-600 font-semibold"
      : "text-gray-700";
  }

  // Links according to authentication status
  const authLinks: Links[] = [
    { linkPath: "/", linkName: "Home" },
    { linkPath: "/brands", linkName: "Brands" },
    { linkPath: "/categories", linkName: "Categories" },
    { linkPath: "/cart", linkName: "Cart" },
    { linkPath: "/allorders", linkName: "Orders" },
    { linkPath: "/whichlist", linkName: "Whichlist" },


  ];

  const guestLinks: Links[] = [
    { linkPath: "/", linkName: "Home" },
    { linkPath: "/brands", linkName: "Brands" },
    { linkPath: "/categories", linkName: "Categories" },
    { linkPath: "/register", linkName: "Register" },
    { linkPath: "/login", linkName: "Login" },
  ];

  const currentLinks =
    session.status === "authenticated" ? authLinks : guestLinks;

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            className="w-[120px] h-auto"
            priority
          />
        </Link>

        {/* Hamburger Icon - small screens */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </div>

        {/* Right Part for large screens */}
        <div className="hidden md:block">
          <ul className="flex gap-6 items-center">
            {currentLinks.map((link) => (
              <li key={link.linkPath}>
                <Link
                  className={`flex items-center gap-2 text-lg hover:text-green-600 transition-colors ${handleActive(
                    link.linkPath
                  )}`}
                  href={link.linkPath}
                >
                  {link.linkName}

                  {link.linkPath === "/cart" && cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {cartCount}
                    </span>
                  )}
                  {link.linkPath === "/whichlist" && (
                    <span className="flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full p-1">
                      <FaBookmark className="w-3 h-3" />
                    </span>
                  )}
                </Link>
              </li>
            ))}

            {session.status === "authenticated" && (
              <li
                className="text-lg text-gray-700 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Dropdown Menu - small screens */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4">
          <ul className="flex flex-col gap-4">
            {currentLinks.map((link) => (
              <li key={link.linkPath}>
                <Link
                  className={`text-base hover:text-green-600 transition-colors ${handleActive(
                    link.linkPath
                  )}`}
                  href={link.linkPath}
                  onClick={() => setIsOpen(false)}
                >
                  {link.linkName}

                  {link.linkPath === "/cart" && cartCount > 0 && (
                    <span className="ms-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {cartCount}
                    </span>
                  )}
                  {link.linkPath === "/whichlist" && (
                    <span className="inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 ms-2">
                      <FaBookmark className="w-3 h-3" />
                    </span>
                  )}

                </Link>
              </li>
            ))}

            {session.status === "authenticated" && (
              <li
                className="text-base text-gray-700 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
