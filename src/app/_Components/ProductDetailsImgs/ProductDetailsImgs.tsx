"use client";
import Image from "next/image";
import React, { useState } from "react";

type GalleryProps = {
    mainImage: string;
    images: string[];
};

export default function ProductDetailsImgs({ mainImage, images }: GalleryProps) {

    const [selectedImage, setSelectedImage] = useState(mainImage);

    return (
        <div>
            <div className="relative w-full max-w-md mx-auto border rounded-lg overflow-hidden">
                <Image
                    src={selectedImage}
                    alt="Main Product"
                    width={500}
                    height={500}
                    className="object-contain w-full h-auto"
                />
            </div>


            <div className="flex flex-wrap justify-center gap-3 mt-4">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className={`relative w-20 h-20 rounded overflow-hidden border-2 cursor-pointer
        ${selectedImage === img ? "border-blue-500" : "border-gray-300"}`}
                        onClick={() => setSelectedImage(img)}
                    >
                        <Image
                            src={img}
                            alt="Thumbnail"
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
