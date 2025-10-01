import Image from "next/image";
import { getSpecifiedBrand } from "_/app/_services/brands.services";
import { BrandType } from "../../_interfaces/products";

type Props = {

  params: any;
};

export default async function BrandDetails({ params }: Props) {

  const { _id } = params;

  const brand: BrandType | null = await getSpecifiedBrand(_id);

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <p className="text-xl font-semibold">Brand not found</p>
      </div>
    );
  }

  return (
    <section className="bg-cyan-950 text-white px-6 py-12 rounded-lg min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
        {brand.name} <span className="text-green-400">Brand</span>
      </h1>

      <div className="max-w-4xl mx-auto bg-neutral-900/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-green-500/20 transition-all duration-300 p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-44 h-44 relative flex-shrink-0">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain rounded-xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-3">{brand.name}</h2>
          <p className="text-neutral-400 text-sm mb-4">
            Slug: <span className="text-green-400 font-mono">{brand.slug}</span>
          </p>

          <p className="text-neutral-300 leading-relaxed">
            Welcome to <span className="font-semibold text-green-400">{brand.name}</span>!
            Explore high-quality products and enjoy the best shopping experience with us.
          </p>
        </div>
      </div>
    </section>
  );
}
