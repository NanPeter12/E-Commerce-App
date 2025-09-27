type AddToWishlistBtnProps = {
    productId: string;
};


import React from 'react'
import HeartWishlistBtn from '../../HeartWishlistBtn/HeartWishlistBtn'

export default function AddToWhichlistBtn({ productId }: AddToWishlistBtnProps) {
    return (
        <div>
            <HeartWishlistBtn productId={productId} />
        </div>
    )
}

