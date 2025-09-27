"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

export default function MySwiper({
  imagesList,
  slidesPerView = 1,
  spaceBetween = 10,
  withBreakpoints = false, 
}: {
  imagesList: string[];
  slidesPerView?: number;
  spaceBetween?: number;
  withBreakpoints?: boolean;
}) {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      loop
      className="w-full h-full"
      breakpoints={
        withBreakpoints
          ? {
              320: { slidesPerView: 2, spaceBetween: 10 }, 
              640: { slidesPerView: 3, spaceBetween: 15 }, 
              1024: { slidesPerView: 6, spaceBetween: 30 }, 
            }
          : {}
      }
    >
      {imagesList.map((src, index) => (
        <SwiperSlide key={index}>
          <Image
            src={src}
            alt="Product"
            fill
            className="object-cover rounded-lg w-full"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}





