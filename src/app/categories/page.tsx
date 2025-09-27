import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "../_services/categories.service";
import { CategoryType } from "../_interfaces/products";

export default async function CategoriesPage() {
    const allCategories: CategoryType[] | null = await getAllCategories();

    if (!allCategories || allCategories.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
                <p className="text-lg font-semibold">No categories found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cyan-950 text-white px-6 py-12">
            <h1 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
                Our <span className="text-green-400">Categories</span>
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {allCategories.map((category) => (
                    <Link
                        href={`/categories/${category._id}/subcategories`}
                        key={category._id}
                        className="group bg-neutral-900 rounded-2xl shadow-md transition-transform duration-300 cursor-pointer p-4 flex flex-col items-center hover:scale-105 hover:shadow-green-500/30"
                    >
                        <div className="w-20 h-20 relative mb-3">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-contain rounded-lg transition duration-300 group-hover:scale-110"
                            />
                        </div>
                        <h2 className="text-sm font-semibold text-center transition-colors duration-300 group-hover:text-green-400">
                            {category.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}
