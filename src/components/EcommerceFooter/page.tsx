// import Image from 'next/image';

// const Footer = () => {
//   return (
//     <footer>
//       <section className="py-4 bg-dark-1">
//         <div className="container">
//           <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-4">
//             {/* Contact Info Section */}
//             <div className="col">
//               <div className="footer-section1 mb-3">
//                 <h6 className="mb-3 text-uppercase">Contact Info</h6>
//                 <div className="address mb-3">
//                   <p className="mb-0 text-uppercase text-white">Address</p>
//                   <p className="mb-0 font-12">123 Street Name, City, Australia</p>
//                 </div>
//                 <div className="phone mb-3">
//                   <p className="mb-0 text-uppercase text-white">Phone</p>
//                   <p className="mb-0 font-13">Toll Free (123) 472-796</p>
//                   <p className="mb-0 font-13">Mobile: +91-9910XXXX</p>
//                 </div>
//                 <div className="email mb-3">
//                   <p className="mb-0 text-uppercase text-white">Email</p>
//                   <p className="mb-0 font-13">mail@example.com</p>
//                 </div>
//                 <div className="working-days mb-3">
//                   <p className="mb-0 text-uppercase text-white">Working Days</p>
//                   <p className="mb-0 font-13">Mon - Fri / 9:30 AM - 6:30 PM</p>
//                 </div>
//               </div>
//             </div>

//             {/* Shop Categories Section */}
//             <div className="col">
//               <div className="footer-section2 mb-3">
//                 <h6 className="mb-3 text-uppercase">Shop Categories</h6>
//                 <ul className="list-unstyled">
//                   {["Jeans", "T-Shirts", "Sports", "Shirts & Tops", "Clogs & Mules", "Sunglasses", "Bags & Wallets", "Sneakers & Athletic", "Electronics", "Furniture"].map((category, index) => (
//                     <li key={index} className="mb-1">
//                       <a href=";">
//                         <i className='bx bx-chevron-right'></i> {category}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Popular Tags Section */}
//             <div className="col">
//               <div className="footer-section3 mb-3">
//                 <h6 className="mb-3 text-uppercase">Popular Tags</h6>
//                 <div className="tags-box">
//                   {["Cloths", "Electronics", "Furniture", "Sports", "Men Wear", "Women Wear", "Laptops", "Formal Shirts", "Topwear", "Headphones", "Bottom Wear", "Bags", "Sofa", "Shoes"].map((tag, index) => (
//                     <a key={index} href=";" className="tag-link">
//                       {tag}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Stay Informed Section */}
//             <div className="col">
//               <div className="footer-section4 mb-3">
//                 <h6 className="mb-3 text-uppercase">Stay Informed</h6>
//                 <div className="subscribe">
//                   <input type="text" className="form-control radius-30" placeholder="Enter Your Email" />
//                   <div className="mt-2 d-grid">
//                     <a href=";" className="btn btn-white btn-ecomm radius-30">
//                       Subscribe
//                     </a>
//                   </div>
//                   <p className="mt-2 mb-0 font-13">
//                     Subscribe to our newsletter to receive early discount offers, updates, and new product info.
//                   </p>
//                 </div>
//                 <div className="download-app mt-3">
//                   <h6 className="mb-3 text-uppercase">Download Our App</h6>
//                   <div className="d-flex align-items-center gap-2">
//                     <a href=";">
//                       <Image src="/assets/images/icons/apple-store.png" width={160} height={50} alt="Apple Store" />
//                     </a>
//                     <a href=";">
//                       <Image src="/assets/images/icons/play-store.png" width={160} height={50} alt="Google Play Store" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <hr />

//           <div className="row row-cols-1 row-cols-md-2 align-items-center">
//             <div className="col">
//               <p className="mb-0">Copyright © 2021. All rights reserved.</p>
//             </div>
//             <div className="col text-end">
//               <div className="payment-icon">
//                 <div className="row row-cols-auto g-2 justify-content-end">
//                   {[
//                     { src: "/assets/images/icons/visa.png", alt: "Visa" },
//                     { src: "/assets/images/icons/paypal.png", alt: "PayPal" },
//                     { src: "/assets/images/icons/mastercard.png", alt: "MasterCard" },
//                     { src: "/assets/images/icons/american-express.png", alt: "American Express" },
//                   ].map((icon, index) => (
//                     <div key={index} className="col">
//                       <Image src={icon.src} alt={icon.alt} width={50} height={30} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </footer>
//   );
// };

// export default Footer;



"use client"
import { ApiResponse } from '@/helpers/ApiResponse';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { APP_BASE_URL } from '../../../constants';
import { toast } from 'react-toastify';



const Footer = () => {

    const [categories, setCategories] = useState<string[]>([]);

    // fetching data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const allProducts = await axios.get<ApiResponse>('/api/get-products')
                const allProducts = await axios.get<ApiResponse>(`${APP_BASE_URL}/get-products`)
                console.log("*************", allProducts)
                const productData = allProducts.data.data as []
                console.log(productData, "*************")
                // Collecting distinct categories
                const distinctCategories = Array.from(new Set(productData.map((product: any) => product?.category)));
                setCategories(distinctCategories);
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts()
    }, [])

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post(`${APP_BASE_URL}/subscribe`, { email });
            setMessage(response.data.message || "Subscribed successfully!");
            toast.success("Subscribed successfully!")
        } catch (error: any) {
            setMessage(error.response?.data?.error || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer>
            <section className="py-4 bg-dark-1">
                <div className="container">
                    <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-4">
                        <div className="col">
                            <div className="footer-section1 mb-3">
                                <h6 className="mb-3 text-uppercase">Contact Info</h6>
                                <div className="address mb-3">
                                    <p className="mb-0 text-uppercase text-white">Address</p>
                                    <p className="mb-0 font-12">123 Street Name, City, Australia</p>
                                </div>
                                <div className="phone mb-3">
                                    <p className="mb-0 text-uppercase text-white">Phone</p>
                                    <p className="mb-0 font-13">Toll Free (123) 472-796</p>
                                    <p className="mb-0 font-13">Mobile : +91-9910XXXX</p>
                                </div>
                                <div className="email mb-3">
                                    <p className="mb-0 text-uppercase text-white">Email</p>
                                    <p className="mb-0 font-13">mail@example.com</p>
                                </div>
                                <div className="working-days mb-3">
                                    <p className="mb-0 text-uppercase text-white">WORKING DAYS</p>
                                    <p className="mb-0 font-13">Mon - FRI / 9:30 AM - 6:30 PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="footer-section2 mb-3">
                                <h6 className="mb-3 text-uppercase">Shop Categories</h6>
                                <ul className="list-unstyled">
                                    {categories.map((category, index) => (
                                        <li className="mb-1" key={index}>
                                            <a href={`shop/${category}`} className="tag-link" key={index}><i className='bx bx-chevron-right'></i>{category}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="footer-section3 mb-3">
                                <h6 className="mb-3 text-uppercase">Popular Tags</h6>
                                <div className="tags-box">
                                    {categories.map((category, index) => (
                                        <a href={`shop/${category}`} className="tag-link" key={index}>{category}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="footer-section4 mb-3">
                                <h6 className="mb-3 text-uppercase">Stay informed</h6>
                                <div className="subscribe">
                                    <form onSubmit={handleSubscribe}>
                                        <input type="text" className="form-control radius-30" placeholder="Enter Your Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <div className="mt-2 d-grid"> <button type='submit' className="btn btn-white btn-ecomm radius-30"
                                            disabled={loading}
                                        >
                                            {loading ? "Subscribing..." : "Subscribe"}
                                        </button>
                                        </div>
                                    </form>
                                    {message && (
                                        <p className="mt-2 mb-0 font-13" style={{ color: "white" }}>
                                            {message}
                                        </p>
                                    )}
                                    <p className="mt-2 mb-0 font-13">Subscribe to our newsletter to receive early discount offers, updates and new products info.</p>
                                </div>
                                <div className="download-app mt-3">
                                    <h6 className="mb-3 text-uppercase">Download our app</h6>
                                    <div className="d-flex align-items-center gap-2">
                                        <a href="javascript:;">
                                            <img src="/assets/images/icons/apple-store.png" className="" width="160" alt="" />
                                        </a>
                                        <a href="javascript:;">
                                            <img src="/assets/images/icons/play-store.png" className="" width="160" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row row-cols-1 row-cols-md-2 align-items-center">
                        <div className="col">
                            <p className="mb-0">Copyright © 2021. All right reserved.</p>
                        </div>
                        <div className="col text-end">
                            <div className="payment-icon">
                                <div className="row row-cols-auto g-2 justify-content-end">
                                    <div className="col">
                                        <img src="/assets/images/icons/visa.png" alt="" />
                                    </div>
                                    <div className="col">
                                        <img src="/assets/images/icons/paypal.png" alt="" />
                                    </div>
                                    <div className="col">
                                        <img src="/assets/images/icons/mastercard.png" alt="" />
                                    </div>
                                    <div className="col">
                                        <img src="/assets/images/icons/american-express.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
