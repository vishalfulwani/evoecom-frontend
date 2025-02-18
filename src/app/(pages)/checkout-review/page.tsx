'use client'

import CheckoutBreadCrumb from "@/components/Checkout/CheckoutBreadcrumb/page";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary/page";
import { ApiResponse } from "@/helpers/ApiResponse";
import { IUser } from "@/models/user.models";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_BASE_URL } from "../../../../constants";
import { useSession } from "next-auth/react";
import { clearCart, removeFromCart, updateColor, updateQuantity, updateSize } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import WishlistBtn from "@/components/WishlistBtn/page";

const Page = ()=>{
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

    const [isLoading, setIsLoading] = useState(false);
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
    const { data: session, status } = useSession();
    console.log(session?.platform)
    useEffect(() => {
        console.log(session)
    }, [session]);

    // apply coupon
    const applyCoupon = async () => {
        try {
            console.log("userrrrr", userId)
            // const response = await axios.post('/api/admin/apply-coupon', {
            const response = await axios.post(`${APP_BASE_URL}/admin/apply-coupon`, {
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
            let errorMessage = axiosError.response?.data.message
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

    const [address, setAddress] = useState<{ street?: string; city?: string; state?: string; postalCode?: string }>({});
    // get user
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // const allUsers = await axios.get<ApiResponse>('/api/get-users')
                const allUsers = await axios.get<ApiResponse>(`${APP_BASE_URL}/get-users`)
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


    const handleBuyClick = () => {
        setIsLoading(true)
        if (!session) {
            router.push('/signin');
        }
        else if (session.platform != 'ecommerce') {
            router.push('/signin');
        } else {
            // setIsPopoverOpen(true);
            setIsLoading(false)
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


    const handleNextClick = async () => {
        setIsLoading(true)
        router.push('/checkout');
    };


    const [subtotal, setSubtotal] = useState<number>(0);
    const [shipping, setShipping] = useState<number>(50); // Example flat rate for shipping
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


	// useEffect(()=>{
		const storedAddress = localStorage.getItem("address");
        const addressData = storedAddress ? JSON.parse(storedAddress) : null;
	// },[])
   

    return(
    	<div className="page-wrapper1">
			<div className="page-content">
            
                <CheckoutBreadCrumb/>
                <section className="py-4">
					<div className="container">
						<div className="shop-cart">
							<div className="row">
								<div className="col-12 col-xl-8">
                                <div className="checkout-review">
										<div className="card bg-transparent rounded-0 shadow-none">
											<div className="card-body">
												<div className="steps steps-light">
													<a className="step-item active" href="shop-cart.html">
														<div className="step-progress"><span className="step-count">1</span>
														</div>
														<div className="step-label"><i className="bx bx-cart"></i>Cart</div>
													</a>
													<a className="step-item active" href="checkout-details.html">
														<div className="step-progress"><span className="step-count">2</span>
														</div>
														<div className="step-label"><i className="bx bx-user-circle"></i>Details</div>
													</a>
													<a className="step-item active" href="checkout-shipping.html">
														<div className="step-progress"><span className="step-count">3</span>
														</div>
														<div className="step-label"><i className="bx bx-cube"></i>Shipping</div>
													</a>
													<a className="step-item active current" href="checkout-payment.html">
														<div className="step-progress"><span className="step-count">4</span>
														</div>
														<div className="step-label"><i className="bx bx-credit-card"></i>Payment</div>
													</a>
													<a className="step-item" href="checkout-review.html">
														<div className="step-progress"><span className="step-count">5</span>
														</div>
														<div className="step-label"><i className="bx bx-check-circle"></i>Review</div>
													</a>
												</div>
											</div>
										</div>
										<div className="card  rounded-0 shadow-none">
											<div className="card-body">
												<h5 className="mb-0">Review Your Order</h5>
												<div className="my-3 border-bottom"></div>
												<div className="row align-items-center g-3">
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
                                                                // onChange={(event) => {
                                                                //     const value = parseInt(event.target.value, 10);
                                                                //     handleQuantityChange(item.product._id, value > 0 ? value : 1); // Ensure value is at least 1
                                                                // }}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-3">
                                                        <div className="text-center">
                                                            <div className="d-flex gap-2 justify-content-center justify-content-lg-end">
                                                                <div className="btn btn-light rounded-0 btn-ecomm"><WishlistBtn productId={item?.product?._id} /></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
												</div>
											
											</div>
										</div>
										<div className="card rounded-0 shadow-none">
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="shipping-aadress">
															<h5 className="mb-3">Shipping to:</h5>
															<p className="mb-1"><span className="text-light">Customer:</span>{" "}{session?.user?.userName}</p>
															<p className="mb-1"><span className="text-light">Address:</span>  {`${addressData?.street || session?.address?.street}, ${addressData?.city || session?.address?.city}, ${addressData?.state || session?.address?.state}`}
															</p>
															<p className="mb-1"><span className="text-light">Phone:</span> {addressData.phone ||  session?.phone}</p>
														</div>
													</div>
													<div className="col-md-6">
														<div className="payment-mode">
															<h5 className="mb-3">Payment Mode:</h5>
															<img src="assets/images/icons/visa.png" width="150" className="p-2 border bg-light rounded" alt=""/>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="card rounded-0 shadow-none">
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="d-grid">	<a href="/checkout-payment" className="btn btn-light btn-ecomm"><i className="bx bx-chevron-left"></i>Back to Payment</a>
														</div>
													</div>
													<div className="col-md-6">
														<div className="d-grid">	<a href="checkout-complete" className="btn btn-white btn-ecomm">Complete Order<i className="bx bx-chevron-right"></i></a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-12 col-xl-4">
                                <CheckoutSummary/>
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
