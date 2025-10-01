import { getSubCategoriesByCategory } from "../../../_services/categories.service";
import { CategoryType } from "_/app/_interfaces/products";


type Props = {
    params: any;
};

export default async function CategoryDetailsPage({ params }: Props) {
    const { _id } =  params;
    
    const subcategories: CategoryType[] = await getSubCategoriesByCategory(_id);

    if (!subcategories || subcategories.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
                <p className="text-lg font-semibold">No subcategories found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-10 text-green-400">Subcategories</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {subcategories.map((sub) => (
                    <div
                        key={sub._id}
                        className="bg-neutral-900 rounded-2xl shadow-md hover:shadow-green-500/40 hover:scale-105 transition-transform duration-300 cursor-pointer p-4 flex flex-col items-center"
                    >
                        <div className="w-20 h-20 relative mb-3 flex items-center justify-center bg-neutral-800 rounded-lg">
                            <span className="text-xl font-bold text-green-400">
                                {sub.name.charAt(0)}
                            </span>
                        </div>
                        <h2 className="text-sm font-semibold text-center">{sub.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
