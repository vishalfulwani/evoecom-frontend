
"use client"
import { ApiResponse } from '@/helpers/ApiResponse';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../constants';
import { toast } from 'react-toastify';



const Footer = () => {

    const [categories, setCategories] = useState<string[]>([]);

    // fetching data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const allProducts = await axios.get<ApiResponse>('/api/get-products')
                const allProducts = await axios.get<ApiResponse>(`${API_BASE_URL}/get-products`)
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
            const response = await axios.post(`${API_BASE_URL}/subscribe`, { email });
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
