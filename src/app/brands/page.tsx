import Image from "next/image";
import { getAllBrands } from "../_services/brands.services";
import { BrandType } from "_/app/_interfaces/products";
import Link from "next/link";

export default async function BrandsPage() {
  const allBrands: BrandType[] = await getAllBrands();

  return (
    <section className=" text-white px-6 py-12 bg-cyan-950">
      <h1 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
        Our <span className="text-green-400">Brands</span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {allBrands.map((brand) => (
          <Link
            href={`/brandsDetails/${brand._id}`}
            key={brand._id}
            className="group bg-neutral-900/80 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-300 cursor-pointer p-6 flex flex-col items-center hover:scale-105 hover:shadow-green-500/40"
          >
            {/* Image */}
            <div className="w-24 h-24 relative mb-4">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain rounded-xl transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Name */}
            <h2 className="text-base font-semibold text-center transition-colors duration-300 group-hover:text-green-400">
              {brand.name}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
