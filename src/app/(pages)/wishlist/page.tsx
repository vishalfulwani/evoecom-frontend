'use client'

import WishlistCard from "@/components/WishlistCard/page";
import { ApiResponse } from "@/helpers/ApiResponse";
import { IProduct } from "@/models/product.models";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APP_BASE_URL } from "../../../../constants";


const Page = ()=>{
    const dispatch = useDispatch();
    const wishlist = useSelector((state: RootState) => state.wishlist.items); // Get wishlist from Redux
    const [wishlistProducts, setWishlistProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    console.log("Wishlist from Redux:", wishlist);
  
    // Fetch the wishlist products based on IDs
    useEffect(() => {
      const fetchWishlistProducts = async () => {
        // Skip fetching if wishlist is empty
        if (!wishlist || wishlist.length === 0) {
          console.log("Wishlist is empty.");
          return;
        }
        
        setIsLoading(true);
        console.log("Fetching products for wishlist:", wishlist);
  
        try {
          // const response = await axios.get<ApiResponse>('/api/get-products');
          const response = await axios.get<ApiResponse>(`${APP_BASE_URL}/get-products`);
          const allProducts = response.data.data as IProduct[];
          console.log("Fetched all products:", allProducts);
  
          // Filter products that are in the wishlist
          const filteredProducts = allProducts.filter((product) =>
            wishlist.includes(product._id.toString())
          );
          console.log("Filtered wishlist products:", filteredProducts);
  
          setWishlistProducts(filteredProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchWishlistProducts();
    }, [wishlist]);

    return(
        <div className="page-wrapper1">
        <div className="page-content">
            <section className="py-3 border-bottom d-none d-md-flex">
                <div className="container">
                    <div className="page-breadcrumb d-flex align-items-center">
                        <h3 className="breadcrumb-title pe-3">Wishlist Grid</h3>
                        <div className="ms-auto">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item"><a href="/"><i className="bx bx-home-alt"></i> Home</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Wishlist</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-4">
                <div className="container">
                    <div className="product-grid">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
                        {wishlistProducts?.map((product, index) => (
                            <div className="col" key={product._id.toString()}>
                                <WishlistCard product={product} />
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    )
}
export default Page
