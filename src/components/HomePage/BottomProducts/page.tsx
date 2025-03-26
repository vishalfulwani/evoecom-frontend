'use client'
// import ProductCard from "@/components/ProductCard/page"
import { ApiResponse } from "@/helpers/ApiResponse"
import getRandomElements from "@/helpers/getRandomElements"
// import getRandomElements from "@/helpers/getRandomElements"
import { IProduct } from "@/models/product.models"
import axios from "axios"
import { useEffect, useState } from "react"
import { API_BASE_URL } from "../../../../constants"


export default function BottomProducts() {


    const [products, setProducts] = useState<IProduct[]>([])
    const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([])
    const [bestSellingProducts, setBestSellingProducts] = useState<IProduct[]>([])
    const [newProducts, setNewProducts] = useState<IProduct[]>([])
    const [topProducts, setTopProducts] = useState<IProduct[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await axios.get<ApiResponse>(`${API_BASE_URL}/get-products`)
                console.log("*************", allProducts)
                const productData = allProducts.data.data as []
                console.log(productData, "*************")
                setProducts(productData)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts()
    }, [])

    // Update featured products whenever products are fetched
    useEffect(() => {
        if (products.length > 0) {
            setFeaturedProducts(getRandomElements(products, 4));
            setTopProducts(getRandomElements(products, 4));
            setNewProducts(getRandomElements(products, 4));
            setBestSellingProducts(getRandomElements(products, 4));
        }
    }, [products]);


    return(

<section className="py-4 border-top">
<div className="container">
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
        <div className="col">
            <div className="bestseller-list mb-3">
                <h6 className="mb-3 text-uppercase">Best Selling Products</h6>
                <div>
                    {bestSellingProducts.map((product,index)=>(
                        <div key={index}>
                             <div className="d-flex align-items-center">
                    <div className="bottom-product-img">
                        <a href={`/product-details/${product._id}`}>
                            <img src={product.images[0]} width="100" alt=""/>
                        </a>
                    </div>
                    <div className="ms-1">
                        <h6 className=" fw-light mb-1">{product.productName}</h6>
                        <div className="rating font-12"> <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                        </div>
                        <p className="mb-0  text-white"><strong>$ {product.sellingPrice}</strong>
                        </p>
                    </div>
                </div>
                <hr/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="col">
            <div className="featured-list mb-3">
                <h6 className="mb-3 text-uppercase">Featured Products</h6>
                <div>
                    {featuredProducts.map((product,index)=>(
                        <div key={index}>
                             <div className="d-flex align-items-center">
                    <div className="bottom-product-img">
                        <a href={`/product-details/${product._id}`}>
                            <img src={product.images[0]} width="100" alt=""/>
                        </a>
                    </div>
                    <div className="ms-1">
                        <h6 className=" fw-light mb-1">{product.productName}</h6>
                        <div className="rating font-12"> <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                        </div>
                        <p className="mb-0 text-white"><strong>$ {product.sellingPrice}</strong>
                        </p>
                    </div>
                </div>
                <hr/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="col">
            <div className="new-arrivals-list mb-3">
                <h6 className="mb-3 text-uppercase">New arrivals</h6>
                <div>
                    {newProducts.map((product,index)=>(
                        <div key={index}>
                             <div className="d-flex align-items-center">
                    <div className="bottom-product-img">
                        <a href={`/product-details/${product._id}`}>
                            <img src={product.images[0]} width="100" alt=""/>
                        </a>
                    </div>
                    <div className="ms-1">
                        <h6 className=" fw-light mb-1">{product.productName}</h6>
                        <div className="rating font-12"> <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                        </div>
                        <p className="mb-0 text-white"><strong>$ {product.sellingPrice}</strong>
                        </p>
                    </div>
                </div>
                <hr/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="col">
            <div className="top-rated-products-list mb-3">
                <h6 className="mb-3 text-uppercase">Top rated Products</h6>
                <div>
                    {topProducts.map((product,index)=>(
                        <div key={index}>
                             <div className="d-flex align-items-center">
                    <div className="bottom-product-img">
                        <a href={`/product-details/${product._id}`}>
                            <img src={product.images[0]} width="100" alt=""/>
                        </a>
                    </div>
                    <div className="ms-1">
                        <h6 className=" fw-light mb-1">{product.productName}</h6>
                        <div className="rating font-12"> <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                            <i className="bx bxs-star text-white"></i>
                        </div>
                        <p className="mb-0 text-white"><strong>$ {product.sellingPrice}</strong>
                        </p>
                    </div>
                </div>
                <hr/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
</div>
</section>
    )}