import { ProductType } from "./_interfaces/products";
import { getAllProducts } from "./_services/products.services";
import HomeSwiper from "./_Components/HomeSwiper/HomeSwiper";
import { lazy, Suspense } from "react";
import ProductsList from "./_Components/ProductsList/ProductsList";

const CategoriesSliderInHomeAsLazyComponent = lazy(() =>
  import("./_Components/CategoriesSliderInHome/CategoriesSliderInHome")
);

export default async function Home() {
  const allProducts: ProductType[] = await getAllProducts();

  return (
    <div>
      <HomeSwiper />

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-32">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        }
      >
        <CategoriesSliderInHomeAsLazyComponent />
      </Suspense>

      <ProductsList products={allProducts} />
    </div>
  );
}
