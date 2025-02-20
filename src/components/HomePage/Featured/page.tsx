'use client'

import ProductCard from "@/components/ProductCard/page"
import { ApiResponse } from "@/helpers/ApiResponse"
import getRandomElements from "@/helpers/getRandomElements"
// import getRandomElements from "@/helpers/getRandomElements"
import { IProduct } from "@/models/product.models"
import axios from "axios"
import { useEffect, useState } from "react"
import { API_BASE_URL } from "../../../../constants"

export default function Featured() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([])

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
            setFeaturedProducts(getRandomElements(products, 5));
        }
    }, [products]);

    return (

        <section className="py-4">
            <div className="container">
                <div className="d-flex align-items-center">
                    <h5 className="text-uppercase mb-0">FEATURED PRODUCTS</h5>
                    <a href="/shop" className="btn btn-light ms-auto rounded-0">More Products<i className='bx bx-chevron-right'></i></a>
                </div>
                <hr />
                <div className="product-grid">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                        {featuredProducts.map((product, index) => (
                            <div className="col" key={product._id.toString()}>
                                <ProductCard product={product} />
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </section>


    )
}