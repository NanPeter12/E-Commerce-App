import React from "react";
import MySwiper from "../MySwiper/MySwiper";
import { getAllCategories } from "../../_services/categories.service";

export default async function CategoriesSliderInHome() {

    const allCategories = await getAllCategories();

    if (!allCategories) return null;

    return (
        <div className="p-5 sm:p-4 md:p-10 lg:p-16 flex flex-col md:flex-row gap-4 items-stretch my-3 w-full mx-auto">
            <div className="w-full h-[250px] rounded-full">
                <MySwiper
                    withBreakpoints
                    slidesPerView={6} 
                    imagesList={allCategories.map((category) => category.image)}
                    spaceBetween={30}
                />
            </div>
        </div>
    );
}
