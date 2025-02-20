'use client'

import React from "react";
import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB
import { useRouter } from "next/navigation";
import { addToCart, ICartItem } from "@/redux/cartSlice";
import { useDispatch } from "react-redux"
import { toast } from "react-toastify";
// import WishlistBtn from "../WishlistBtn/page";
import Link from "next/link";

export interface IProduct {
    _id: ObjectId;
    productName: string;
    price: string;
    sellingPrice: string;
    rating: string;
    images: string[];
    category: string;
}

interface ProductCardProps {
    product: IProduct; // Use IProduct here
}

const WishlistCard: React.FC<ProductCardProps> = ({
    product,
}) => {


    
const router = useRouter()

const goToProductPage = (id: string) => {
    router.push(`/product-details/${id}`);
};
const dispatch = useDispatch();
const handleAddToCart = (product: any) => {
    const cartItem: ICartItem = {
        product,
        quantity: 1,
    };
    dispatch(addToCart(cartItem));
    toast.success("Product added to cart")
    router.replace('/cart')
};

    return (
            <div className="card rounded-0 product-card">
                <div className="card-header bg-transparent border-bottom-0">
                    <div className="d-flex align-items-center justify-content-end gap-3">
                        <div>
                            {/* <div className="product-compare"><span><i className='bx bx-git-compare'></i> Compare</span>
                            </div> */}
                        </div>
                        {/* <div>
                            <div className="product-wishlist"> <WishlistBtn productId={product._id.toString()}/>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div onClick={()=>goToProductPage(product._id.toString())}>
                    <img src={product.images[0]} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                    <div className="product-info">
                        <div>
                            <p className="product-catergory font-13 mb-1">{product.category}</p>
                        </div>
                        <div>
                            <h6 className="product-name mb-2">{product.productName}</h6>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="mb-1 product-price"> <span className="me-1 text-decoration-line-through">${product.price}</span>
                                <span className="text-white fs-5">${product.sellingPrice}</span>
                            </div>
                            <div className="cursor-pointer ms-auto"> <i className="bx bxs-star text-white"></i>
                                <i className="bx bxs-star text-white"></i>
                                <i className="bx bxs-star text-white"></i>
                                <i className="bx bxs-star text-light-4"></i>
                                <i className="bx bxs-star text-light-4"></i>
                            </div>
                        </div>
                        <div className="product-action mt-2">
                            <div className="d-grid gap-2">
                                <div onClick={()=>handleAddToCart(product)} className="btn btn-light btn-ecomm">
                                    <i className='bx bxs-cart-add'></i>Add to Cart
                                </div>
                                <div onClick={()=>goToProductPage(product._id.toString())} className="btn btn-link btn-ecomm" data-bs-toggle="modal" data-bs-target="#QuickViewProduct">
                                    <i className='bx bx-zoom-in'></i>Quick View
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default WishlistCard;
