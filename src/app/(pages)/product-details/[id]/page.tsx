'use client'

import ProductCard from "@/components/ProductCard/page";
import AddReview from "@/components/ReviewCard/page";
import UserAvatar from "@/components/UserAvatar/page";
import WishlistBtn from "@/components/WishlistBtn/page";
import { ApiResponse } from "@/helpers/ApiResponse";
import getRandomElements from "@/helpers/getRandomElements";
import { IProduct } from "@/models/product.models";
import { addToCart, ICartItem } from "@/redux/cartSlice";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../../../constants";
import ProductImageCarousel from "@/components/ProductImageCrousal/page";


const Page = () => {

    const router = useRouter();
    const { id } = useParams();

    const [categories, setCategories] = useState<string[]>([]);
    const [sizesArray, setSizesArray] = useState<string[]>([]);
    const [colorsArray, setColorsArray] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [similarProducts, setSimilarProducts] = useState<IProduct[]>([])
    const [product, setProduct] = useState<IProduct[]>([])
    const [alsoLikeProducts, setAlsoLikeProducts] = useState<IProduct[]>([])

    const [imgUrl, setImgUrl] = useState<string>("")


    console.log(isSubmitting)
    console.log(imgUrl)
    console.log(alsoLikeProducts)
    


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

    // fetching data
    useEffect(() => {
        const fetchProducts = async () => {
            setIsSubmitting(true)
            try {
                // const allProducts = await axios.get<ApiResponse>('/api/get-products')
                const allProducts = await axios.get<ApiResponse>(`${API_BASE_URL}/get-products`)
                console.log("*************", allProducts)
                const productData = allProducts.data.data as []
                console.log(productData, "*************")
                setProducts(productData)
                // Collecting distinct categories
                const distinctCategories = Array.from(new Set(productData.map((product: any) => product?.category)));
                setCategories(distinctCategories);
            } catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                setIsSubmitting(false)
            }
        }
        fetchProducts()
    }, [])


    useEffect(() => {
        // Find the viewed product
        const viewProduct = products.filter((product) => product._id.toString() === id);
        setProduct(viewProduct);
        console.log("View Product:", viewProduct);

        if (viewProduct.length > 0) {
            // Set the first image URL if available
            setImgUrl(viewProduct[0]?.images?.[0] || "");

            // Process sizes and colors
            const sizes = viewProduct[0]?.sizes || "";
            const colors = viewProduct[0]?.availableColors || "";
            const sizesArray = sizes.split(",").map((size) => size.trim()); // Trim spaces
            const colorsArray = colors.split(",").map((color) => color.trim()); // Trim spaces
            setSizesArray(sizesArray);
            setColorsArray(colorsArray);

            // Find products with a similar category
            const similarCategoryProducts = products.filter(
                (product) => product.category === viewProduct[0]?.category && product._id.toString() !== viewProduct[0]._id.toString()
            );
            console.log("Similar Products:", similarCategoryProducts);

            // If there are more than 5 similar products, randomly select 5
            if (similarCategoryProducts.length > 5) {
                const productsRecommended = getRandomElements(similarCategoryProducts, 5);
                console.log("Recommended Products:", productsRecommended);
                setSimilarProducts(productsRecommended);
            } else {
                // Otherwise, set all similar products
                setSimilarProducts(similarCategoryProducts);
            }
        }
    }, [products]);

    console.log("-----", similarProducts)

    useEffect(() => {
        if (products.length > 0) {
            setAlsoLikeProducts(getRandomElements(products, 8));
        }
    }, [products]);


    // const goToProductPage = (category: string, id: string) => {
    //     router.push(`/shop/${category}/${id}`);
    // };



    return (
        <div className="page-wrapper1">
            <div className="page-content">
                <section className="py-3 border-bottom d-none d-md-flex">
                    <div className="container">
                        <div className="page-breadcrumb d-flex align-items-center">
                            <h3 className="breadcrumb-title pe-3">{product[0]?.fullProductName}</h3>
                            <div className="ms-auto">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0 p-0">
                                        <li className="breadcrumb-item"><a href="/"><i className="bx bx-home-alt"></i> Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/shop">Shop</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Product Details</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-4">
                    <div className="container">
                        <div className="product-detail-card">
                            <div className="product-detail-body">
                                <div className="row g-0">
                                    <div className="col-12 col-lg-5">
                                        {/* <div className="image-zoom-section">
                                            <div className="product-gallery owl-carousel owl-theme border mb-3 p-3 owl-loaded owl-drag" data-slider-id="1">

                                                <div className="owl-stage-outer">
                                                    <div className="owl-stage" style={{ "transform": "translate3d(-1032px, 0px, 0px)", "transition": "all", "width": "4128px" }}>
                                                        <div className="owl-item " style={{ "width": "506px", "marginRight": "10px" }}>
                                                            <div className="item">
                                                                <img src={product[0]?.images[0]} className="img-fluid" alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="owl-item " style={{ "width": "506px", "marginRight": "10px" }}>
                                                            <div className="item">
                                                                <img src={product[0]?.images[1]} className="img-fluid" alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="owl-item " style={{ "width": "506px", "marginRight": "10px" }}>
                                                            <div className="item">
                                                                <img src={product[0]?.images[2]} className="img-fluid" alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="owl-item" style={{ "width": "506px", "marginRight": "10px" }}>
                                                            <div className="item">
                                                                <img src={product[0]?.images[3]} className="img-fluid" alt="" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="owl-nav disabled">
                                                    <button type="button" role="presentation" className="owl-prev">
                                                        <span aria-label="Previous">‹</span>
                                                    </button>
                                                    <button type="button" role="presentation" className="owl-next">
                                                        <span aria-label="Next">›</span>
                                                    </button>
                                                </div>
                                                <div className="owl-dots disabled">
                                                </div>
                                            </div>

                                            <div className="owl-thumbs d-flex justify-content-center" data-slider-id="1">
                                                <button className="owl-thumb-item active">
                                                    <img src={product[0]?.images[0]} className="" alt="" />
                                                </button>
                                                <button className="owl-thumb-item">
                                                    <img src={product[0]?.images[1]} className="" alt="" />
                                                </button>
                                                <button className="owl-thumb-item">
                                                    <img src={product[0]?.images[2]} className="" alt="" />
                                                </button>
                                                <button className="owl-thumb-item">
                                                    <img src={product[0]?.images[3]} className="" alt="" />
                                                </button>
                                            </div>
                                        </div> */}
                                        <ProductImageCarousel images={product[0]?.images} />

                                    </div>
                                    <div className="col-12 col-lg-7">
                                        <div className="product-info-section p-3">
                                            <h3 className="mt-3 mt-lg-0 mb-0">{product[0]?.fullProductName}</h3>
                                            <div className="product-rating d-flex align-items-center mt-2">
                                                <div className="rates cursor-pointer font-13">	<i className="bx bxs-star text-warning"></i>
                                                    <i className="bx bxs-star text-warning"></i>
                                                    <i className="bx bxs-star text-warning"></i>
                                                    <i className="bx bxs-star text-warning"></i>
                                                    <i className="bx bxs-star text-light-4"></i>
                                                </div>
                                                <div className="ms-1">
                                                    <p className="mb-0">(24 Ratings)</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mt-3 gap-2">
                                                <h5 className="mb-0 text-decoration-line-through text-light-3">${product[0]?.price}</h5>
                                                <h4 className="mb-0">${product[0]?.sellingPrice}</h4>
                                            </div>
                                            <div className="mt-3">
                                                <h6>Discription :</h6>
                                                <p className="mb-0">{product[0]?.productDesc}</p>
                                            </div>
                                            <dl className="row mt-3">
                                                <dt className="col-sm-3">Product id</dt>
                                                <dd className="col-sm-9">{product[0]?._id.toString()}</dd>
                                                <dt className="col-sm-3">Delivery</dt>
                                                <dd className="col-sm-9">Russia, USA, and Europe</dd>
                                            </dl>
                                            <div className="row row-cols-auto align-items-center mt-3">
                                                {/* <div className="col">
                                                    <label className="form-label">Quantity</label>
                                                    <select className="form-select form-select-sm">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                </div> */}
                                                <div className="col">
                                                    <label className="form-label">Size</label>
                                                    <select className="form-select form-select-sm">
                                                        {sizesArray?.map((size, index) => (
                                                            <option key={index} value={size}>
                                                                {size.toUpperCase()}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Colors</label>
                                                    <div className="color-indigators d-flex align-items-center gap-2">
                                                        {colorsArray?.map((color, index) => (
                                                            <div
                                                                key={index}
                                                                className="color-indigator-item"
                                                                style={{ backgroundColor: color }}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex gap-2 mt-3">
                                                <div onClick={() => handleAddToCart(product[0])} className="btn btn-white btn-ecomm">
                                                    <i className="bx bxs-cart-add"></i>Add to Cart
                                                </div>
                                                <div className="btn btn-light btn-ecomm">
                                                    <WishlistBtn productId={product[0]?._id.toString()} /> Add to Wishlist
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="product-sharing">
                                                <ul className="list-inline">
                                                    <li className="list-inline-item"> <a href=";"><i className="bx bxl-facebook"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">	<a href=";"><i className="bx bxl-linkedin"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">	<a href=";"><i className="bx bxl-twitter"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">	<a href=";"><i className="bx bxl-instagram"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">	<a href=";"><i className="bx bxl-google"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-4">
                    <div className="container">
                        <div className="product-more-info">
                            <ul className="nav nav-tabs mb-0" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" data-bs-toggle="tab" href="#discription" role="tab" aria-selected="true">
                                        <div className="d-flex align-items-center">
                                            <div className="tab-title text-uppercase fw-500">Description</div>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" data-bs-toggle="tab" href="#more-info" role="tab" aria-selected="false">
                                        <div className="d-flex align-items-center">
                                            <div className="tab-title text-uppercase fw-500">More Info</div>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" data-bs-toggle="tab" href="#tags" role="tab" aria-selected="false">
                                        <div className="d-flex align-items-center">
                                            <div className="tab-title text-uppercase fw-500">Tags</div>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" data-bs-toggle="tab" href="#reviews" role="tab" aria-selected="false">
                                        <div className="d-flex align-items-center">
                                            <div className="tab-title text-uppercase fw-500">(3) Reviews</div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content pt-3">
                                <div className="tab-pane fade show active" id="discription" role="tabpanel">
                                    {/* <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi.</p>
                                    <ul>
                                        <li>Not just for commute</li>
                                        <li>Branded tongue and cuff</li>
                                        <li>Super fast and amazing</li>
                                        <li>Lorem sed do eiusmod tempor</li>
                                    </ul>
                                    <p className="mb-1">Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone.</p>
                                    <p className="mb-1">Seitan aliquip quis cardigan american apparel, butcher voluptate nisi.</p> */}
                                    <p>{product[0]?.productDesc}</p>
                                </div>
                                <div className="tab-pane fade" id="more-info" role="tabpanel">
                                    {/* <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p> */}
                                    <p>{product[0]?.moreProductInfo}</p>
                                </div>
                                <div className="tab-pane fade" id="tags" role="tabpanel">
                                    <div className="tags-box w-50">
                                        {categories.map((category, index) => (

                                            <a href={`shop/${category}`} className="tag-link" key={index}>{category}</a>

                                        ))}
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="reviews" role="tabpanel">
                                    <div className="row">
                                        <div className="col col-lg-8">
                                            <div className="product-review">
                                                <h5 className="mb-4"> Reviews For The Product</h5>
                                                <div className="review-list">

                                                    {product[0]?.reviews.map((review, index) => (
                                                        <div key={index}>
                                                            <div className="d-flex align-items-start">
                                                                <div className="review-user">
                                                                    {/* <img src="assets/images/avatars/avatar-1.png" width="65" height="65" className="rounded-circle" alt="" /> */}
                                                                    <UserAvatar name={review?.customerName} />
                                                                </div>
                                                                <div className="review-content w-full ms-3">
                                                                    <div className="rates cursor-pointer fs-6">
                                                                        {[1, 2, 3, 4, 5].map((star, index) => (
                                                                            <i
                                                                                key={index}
                                                                                className={`bx bxs-star ${star <= review?.rating ? 'text-white' : 'text-light-4'}`}
                                                                            ></i>
                                                                        ))}
                                                                    </div>

                                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                                        <h6 className="mb-0">{review?.customerName}</h6>
                                                                        <div className="mb-0 text-end">
                                                                            {new Date(review?.createdAt).toLocaleDateString('en-US', {
                                                                                year: 'numeric',
                                                                                month: 'long',
                                                                                day: 'numeric',
                                                                            })}
                                                                        </div>
                                                                    </div>



                                                                    <p>{review?.reviewText}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-lg-4">
                                            <AddReview productId={product[0]?._id.toString()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-4">
                    <div className="container">
                        <div className="d-flex align-items-center">
                            <h5 className="text-uppercase mb-0">Similar Products</h5>
                            <div className="d-flex align-items-center gap-0 ms-auto">	<a href=";" className="owl_prev_item fs-2"><i className="bx bx-chevron-left"></i></a>
                                <a href=";" className="owl_next_item fs-2"><i className="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                        <hr />
                        <div className="product-grid">

                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                                {similarProducts?.map((product) => (
                                    <div className="col" key={product._id.toString()}>
                                        <ProductCard product={product} />
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
