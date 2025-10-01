import { ProductType } from "./_interfaces/products";
import ProductCard from "./_Components/ProductCard/ProductCard";
import { getAllProducts } from "./_services/products.services";
import HomeSwiper from "./_Components/HomeSwiper/HomeSwiper";
import { lazy, Suspense } from "react";


const CategoriesSliderInHomeAsLazyComponent = lazy(() =>
  import("./_Components/CategoriesSliderInHome/CategoriesSliderInHome")
); 

export default async function Home() {

  const allProducts: ProductType[] = await getAllProducts();

  return (

    <div className="">

      <HomeSwiper />


      <Suspense fallback={
        <div className="flex justify-center items-center h-32">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin">

          </div>
        </div>}>
        <CategoriesSliderInHomeAsLazyComponent />
      </Suspense>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 sm:p-4 md:p-10 lg:p-16">
        {allProducts.map((product: ProductType) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

    </div>
  );

}
