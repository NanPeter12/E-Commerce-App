"use client";
import { CartContext } from "_/app/Contexts/cartContext";
import { useContext, useEffect, useState } from "react";

type Order = {
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid?: boolean;
  shippingAddress?: {
    city?: string;
    street?: string;
  };
};

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const { updateCartCount } = useContext(CartContext);
  useEffect(() => {
    updateCartCount(0);
  }, [updateCartCount]);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const totalPages = Math.ceil(orders.length / limit);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="w-full">
      {/* Orders Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedOrders.map((order, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Order #{(currentPage - 1) * limit + idx + 1}
              </h3>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  order.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <span className="text-lg">💰</span>
                <span>
                  <span className="font-semibold">${order.totalOrderPrice}</span>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-lg">💳</span>
                <span>{order.paymentMethodType}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                <span>
                  {order.shippingAddress?.city || "-"},{" "}
                  {order.shippingAddress?.street || "-"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 font-medium hover:from-gray-300 hover:to-gray-400 disabled:opacity-50 transition-all"
        >
          Prev
        </button>
        <span className="px-4 py-2 font-semibold text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 font-medium hover:from-gray-300 hover:to-gray-400 disabled:opacity-50 transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
}
