// import { getAllOrders } from "../_services/getAllOrders";
// import OrdersTable from "../_Components/OrdersTable/OrdersTable";
// import { getServerSession } from "next-auth";
// import { nextAuthConfig } from "_/next-auth/nextAuth.config";
// import { Link } from "lucide-react";

// export default async function AllOrdersPage() {

//   const session = await getServerSession(nextAuthConfig);

//   if (!session?.user?.id) {
//     return <p className="p-5 text-gray-500">You must be logged in to view orders.</p>;
//   }

//   const orders = await getAllOrders(session.user.id);

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h1 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
//           All <span className="text-green-400">Orders</span>
//         </h1>

//         {/* Orders Section */}
//         {orders && orders.length > 0 ? (
//           <OrdersTable orders={orders} />
//         ) : (
//           <div className="flex flex-col items-center justify-center py-20 px-6 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-lg border border-gray-100">
//             <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 mb-6">
//               <span className="text-5xl">📦</span>
//             </div>
//             <p className="text-gray-700 text-xl font-semibold">No Orders Yet</p>
//             <p className="text-gray-500 mt-2 text-center max-w-xs">
//               Looks like you haven’t placed any orders. Start shopping now and fill your box!
//             </p>
//             <Link href={"/"} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
//               Shop Now
//             </Link>
//           </div>

//         )}
//       </div>
//     </div>

//   );
// }

import { getAllOrders } from "../_services/getAllOrders";
import OrdersTable from "../_Components/OrdersTable/OrdersTable";
import Link from "next/link";
import { getAuthenticatedUserToken } from "../utils/getUserToken";
import { jwtDecode } from "jwt-decode";

export default async function AllOrdersPage() {
  const accessToken = await getAuthenticatedUserToken();

  if (!accessToken) {
    return <p className="p-5 text-gray-500">You must be logged in to view orders.</p>;
  }

  // فك التوكن عشان نجيب الـ userId (لو انت مخزن id فيه)
  type TokenPayload = { id: string; [key: string]: any };
  const payload = jwtDecode<TokenPayload>(accessToken);
  const userId = payload.id;

  if (!userId) {
    return <p className="p-5 text-gray-500">You must be logged in to view orders.</p>;
  }

  // جلب الطلبات
  const orders = (await getAllOrders(userId)) || [];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
          All <span className="text-green-400">Orders</span>
        </h1>

        {orders.length > 0 ? (
          <OrdersTable orders={orders} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-lg border border-gray-100">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 mb-6">
              <span className="text-5xl">📦</span>
            </div>
            <p className="text-gray-700 text-xl font-semibold">No Orders Yet</p>
            <p className="text-gray-500 mt-2 text-center max-w-xs">
              Looks like you haven’t placed any orders. Start shopping now and fill your box!
            </p>
            <Link
              href="/"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

