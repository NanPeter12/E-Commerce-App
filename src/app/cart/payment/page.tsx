"use client"

import { Input } from "_/components/ui/input"
import { Label } from "_/components/ui/label"
import { useContext, useState } from "react"
import { createCashOrder } from "./Cash Order.actions"
import { useSearchParams } from "next/navigation";
import { toast } from "sonner"
import { CartContext } from "_/app/Contexts/cartContext"
import { createOnlineOrder } from "./onlineOrders.actions"
import { useRouter } from "next/navigation";


export default function PaymentForm() {

    const router = useRouter();

    const { updateCartCount } = useContext(CartContext)

    const searchParams = useSearchParams();
    const cartId: string | null = searchParams.get("cartId");

    const [shippingAddress, setShippingAddress] = useState({
        details: "",
        phone: "",
        city: "",
    })

    if (!cartId) {
        return <p className="text-center mt-5 text-red-500 ">No cart found.</p>;
    }



    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value,
        })
    }


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    }

    async function handleCashOrder() {
        const cashOrderIsDone = await createCashOrder(cartId, shippingAddress);

        if (cashOrderIsDone) {
            toast.success("Order Created Successfully", {
                position: "top-center",
                duration: 2000
            });

            updateCartCount(0);
            setShippingAddress({ details: "", phone: "", city: "" });


            setTimeout(() => {
                router.push("/allorders");
            }, 2000);
        } else {
            toast.error("Error Occurred While Creating Order", {
                position: "top-center",
                duration: 3000
            });
        }
    }

    async function handleOnlineOrder() {
        const res = await createOnlineOrder(cartId, shippingAddress);

        if (res?.status === "success" && res?.session?.url) {

            toast.info("Redirecting to payment...", { position: "top-center", duration: 2000 });
            updateCartCount(0);
            window.location.href = res.session.url;

        } else {
            toast.error("Error Occurred While Creating Online Order", { position: "top-center", duration: 3000 });
        }
    }



    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 grid gap-4 bg-white rounded-xl shadow mt-5"
        >
            {/* Details */}
            <div className="grid gap-2">
                <Label htmlFor="details">Details</Label>
                <Input
                    id="details"
                    name="details"
                    value={shippingAddress.details}
                    onChange={handleChange}
                    placeholder="Enter details"
                />
            </div>

            {/* Phone */}
            <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                    placeholder="01010800921"
                />
            </div>

            {/* City */}
            <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    placeholder="Cairo"
                />
            </div>

            <button
                type="button"
                onClick={() => handleCashOrder()}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
            >
                Cash on Delivery
            </button>

            <button
                type="button"
                onClick={() => handleOnlineOrder()}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
            >
                Pay Online
            </button>

        </form>
    )
}
