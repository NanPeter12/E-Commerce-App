import img1 from "_/assets/images/slider-image-1.jpeg"
import img2 from "_/assets/images/slider-image-2.jpeg"
import img3 from "_/assets/images/slider-image-3.jpeg"
import blog1 from "_/assets/images/blog-img-1.jpeg"
import blog2 from "_/assets/images/blog-img-2.jpeg"
import Image from "next/image";
import MySwiper from "../MySwiper/MySwiper"

export default function HomeSwiper() {
    return (
        <div className="p-5 sm:p-4 md:p-10 lg:p-16 flex flex-col md:flex-row gap-4 items-stretch my-3 w-full mx-auto">
            {/* Main Swiper */}
            <div className="w-full md:w-3/4 h-[250px] md:h-[500px]">
                <MySwiper imagesList={[img1.src, img2.src, img3.src]} />
            </div>

            {/* Side Images */}
            <div className="flex flex-row md:flex-col gap-4 w-full md:w-1/4">
                <div className="relative w-1/2 md:w-full h-[120px] md:h-1/2">
                    <Image
                        src={blog1.src}
                        alt="Side Image 1"
                        fill
                        className="object-cover rounded-lg w-full"
                    />
                </div>

                <div className="relative w-1/2 md:w-full h-[120px] md:h-1/2">
                    <Image
                        src={blog2.src}
                        alt="Side Image 2"
                        fill
                        className="object-cover rounded-lg w-full"
                    />
                </div>
            </div>
        </div>
    )
}
