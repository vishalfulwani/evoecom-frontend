'use client'

import WishlistBtn from "@/components/WishlistBtn/page";
import { ApiResponse } from "@/helpers/ApiResponse";
import { clearCart, removeFromCart, updateColor, updateQuantity, updateSize } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../../../constants";

const Page = () => {

    const [selectedValue, setSelectedValue] = useState("All Categories");
    const [selectedValue2, setSelectedValue2] = useState("All Categories");
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };
    const handleChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue2(event.target.value);
    };

    const cart = useSelector((state: RootState) => state.cart.cart);

    const dispatch = useDispatch();

    const handleSizeChange = (selectedSize: string, productId: string) => {
        dispatch(updateSize({ productId, selectedSize }));
    };

    const handleColorChange = (selectedColor: string, productId: string) => {
        dispatch(updateColor({ productId, selectedColor }));
    };


    const [discount, setDiscount] = useState<number>(() => {
        const cartDetails = localStorage.getItem('cartDetails');
        if (cartDetails) {
            const parsedCartDetails = JSON.parse(cartDetails);
            return parsedCartDetails.discount ? parsedCartDetails.discount : 0;
        }
    });
    const [code, setCode] = useState(() => {
        const cartDetails = localStorage.getItem('cartDetails');
        if (cartDetails) {
            const parsedCode = JSON.parse(cartDetails);
            return parsedCode.code ? parsedCode.code : '';
        }
    });
    const [codeMsg, setCodeMsg] = useState(() => {
        const cartDetails = localStorage.getItem('cartDetails');
        if (cartDetails) {
            const parsedCodeMsg = JSON.parse(cartDetails);
            return parsedCodeMsg.codeMsg ? parsedCodeMsg.codeMsg : '';
        }
    });

    const [userId, setUserId] = useState<string>('');
    const [updateDetail, setUpdateDetail] = useState(0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleRemoveFromCart = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        dispatch(updateQuantity({ productId, quantity: newQuantity }));
    };


    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // session
    // const [userSession, setUserSession] = useState(false)
    const { data: session } = useSession();
    console.log(session?.platform)
    useEffect(() => {
        console.log(session)
    }, [session]);

    // apply coupon
    const applyCoupon = async () => {
        try {
            console.log("userrrrr", userId)
            // const response = await axios.post('/api/admin/apply-coupon', {
            const response = await axios.post(`${API_BASE_URL}/admin/apply-coupon`, {
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
        } catch (error) {
            console.error("Error applying coupon", error)
            const axiosError = error as AxiosError<ApiResponse>
            const errorMessage = axiosError.response?.data.message
            console.log(`${code} ${errorMessage}`)
            setDiscount(0)
            setCode("")
            setCodeMsg(errorMessage || "Invalid or expired coupon code")
            // setCodeMsg(`${code} ${errorMessage}` || "Invalid or expired coupon code")
        }
    }

    // calculate total amount to pay
    const calculateTotal = () => {
        const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.product.sellingPrice) * item.quantity, 0);
        const total = subtotal - (subtotal * discount / 100);
        return total.toFixed(2);
    };

    // buy ===================================================================

    // check user logged or not
    // const { data: session } = useSession()
    const router = useRouter()

    // const [address, setAddress] = useState<{ street?: string; city?: string; state?: string; postalCode?: string }>({});
    // get user

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             // const allUsers = await axios.get<ApiResponse>('/api/get-users')
    //             const allUsers = await axios.get<ApiResponse>(`${API_BASE_URL}/get-users`)
    //             const userData = allUsers.data.data as []

    //             const you = userData.filter((data: any) => {
    //                 return data?._id.toString() === userId
    //             })
    //             console.log(you)

    //         } catch (error) {
    //             console.error("Error fetching users:", error)
    //         }
    //     }
    //     fetchUsers()
    //     // console.log(address, "00000")
    // }, [userId, updateDetail])


    const handleBuyClick = () => {
        if (!session) {
            router.push('/signin');
        }
        else if (session.platform != 'ecommerce') {
            router.push('/signin');
        } else {
            // setIsPopoverOpen(true);
            setUpdateDetail(updateDetail + 1)
            router.push('/checkout-details');
        }
    };

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


    const [subtotal, setSubtotal] = useState<number>(0);
    const shipping = 50; // Example flat rate for shipping
    const [taxes, setTaxes] = useState<number>(0);
    const [orderTotal, setOrderTotal] = useState<number>(0);

    // Update the cart in local storage with these details
    useEffect(() => {
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

        calculateCartDetails();
    }, [cart, discount, shipping, code, codeMsg]);

    useEffect(() => {
        const savedCartDetails = localStorage.getItem('cartDetails');
        if (savedCartDetails) {
            const { subtotal, shipping, taxes, discount, orderTotal, couponCode, couponMsg } = JSON.parse(savedCartDetails);
            console.log("Cart Detaaaaails:", { subtotal, shipping, taxes, discount, orderTotal, couponCode, couponMsg });
        }
    }, []);

    return (
        <div className="page-wrapper1">
            <div className="page-content">
                <section className="py-3 border-bottom d-none d-md-flex">
                    <div className="container">
                        <div className="page-breadcrumb d-flex align-items-center">
                            <h3 className="breadcrumb-title pe-3">Shop Cart</h3>
                            <div className="ms-auto">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0 p-0">
                                        <li className="breadcrumb-item"><Link href="/"><i className="bx bx-home-alt"></i> Home</Link>
                                        </li>
                                        <li className="breadcrumb-item"><Link href="/shop">Shop</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Shop Cart</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-4">
                    <div className="container">
                        <div className="shop-cart">
                            <div className="row">
                                <div className="col-12 col-xl-8">
                                    <div className="shop-cart-list mb-3 p-3">

                                        {cart.map((item, index) => (
                                            <div key={item.product._id}>
                                                {index !== 0 && <div className="my-4 border-top"></div>}

                                                <div className="row align-items-center g-3" >
                                                    <div className="col-12 col-lg-6">
                                                        <div className="d-lg-flex align-items-center gap-2">
                                                            <div className="cart-img text-center text-lg-start">
                                                                <img src={item?.product?.images[0]} width="130" alt="" />
                                                            </div>
                                                            <div className="cart-detail text-center text-lg-start">
                                                                <div className="product-details">
                                                                    <h6 className="mb-2">{item?.product?.productName}</h6>

                                                                    {/* Dropdown for Size */}
                                                                    <div className="inline-flex items-center space-x-4">
                                                                        {/* Dropdown for Size */}
                                                                        <div className="flex items-center space-x-2">
                                                                            <label htmlFor={`size-${item?.product?._id}`} className="text-sm font-medium">
                                                                                Size:
                                                                            </label>
                                                                            <select
                                                                                id={`size-${item?.product?._id}`}
                                                                                className="form-select text-sm py-1 px-2 pe-4 text-left border border-gray-300 rounded w-auto"
                                                                                value={item?.selectedSize || item?.product?.sizes?.split(",")[0]?.trim() || ""}
                                                                                onChange={(e) => {
                                                                                    const selectedSize = e.target.value || item?.product?.sizes?.split(",")[0]?.trim();
                                                                                    handleSizeChange(selectedSize, item?.product?._id);
                                                                                }}
                                                                            >
                                                                                {item?.product?.sizes?.split(",").map((size: string) => (
                                                                                    <option key={size.trim()} value={size.trim()}>
                                                                                        {size.trim()}
                                                                                    </option>
                                                                                ))}
                                                                            </select>

                                                                        </div>

                                                                        {/* Dropdown for Color */}
                                                                        <div className="flex items-center space-x-2">
                                                                            <label htmlFor={`color-${item?.product?._id}`} className="text-sm font-medium">
                                                                                Color:
                                                                            </label>
                                                                            <select
                                                                                id={`color-${item?.product?._id}`}
                                                                                className="form-select text-sm py-1 px-2 border border-gray-300 rounded w-auto"
                                                                                value={item?.selectedColor || item?.product?.availableColors?.split(",")[0]?.trim() || ""}
                                                                                onChange={(e) => {
                                                                                    const selectedColor = e.target.value || item?.product?.availableColors?.split(",")[0]?.trim();
                                                                                    handleColorChange(selectedColor, item?.product?._id);
                                                                                }}
                                                                            >
                                                                                {item?.product?.availableColors?.split(",").map((color: string) => (
                                                                                    <option key={color.trim()} value={color.trim()}>
                                                                                        {color.trim()}
                                                                                    </option>
                                                                                ))}
                                                                            </select>

                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                {/* <h5 className="mb-0">{item?.product?.sellingPrice}</h5> */}
                                                                <h5 className="mb-0 mt-2"> ${(parseFloat(item.product.sellingPrice) * item.quantity).toFixed(2)}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-3">
                                                        <div className="cart-action text-center">
                                                            <input type="number" className="form-control rounded-0"
                                                                min={1}
                                                                value={item.quantity}
                                                                onChange={(event) => {
                                                                    const value = parseInt(event.target.value, 10);
                                                                    handleQuantityChange(item.product._id, value > 0 ? value : 1); // Ensure value is at least 1
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-3">
                                                        <div className="text-center">
                                                            <div className="d-flex gap-2 justify-content-center justify-content-lg-end">
                                                                <div onClick={() => handleRemoveFromCart(item?.product?._id)} className="btn btn-light rounded-0 btn-ecomm"><i className="bx bx-x-circle"></i> Remove</div>
                                                                <div className="btn btn-light rounded-0 btn-ecomm"><WishlistBtn productId={item?.product?._id} /></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}

                                        <div className="my-4 border-top"></div>
                                        <div className="d-lg-flex align-items-center gap-2">
                                            <Link href='/' className="btn btn-light btn-ecomm"><i className="bx bx-shopping-bag"></i> Continue Shoping</Link>
                                            <div onClick={handleClearCart} className="btn btn-light btn-ecomm ms-auto"><i className="bx bx-x-circle"></i> Clear Cart</div>
                                            <Link href="/" className="btn btn-white btn-ecomm"><i className="bx bx-refresh"></i> Update Cart</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-4">
                                    <div className="checkout-form p-3 bg-dark-1">
                                        <div className="card rounded-0 border bg-transparent shadow-none">
                                            <div className="card-body">
                                                <p className="fs-5 text-white">Apply Discount Code</p>
                                                <div className="input-group">
                                                    <input type="text" className="form-control rounded-0" placeholder="Enter discount code"
                                                        value={code}
                                                        onChange={(e) => setCode(e.target.value)}
                                                    />
                                                    <button className="btn btn-light btn-ecomm" type="button" onClick={() => applyCoupon()}>Apply Discount</button>
                                                </div>
                                                <p className='text-xs  mt-2 py-1'>{codeMsg}</p>
                                            </div>
                                        </div>
                                        <div className="card rounded-0 border bg-transparent shadow-none">
                                            <div className="card-body">
                                                <p className="fs-5 text-white">Estimate Shipping and Tax</p>
                                                <div className="my-3 border-top"></div>
                                                <div className="mb-3">
                                                    <label className="form-label">Country Name</label>
                                                    <select className="form-select rounded-0" value={selectedValue} onChange={handleChange}>
                                                        <option value="0">United States</option>
                                                        <option value="1">Australia</option>
                                                        <option value="2">India</option>
                                                        <option value="3">Canada</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">State/Province</label>
                                                    <select className="form-select rounded-0" value={selectedValue2} onChange={handleChange2}>
                                                        <option value="0">California</option>
                                                        <option value="1">Texas</option>
                                                        <option value="2">Canada</option>
                                                    </select>
                                                </div>
                                                <div className="mb-0">
                                                    <label className="form-label">Zip/Postal Code</label>
                                                    <input type="email" className="form-control rounded-0" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card rounded-0 border bg-transparent mb-0 shadow-none">
                                            <div className="card-body">
                                                <p className="mb-2">Subtotal: <span className="float-end">{subtotal || "--"}</span>
                                                </p>
                                                <p className="mb-2">Shipping: <span className="float-end">{shipping || "--"}</span>
                                                </p>
                                                <p className="mb-2">Taxes: <span className="float-end">{taxes || '--'}</span>
                                                </p>
                                                <p className="mb-0">Discount: <span className="float-end">{discount ? `-${discount}%` : '--'}</span>
                                                </p>
                                                <div className="my-3 border-top"></div>
                                                <h5 className="mb-0">Order Total: <span className="float-end">${orderTotal}</span></h5>
                                                <div className="my-4"></div>
                                                <div className="d-grid">
                                                    <div onClick={handleBuyClick} className="btn btn-white btn-ecomm">Proceed to Checkout</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default Page


