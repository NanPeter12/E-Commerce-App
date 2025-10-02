
import { Input } from "_/components/ui/input";
import { CartResponse } from "../_interfaces/cart";
import { getUserCart } from "../_services/cart.services";
import Link from "next/link";
import ChangeCountBtn from "../_Components/allCartComponents/ChangeCountBtn/ChangeCountBtn";
import RemoveItemBtn from "../_Components/allCartComponents/RemoveItemBtnCart/RemoveItemBtn";
import ClearAllCartBtn from "../_Components/allCartComponents/ClearAllCartBtn/ClearAllCartBtn";


export default async function Page() {

  const cartData: CartResponse | null = await getUserCart();


  if (!cartData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading your cart...</p>
      </div>
    );
  }



  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 shadow-sm mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
            🛒 Your Shopping Cart
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review your items before checkout
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
            <span className="text-sm font-medium text-gray-600">Items</span>
            <span className="text-xl font-bold text-green-700">
              {cartData.numOfCartItems}
            </span>
          </div>

          {/* Clear Cart Button */}
          <ClearAllCartBtn />
        </div>
      </div>



      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cartData.data.products.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-4 items-center bg-white shadow rounded-xl p-4 hover:shadow-md transition"
          >
            {/* brand photo*/}
            <Link
              href={`/productDetails/${item.product.id}`}
              className="flex gap-4 items-center flex-1"
            >
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded-lg border"
              />

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-700">
                  {item.product.title}
                </h2>
                <p className="text-sm text-gray-500">Qty: {item.count}</p>
                <p className="text-green-600 font-semibold">{item.price} EGP</p>
              </div>
            </Link>

            {/* actions */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-between gap-2">

                <ChangeCountBtn isIncrement={true} productId={item.product.id} newCount={item.count + 1} />
                <ChangeCountBtn isIncrement={false} productId={item.product.id} newCount={item.count - 1} />
                <Input className="w-8 h-8 flex items-center justify-center" value={item.count}></Input>

              </div>


              < RemoveItemBtn id={item.product.id} />
            </div>
          </div>
        ))}
      </div>


      {/* Summary */}
      <div className="mt-6 bg-gray-100 rounded-xl p-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-gray-700">
          Total: {cartData.data.totalCartPrice} EGP
        </p>
        <Link
          href={`/cart/payment?cartId=${cartData.cartId}`}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer">
          Checkout
        </Link>
      </div>
    </div>
  );
}
