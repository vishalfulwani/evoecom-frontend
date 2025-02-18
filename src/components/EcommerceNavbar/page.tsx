'use client'
import { ApiResponse } from '@/helpers/ApiResponse';
import { IProduct } from '@/models/product.models';
import { IUser } from '@/models/user.models';
import { removeFromCart, selectCartItemCount } from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import { selectWishlistItemCount } from '@/redux/wishlistSlice';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APP_BASE_URL } from '../../../constants';

const Navbar = () => {

    const [selectedValue, setSelectedValue] = useState("All Categories");
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };

    const cart = useSelector((state: RootState) => state.cart.cart);
    const dispatch = useDispatch();

    const [discount, setDiscount] = useState<number>(0);
    const [code, setCode] = useState<string>("");
    const [codeMsg, setCodeMsg] = useState<string>("");

    const [subtotal, setSubtotal] = useState<number>(0);
    const [shipping, setShipping] = useState<number>(50); // Example flat rate for shipping
    const [taxes, setTaxes] = useState<number>(0);
    const [orderTotal, setOrderTotal] = useState<number>(0);

    const [check, setCheck] = useState(1)




    const [userId, setUserId] = useState<string>('');
    const [updateDetail, setUpdateDetail] = useState(0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    // session
    // const [userSession, setUserSession] = useState(false)
    const { data: session, status } = useSession();
    console.log(session?.platform)
    useEffect(() => {
        console.log(session)
    }, [session]);

    // apply coupon
    const applyCoupon = async () => {
        if (check == 1) {
            setCheck(2)
        }
        setCheck(1)
        try {
            console.log("userrrrr", userId)
            const response = await axios.post('/api/admin/apply-coupon', {
                code,
                userId
            })
            const disc = response.data.data?.discount
            setDiscount(disc)
            console.log("-----", disc)
            calculateTotal()
            const msg = response.data.message
            setCodeMsg(msg)
            setCode(code)
            calculateCartDetails()
        } catch (error) {
            console.error("Error applying coupon", error)
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            console.log(`${code} ${errorMessage}`)
            setDiscount(0)
            setCode("")
            setCodeMsg(errorMessage || "Invalid or expired coupon code")
            // setCodeMsg(`${code} ${errorMessage}` || "Invalid or expired coupon code")
        }
    }

    useEffect(() => {
        const cartDetails = localStorage.getItem("cartDetails");
        if (cartDetails) {
            const parsedCartDetails = JSON.parse(cartDetails);

            // Update states with parsed values
            setDiscount(parsedCartDetails.discount || 0);
            setCode(parsedCartDetails.code || "");
            setCodeMsg(parsedCartDetails.codeMsg || "");
            setTaxes(parsedCartDetails.taxes || "");
            setShipping(parsedCartDetails.shipping || "");
            setOrderTotal(parsedCartDetails.orderTotal || "");
            setSubtotal(parsedCartDetails.subtotal || "");
        }
    }, [check]);

    // calculate total amount to pay
    const calculateTotal = () => {
        const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.product.sellingPrice) * item.quantity, 0);
        const total = subtotal - (subtotal * discount / 100);
        return total.toFixed(2);
    };

    const [address, setAddress] = useState<{ street?: string; city?: string; state?: string; postalCode?: string }>({});
    // get user
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await axios.get<ApiResponse>('/api/get-users')
                const userData = allUsers.data.data as []
                setUsers(userData)

                const you = userData.filter((data: any) => {
                    return data?._id.toString() === userId
                })

            } catch (error) {
                console.error("Error fetching users:", error)
            }
        }
        fetchUsers()
        console.log(address, "00000")
    }, [userId, updateDetail])

    useEffect(() => {
        const id = session?.user?._id as string
        setUserId(id)
    }, [])


    // Dynamically load Razorpay script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);



    // Update the cart in local storage with these details


    const calculateCartDetails = () => {
        // Calculate subtotal
        const sub = cart.reduce((acc, item) => acc + parseFloat(item.product.sellingPrice) * item.quantity, 0);
        setSubtotal(sub);

        // Calculate taxes (assuming 10% of subtotal as tax for example)
        const tax = sub * 0.1;
        setTaxes(tax);

        // Calculate total after applying discount
        const total = sub + tax + shipping - (sub * discount / 100);
        setOrderTotal(total);

        // Save to localStorage
        const updatedCartDetails = {
            cart,
            subtotal: sub,
            shipping,
            taxes: tax,
            discount,
            orderTotal: total,
            code,
            codeMsg,
        };
        localStorage.setItem('cartDetails', JSON.stringify(updatedCartDetails));
    };

    const handleRemoveFromCart = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    useEffect(() => {
        calculateCartDetails()
    }, [cart])

    useEffect(() => {
        const savedCartDetails = localStorage.getItem('cartDetails');
        if (savedCartDetails) {
            const { subtotal, shipping, taxes, discount, orderTotal, couponCode, couponMsg } = JSON.parse(savedCartDetails);
            console.log("Cart Detaaaaails:", { subtotal, shipping, taxes, discount, orderTotal, couponCode, couponMsg });
        }
    }, []);


    const cartItemCount = useSelector(selectCartItemCount);
    const wishlistItemCount = useSelector(selectWishlistItemCount);





    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])

    // Api data fetch
    useEffect(() => {
        const fetchProducts = async () => {
            setIsSubmitting(true)
            try {
                const allProducts = await axios.get<ApiResponse>(`${APP_BASE_URL}/get-products`)
                const productData = allProducts.data.data as IProduct[]
                setProducts(productData)
            } catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                setIsSubmitting(false)
            }
        }

        fetchProducts()
    }, [])

    //     const [searchTerm, setSearchTerm] = useState('');


    // const filteredProducts = products.filter((product) => {
    //     const searchTermLower = searchTerm.toLowerCase();

    //     return (
    //       (product.productName && product.productName.toLowerCase().includes(searchTermLower)) ||
    //       (product.category && product.category.toLowerCase().includes(searchTermLower)) ||
    //       (product.subCategory && product.subCategory.toLowerCase().includes(searchTermLower))
    //     );
    //   }); 


    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showDropdown, setShowDropdown] = useState(false);

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setShowDropdown(event.target.value.length > 0); // Show dropdown when typing
    };

    // Filter products based on search term and category
    const filteredProducts = products.filter((product) => {
        const searchTermLower = searchTerm.toLowerCase();
        const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;

        return (
            categoryMatch &&
            (
                (product.productName && product.productName.toLowerCase().includes(searchTermLower)) ||
                (product.category && product.category.toLowerCase().includes(searchTermLower)) ||
                (product.subCategory && product.subCategory.toLowerCase().includes(searchTermLower))
            )
        );
    });

    useEffect(() => {
        if (searchTerm == "") {
            setShowDropdown(false)
        }
    }, [searchTerm])



    // ===========
    const [categoryCount, setCategoryCount] = useState<{ category: string; items: number }[]>([]);
    const [items, setItems] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await axios.get<ApiResponse>(`${APP_BASE_URL}/get-products`);
                const productData = allProducts.data.data as IProduct[];
                setItems(productData);

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
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value;
        setSelectedCategory(category);

        if (category !== "all") {
            router.push(`/shop/${category}`);
        } else {
            router.push("/shop");
        }
    };

    


    return (

        <div className="bg-theme bg-theme1">

            <b className="screen-overlay"></b>
            <div className="wrapper">
                <div className="discount-alert bg-dark-1 d-none d-lg-block">
                    <div className="alert alert-dismissible fade show shadow-none rounded-0 mb-0 border-bottom">
                        <div className="d-lg-flex align-items-center gap-2 justify-content-center">
                            <p className="mb-0 text-white">Get Up to <strong>40% OFF</strong> New-Season Styles</p>
                            <a href=";" className="bg-dark text-white px-1 font-13 cursor-pointer">Women</a>
                            <p className="mb-0 font-13 text-light-3">*Limited time only</p>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                <div className="header-wrapper bg-dark-1">
                    <div className="top-menu border-bottom">
                        <div className="container">
                            <nav className="navbar navbar-expand">
                                <div className="shiping-title text-uppercase font-13 text-white d-none d-sm-flex">Welcome to our Glamdiva store!</div>
                                <ul className="navbar-nav ms-auto d-none d-lg-flex">
                                    <li className="nav-item"> <a className="nav-link" href="/order-tracking">Track Order</a>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link" href="/about-us">About</a>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link" href="/shop-categories">Our Stores</a>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link" href="/blog">Blog</a>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link" href="/contact-us">Contact</a>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link" href=";">Help & FAQs</a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">USD</a>
                                        <ul className="dropdown-menu dropdown-menu-lg-end">
                                            <li><a className="dropdown-item" href="#">USD</a>
                                            </li>
                                            <li><a className="dropdown-item" href="#">EUR</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown">
                                            <div className="lang d-flex gap-1">
                                                <div><i className="flag-icon flag-icon-um"></i>
                                                </div>
                                                <div><span>ENG</span>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-lg-end">
                                            <a className="dropdown-item d-flex allign-items-center" href=";"> <i className="flag-icon flag-icon-de me-2"></i><span>German</span>
                                            </a> <a className="dropdown-item d-flex allign-items-center" href=";"><i
                                                className="flag-icon flag-icon-fr me-2"></i><span>French</span></a>
                                            <a className="dropdown-item d-flex allign-items-center" href=";"><i
                                                className="flag-icon flag-icon-um me-2"></i><span>English</span></a>
                                            <a className="dropdown-item d-flex allign-items-center" href=";"><i
                                                className="flag-icon flag-icon-in me-2"></i><span>Hindi</span></a>
                                            <a className="dropdown-item d-flex allign-items-center" href=";"><i
                                                className="flag-icon flag-icon-cn me-2"></i><span>Chinese</span></a>
                                            <a className="dropdown-item d-flex allign-items-center" href=";"><i
                                                className="flag-icon flag-icon-ae me-2"></i><span>Arabic</span></a>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="navbar-nav social-link ms-lg-2 ms-auto">
                                    <li className="nav-item"> <a className="nav-link" href=";"><i className='bx bxl-facebook'></i></a>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link" href=";"><i className='bx bxl-twitter'></i></a>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link" href=";"><i className='bx bxl-linkedin'></i></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="header-content pb-3 pb-md-0">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col col-md-auto">
                                    <div className="d-flex align-items-center">
                                        <div className="mobile-toggle-menu d-lg-none px-lg-2" data-trigger="#navbar_main"><i className='bx bx-menu'></i>
                                        </div>
                                        <div className="logo d-none d-lg-flex">
                                            <a href="/">
                                                <img src="/assets/images/logo-icon.png" className="logo-icon" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md order-4 order-md-2 d-flex justify-center">
                                    {/* <div className="input-group flex-nowrap px-xl-4">
                                        <input type="text" className="form-control w-100" placeholder="Search for Products" />
                                        <select className="form-select flex-shrink-0" value={selectedValue} onChange={handleChange} aria-label="Default select example" style={{ "width": "10.5rem;" }}>
                                            <option value="all">All Categories</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        <span className="input-group-text cursor-pointer"><i className='bx bx-search'></i></span>
                                    </div> */}
                                    <div>
                                        <div className="relative w-full max-w-lg">
                                            <div className="input-group flex-nowrap  relative">
                                                {/* Search Input */}
                                                <input
                                                    type="text"
                                                    className="form-control w-full px-4 py-2 border rounded-md"
                                                    placeholder="Search for Products"
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                    onFocus={() => setShowDropdown(true)}
                                                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay hiding to allow click
                                                />

                                                {/* Category Dropdown */}
                                                {/* <select
                                                    className="form-select flex-shrink-0 border rounded-md px-2 py-1 ml-2"
                                                    value={selectedCategory}
                                                    onChange={handleCategoryChange}
                                                    aria-label="Default select example"
                                                    style={{ width: "10.5rem" }}
                                                >
                                                    <option value="all">All Categories</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select> */}

                                                <select
                                                    className="form-select flex-shrink-0 border rounded-md px-2 py-1 ml-2"
                                                    value={selectedCategory}
                                                    onChange={handleCategoryChange}
                                                    aria-label="Category select"
                                                    style={{ width: "10.5rem" }}
                                                >
                                                    <option value="all">All Categories</option>
                                                    {categoryCount.map(({ category, items }) => (
                                                        <option key={category} value={category} >
                                                            {category} ({items})
                                                        </option>
                                                    ))}
                                                </select>


                                                {/* Search Button */}
                                                <span className="input-group-text cursor-pointer p-2">
                                                    <i className="bx bx-search"></i>
                                                </span>
                                            </div>

                                            {/* Search Dropdown Results */}
                                            {showDropdown && filteredProducts.length > 0 && (
                                                <div className="absolute top-full px-xl-4  ps-0 left-0 w-full z-10 bg-[#446b89] shadow-lg rounded-md mt-1 border">
                                                    <ul className="max-h-60 overflow-y-auto p-0">
                                                        {filteredProducts.map((product, index) => (
                                                            <li className="p-2  hover:bg-[#446b80] cursor-pointer" key={index}>

                                                                <Link href={`/shop/${product.productName}`} key={product.id} >
                                                                    {product.productName}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* No Results */}
                                            {showDropdown && filteredProducts.length === 0 && (
                                                <div className="absolute top-full px-xl-4 left-0 w-full bg-[#446b89] shadow-lg rounded-md mt-1 border p-2 text-gray-500">
                                                    No products found.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                                <div className="col col-md-auto order-3 d-none d-xl-flex align-items-center">
                                    <div className="fs-1 text-white"><i className='bx bx-headphone'></i>
                                    </div>
                                    <div className="ms-2">
                                        <p className="mb-0 font-13">CALL US NOW</p>
                                        <h5 className="mb-0">+011 5827918</h5>
                                    </div>
                                </div>
                                <div className="col col-md-auto order-2 order-md-4">
                                    <div className="top-cart-icons">
                                        <nav className="navbar navbar-expand">
                                            <ul className="navbar-nav ms-auto">
                                                <li className="nav-item">
                                                {session && (
                                                    <a href="/dashboard" className="nav-link cart-link"><i className='bx bx-user'></i></a>
                                                )}
                                                </li>
                                                <li className="nav-item">
                                                    <a href="/wishlist" className="nav-link cart-link position-relative">
                                                        <span className="alert-count">{wishlistItemCount}</span>
                                                        <i className='bx bx-heart'></i>
                                                    </a>
                                                </li>
                                                <li className="nav-item dropdown dropdown-large">
                                                    <a href="#" className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative cart-link" data-bs-toggle="dropdown">
                                                        <span className="alert-count">{cartItemCount}</span>
                                                        <i className='bx bx-shopping-bag'></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a href="/cart">
                                                            <div className="cart-header">
                                                                <p className="cart-header-title mb-0">{cartItemCount} ITEMS</p>
                                                                <p className="cart-header-clear ms-auto mb-0">VIEW CART</p>
                                                            </div>
                                                        </a>
                                                        <div className="cart-list">

                                                            {cart.map((item, index) => (
                                                                <a className="dropdown-item" href="/cart" key={item?.product?._id}>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="flex-grow-1">
                                                                            <h6 className="cart-product-title">{item?.product?.productName}</h6>
                                                                            <p className="cart-product-price">{item.quantity} X ${item.product.sellingPrice}</p>
                                                                        </div>
                                                                        <div className="position-relative">
                                                                            <div className="cart-product-cancel position-absolute" onClick={() => handleRemoveFromCart(item?.product?._id)}><i className='bx bx-x'></i>
                                                                            </div>
                                                                            <div className="cart-product">
                                                                                <img src={item?.product?.images[0]} className="" alt="product image" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            ))}

                                                        </div>
                                                        <a href=";">
                                                            <div className="text-center cart-footer d-flex align-items-center">
                                                                <h5 className="mb-0">TOTAL</h5>
                                                                <h5 className="mb-0 ms-auto">${orderTotal}</h5>
                                                            </div>
                                                        </a>
                                                        <div className="d-grid p-3 border-top"> <a href="/checkout-details" className="btn btn-light btn-ecomm">CHECKOUT</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="primary-menu border-top">
                        <div className="container">
                            <nav id="navbar_main" className="mobile-offcanvas navbar navbar-expand-lg">
                                <div className="offcanvas-header">
                                    <button className="btn-close float-end"></button>
                                    <h5 className="py-2 text-white">Navigation</h5>
                                </div>
                                <ul className="navbar-nav">
                                    <li className="nav-item active"> <a className="nav-link" href="/">Home </a>
                                    </li>
                                    <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown">Categories <i className='bx bx-chevron-down'></i></a>
                                        <div className="dropdown-menu dropdown-large-menu">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <h6 className="large-menu-title">Fashion</h6>
                                                    <ul className="">
                                                        <li><a href="#">Casual T-Shirts</a>
                                                        </li>
                                                        <li><a href="#">Formal Shirts</a>
                                                        </li>
                                                        <li><a href="#">Jackets</a>
                                                        </li>
                                                        <li><a href="#">Jeans</a>
                                                        </li>
                                                        <li><a href="#">Dresses</a>
                                                        </li>
                                                        <li><a href="#">Sneakers</a>
                                                        </li>
                                                        <li><a href="#">Belts</a>
                                                        </li>
                                                        <li><a href="#">Sports Shoes</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-4">
                                                    <h6 className="large-menu-title">Electronics</h6>
                                                    <ul className="">
                                                        <li><a href="#">Mobiles</a>
                                                        </li>
                                                        <li><a href="#">Laptops</a>
                                                        </li>
                                                        <li><a href="#">Macbook</a>
                                                        </li>
                                                        <li><a href="#">Televisions</a>
                                                        </li>
                                                        <li><a href="#">Lighting</a>
                                                        </li>
                                                        <li><a href="#">Smart Watch</a>
                                                        </li>
                                                        <li><a href="#">Galaxy Phones</a>
                                                        </li>
                                                        <li><a href="#">PC Monitors</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="pramotion-banner1">
                                                        <img src="/assets/images/gallery/menu-img.jpg" className="img-fluid" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown">Shop  <i className='bx bx-chevron-down'></i></a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="/shop">Shop</a>
                                            </li>
                                            <li><a className="dropdown-item dropdown-toggle dropdown-toggle-nocaret" href="#">Shop Pages <i className='bx bx-chevron-right float-end'></i></a>
                                                <ul className="submenu dropdown-menu">
                                                    <li><a className="dropdown-item" href="/cart">Shop Cart</a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="/categories">Shop Categories</a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="/checkout-details">Checkout Details</a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="/checkout-shipping">Checkout Shipping</a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="/checkout-payment">Checkout Payment</a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="/checkout-review">Checkout Review</a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="/checkout-complete">Checkout Complete</a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="/order-tracking">Order Tracking</a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="/product-comparison">Product Comparison</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li><a className="dropdown-item" href="/about-us">About Us</a>
                                            </li>
                                            <li><a className="dropdown-item" href="/contact-us">Contact Us</a>
                                            </li>
                                            <li><a className="dropdown-item" href="/signin">Sign In</a>
                                            </li>
                                            <li><a className="dropdown-item" href="/signup">Sign Up</a>
                                            </li>
                                            <li><a className="dropdown-item" href="/forgot-password">Forgot Password</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link" href="/blog">Blog </a>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link" href="/about-us">About Us </a>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link" href="/contact-us">Contact Us </a>
                                    </li>
                                    <li className="nav-item"> <a className="nav-link" href="/categories">Our Store</a>
                                    </li>
                                    {session && (
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown">My Account  <i className='bx bx-chevron-down'></i></a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="/dashboard">Dashboard</a>
                                            </li>
                                            <li><a className="dropdown-item" href="/downloads">Downloads</a>
                                            </li>
                                            <li><a className="dropdown-item" href="/orders">Orders</a>
                                            </li>
                                            <li><a className="dropdown-item" href="/user-payment-methods">Payment Methods</a>
                                            </li>
                                            <li><a className="dropdown-item" href="/user-details">User Details</a>
                                            </li>
                                        </ul>
                                    </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div >


    )
}

export default Navbar;
