'use client'

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { ApiResponse } from '@/helpers/ApiResponse';
import { API_BASE_URL } from '../../../../constants';
import { IProduct } from '@/models/product.models';
import { useRouter } from 'next/navigation';

export default function Categories() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const [categoryCount, setCategoryCount] = useState<{ category: string; items: number }[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);

    const getImageUrlByCategory = (category: string): string => {
        // Find the first product that matches the category
        const product = products.find((product) => product.category.toLowerCase() === category.toLowerCase());
    
        // If found, return the image URL, otherwise return a default image
        return product ? product.images[0] : 'path/to/default-image.jpg'; // Replace with a default image URL if needed
      };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await axios.get<ApiResponse>(`${API_BASE_URL}/get-products`);
                const productData = allProducts.data.data as IProduct[];
                setProducts(productData);
    
                // Count products per category
                const categoryMap: { [key: string]: number } = {};
                productData.forEach((product: any) => {
                    const category = product.category;
                    if (categoryMap[category]) {
                        categoryMap[category] += 1;
                    } else {
                        categoryMap[category] = 1;
                    }
                });
    
                const categoryArray = Object.keys(categoryMap).map((category) => ({
                    category,
                    items: categoryMap[category],
                }));
    
                setCategoryCount(categoryArray);
    
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const router = useRouter();
    const handleCategoryClick = (category: string) => {
        router.push(`/shop/${category}`);
    };


    return (
        <section className="py-4">
            <div className="container">
                <div className="d-flex align-items-center">
                    <h5 className="text-uppercase mb-0">Browse Category</h5>
                    <a href="/shop" className="btn btn-light ms-auto rounded-0">View All<i className="bx bx-chevron-right"></i></a>
                </div>
                <hr />
                <div className="product-grid">
                    <Slider {...settings} className="browse-category">
                        {categoryCount.map((category,index)=>(
                             <div className="item cursor-pointer" onClick={()=>handleCategoryClick(category.category)} key={index}>
                             <div className="card rounded-0 product-card border">
                                 <div className="card-body">
                                 <img src={getImageUrlByCategory(category.category)} alt={`${category.category} product`} />

                                 </div>
                                 <div className="card-footer text-center">
                                     <h6 className="mb-1 text-uppercase">{category.category.charAt(0).toUpperCase() + category.category.slice(1)}</h6>
                                     <p className="mb-0 font-12 text-uppercase">{category.items} Products</p>
                                 </div>
                             </div>
                         </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}
