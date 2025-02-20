import { ApiResponse } from "@/helpers/ApiResponse";
import { IBrand } from "@/models/brands.models";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../../../../constants";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import mongoose from "mongoose";

const Brands = () => {


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [brands, setBrands] = useState<IBrand[]>([]);
    
    // API data fetch
    useEffect(() => {
      const fetchProducts = async () => {
        setIsSubmitting(true);
        try {
          const allProducts = await axios.get<ApiResponse>(`${API_BASE_URL}/get-brands`);
          const productData = allProducts.data.data as IBrand[];
          console.log(productData, "pdddddd"); // This will log the fetched data
          setBrands(productData);
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setIsSubmitting(false);
        }
      };
  
      fetchProducts();
    }, []);

    return (

        <section className="py-4">
            <div className="container">
                <h4>Our Top Brands</h4>
                <hr />
                <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-xl-5">
                    
                    {brands.map((brand,index)=>(
                            <div className="col" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <a href={brand.website}>
                                        <img src={brand.logo} className="img-fluid" alt={brand.name} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                   
                 
                </div>
            </div>
        </section>
        
    )
}
export default Brands
