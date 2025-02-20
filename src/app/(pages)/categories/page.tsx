'use client'

import Brands from "@/components/AboutPage/Brands/page";
import { ApiResponse } from "@/helpers/ApiResponse";
import { IProduct } from "@/models/product.models";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../constants";
import { useRouter } from "next/navigation";

const Page = ()=>{

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


    return(
        <div className="page-wrapper1">
        <div className="page-content">
            <section className="py-3 border-bottom d-none d-md-flex">
                <div className="container">
                    <div className="page-breadcrumb d-flex align-items-center">
                        <h3 className="breadcrumb-title pe-3">Shop Categories</h3>
                        <div className="ms-auto">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item"><a href="/"><i className="bx bx-home-alt"></i> Home</a>
                                    </li>
                                    <li className="breadcrumb-item"><a href="/shop">Shop</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Shop Categories</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-4">
                <div className="container">
                    <div className="product-categories">
                        <div className="row row-cols-1 row-cols-lg-4">
                        
                        {categoryCount.map((category,index)=>(
                              <div className="col" key={index}>
                              <div className="card rounded-0 product-card">
                                  <a href={`/shop/${category.category}`}>
                                      <img src={getImageUrlByCategory(category.category)} className="card-img-top border-bottom bg-dark-1" alt="..."/>
                                  </a>
                                  <div className="list-group list-group-flush">
                                      <a href={`/shop/${category.category}`} className="list-group-item bg-transparent">
                                          <h6 className="mb-0 text-uppercase">{category.category}</h6>
                                      </a>
                                  </div>
                              </div>
                          </div>
                        ))}
                          
                        </div>
                    </div>
                </div>
            </section>

            <Brands/>
           
        </div>
    </div>
    )
}
export default Page
