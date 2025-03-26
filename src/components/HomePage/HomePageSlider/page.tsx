'use client'
import { IBanner } from "@/models/banner.models";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../constants";
import axios from "axios";
import { ApiResponse } from "@/helpers/ApiResponse";


export default function HomePageBanner() {
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [isDeleting, setIsDeleting] = useState(false);
    const [banners, setBanners] = useState<IBanner[]>([]);
    console.log(isSubmitting)
  
    // API data fetch
    useEffect(() => {
      const fetchProducts = async () => {
        setIsSubmitting(true);
        try {
          const allProducts = await axios.get<ApiResponse>(`${API_BASE_URL}/get-banners`);
          const productData = allProducts.data.data as IBanner[];
          console.log(productData, "pdddddd"); // This will log the fetched data
          setBanners(productData);
        } catch (error) {
          console.error('Error fetching banners:', error);
        } finally {
          setIsSubmitting(false);
        }
      };
  
      fetchProducts();
    }, []);
    return(
        <section className="slider-section">
        <div className="first-slider">
            <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active"></li>
                    <li data-bs-target="#carouselExampleDark" data-bs-slide-to="1"></li>
                    <li data-bs-target="#carouselExampleDark" data-bs-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex align-items-center">
                            <div className="col d-none d-lg-flex justify-content-center">
                                <div className="">
                                    <h3 className="h3 fw-light">Has just arrived!</h3>
                                    <h1 className="h1">Huge Summer Collection</h1>
                                    <p className="pb-3">Swimwear, Tops, Shorts, Sunglasses &amp; much more...</p>
                                    <div className=""> <a className="btn btn-light btn-ecomm" href=";">Shop Now <i className='bx bx-chevron-right'></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <img src="assets/images/slider/04.png" className="img-fluid" alt="..."/>
                            </div>
                        </div>
                    </div>
                 
                    {
                        banners.map((banner)=>(
                            <div className="carousel-item" key={banner._id.toString()}>
                            <div className="row d-flex align-items-center">
                                <div className="col d-none d-lg-flex justify-content-center">
                                    <div className="">
                                        <h3 className="h3 fw-light">{banner.heading}</h3>
                                        <h1 className="h1">{banner.subheading}</h1>
                                        <p className="pb-3">{banner.subtext}</p>
                                        <div className=""> <a className="btn btn-dark btn-ecomm" href={banner.btnLink}>{banner.btnText} <i className='bx bx-chevron-right'></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <img src={banner.bgImg} className="img-fluid" alt="..."/>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                </div>
                <a className="carousel-control-prev" href="#carouselExampleDark" role="button" data-bs-slide="prev">	<span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleDark" role="button" data-bs-slide="next">	<span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </a>
            </div>
        </div>
    </section>
    
)}