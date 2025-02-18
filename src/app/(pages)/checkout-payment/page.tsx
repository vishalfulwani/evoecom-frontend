'use client'

import CheckoutBreadCrumb from "@/components/Checkout/CheckoutBreadcrumb/page";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary/page";
import { ApiResponse } from "@/helpers/ApiResponse";
import { IUser } from "@/models/user.models";
import { clearCart } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { APP_BASE_URL } from "../../../../constants";

const Page = () => {
   
	const cart = useSelector((state: RootState) => state.cart.cart);
    const dispatch = useDispatch();
    const [discount, setDiscount] = useState<number>(0);
    const [code, setCode] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [codeMsg, setCodeMsg] = useState('');

    const [userId, setUserId] = useState<string>('');
    const [updateDetail, setUpdateDetail] = useState(0);



    const [isLoading, setIsLoading] = useState(false);

    // Load cart from localStorage when component mounts
    // useEffect(() => {
    //     const storedCart = localStorage.getItem('cart');
    //     if (storedCart) {
    //         const parsedCart: ICartItem[] = JSON.parse(storedCart);
    //         parsedCart.forEach(item => dispatch(addToCart(item)));
    //     }
    // }, [dispatch]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // session
    const { data: session, status } = useSession();
    console.log(session?.platform)
    useEffect(() => {
        console.log(session)
    }, [session]);

    // update coupon
    const updateCoupon = async () => {
        try {
            console.log("userrrrr", userId)
            // const response = await axios.post('/api/admin/update-coupon', {
            const response = await axios.post(`${APP_BASE_URL}/admin/update-coupon`, {
                couponCode,
                userId
            })
            const msg = response.data.message
        } catch (error) {
            console.error("Error applying coupon", error)
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
    // const [userId, setUserId] = useState<string>('');
    const [street, setStreet] = useState<string>(session?.address?.street || "");
    const [city, setCity] = useState<string>(session?.address?.city || "");
    const [state, setState] = useState<string>(session?.address?.state || "");
    const [postalCode, setPostalCode] = useState<string>(session?.address?.postalCode || "");
    const [phone, setPhone] = useState<string>(session?.phone || "");


    const [isPopoverOpen, setIsPopoverOpen] = useState(false);


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

		if (!session) {
			// If no session, redirect to sign-in page
			router.push('/signin'); // Adjust the path if necessary
			toast.success("Signin first")
			return
		  } 

		const storedAddress = localStorage.getItem("address");
        const addressData = storedAddress ? JSON.parse(storedAddress) : null;
        
		const cartDetails = localStorage.getItem("cartDetails");
        // if (cartDetails) {
        const parsedCartDetails = cartDetails ? JSON.parse(cartDetails) : null;
		// }

        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        const address = {
            street: addressData.street,
            city: addressData.email,
            state: addressData.state,
            postalCode: addressData.phone,
        };

        try {

            const totalAmount = calculateTotal()

            const response = await axios.post('/api/create-buy-order', {
            // const response = await axios.post(`${APP_BASE_URL}/create-buy-order`, {
                userId:session?.user?._id,
                cartItems,
                address,
                totalAmount:parsedCartDetails.orderTotal,
                phone:addressData.phone,
                couponCode:parsedCartDetails.code,
            });
            console.log(totalAmount)

            toast.success("Order Created")

            const order = response.data

            // if (!order.id) {
            //   toast({
            //     title: 'Failed',
            //     description: 'Order creation failed',
            //     className: "toast-error"
            //   })
            // }

            // Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                amount: order.amount,
                currency: order.currency,
                name: 'E-commerce',
                description: 'Shopping',
                order_id: order.id,
                handler: async (response: any) => {
                    try {
                        // Send payment details to backend for verification
                        const verificationRes = await fetch('/api/verify-ecommerce-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const verificationData = await verificationRes.json();

                        if (verificationRes.ok) {
                            // alert('Payment successful!');
                            toast('Payment initialization successful',)
                        } else {
                            // alert(`Payment failed: ${verificationData.error}`);
                            toast.error(`Payment initialization failed: ${verificationData.error}`)
                        }
                    } catch (error: any) {
                        toast.error(`Verification failed: ${error.message}`)
                    }
                },
                prefill: {
                    userId: userId,
                    phone: phone,
                    address: address
                },
                notes: {
                    address: 'User Address',
                },
                theme: {
                    color: '#3399cc',
                },
            };



            const rzp = new (window as any).Razorpay(options);
            rzp.open();

            // handleClearCart()
            setIsLoading(false)

            toast.success("Order Placed")
            if (discount) {
                updateCoupon()
            }

        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast.error(errorMessage || "Order failed")
            setIsLoading(false)
        }
    };





	return (
		<div className="page-wrapper1">
			<div className="page-content">

				<CheckoutBreadCrumb />
				<section className="py-4">
					<div className="container">
						<div className="shop-cart">
							<div className="row">
								<div className="col-12 col-xl-8">
									<div className="checkout-payment">
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
										<div className="card rounded-0 shadow-none">
											<div className="card-header border-bottom">
												<h2 className="h5 my-2">Choose Payment Method</h2>
											</div>
											{/* <div className="card-body">
												<ul className="nav nav-pills mb-3 border p-3" role="tablist">
													<li className="nav-item" role="presentation">
														<a className="nav-link active rounded-0" data-bs-toggle="pill" href="#credit-card" role="tab" aria-selected="true">
															<div className="d-flex align-items-center">
																<div className="tab-icon"><i className="bx bx-credit-card font-18 me-1"></i>
																</div>
																<div className="tab-title">Credit Card</div>
															</div>
														</a>
													</li>
													<li className="nav-item" role="presentation">
														<a className="nav-link rounded-0" data-bs-toggle="pill" href="#paypal-payment" role="tab" aria-selected="false">
															<div className="d-flex align-items-center">
																<div className="tab-icon"><i className="bx bxl-paypal font-18 me-1"></i>
																</div>
																<div className="tab-title">Paypal</div>
															</div>
														</a>
													</li>
													<li className="nav-item" role="presentation">
														<a className="nav-link rounded-0" data-bs-toggle="pill" href="#net-banking" role="tab" aria-selected="false">
															<div className="d-flex align-items-center">
																<div className="tab-icon"><i className="bx bx-mobile font-18 me-1"></i>
																</div>
																<div className="tab-title">Net Banking</div>
															</div>
														</a>
													</li>
												</ul>
												<div className="tab-content" id="pills-tabContent">
													<div className="tab-pane fade show active" id="credit-card" role="tabpanel">
														<div className="p-3 border">
															<form>
																<div className="mb-3">
																	<label className="form-label">Card Owner</label>
																	<input type="text" className="form-control rounded-0" placeholder="Card Owner name" />
																</div>
																<div className="mb-3">
																	<label className="form-label">Card number</label>
																	<div className="input-group">
																		<input type="text" className="form-control rounded-0" placeholder="Valid Owner number" />	<span className="input-group-text rounded-0"><img src="assets/images/icons/mastercard.png" width="35" alt="" /></span>
																		<span className="input-group-text rounded-0"><img src="assets/images/icons/visa.png" width="35" alt="" /></span>
																		<span className="input-group-text rounded-0"><img src="assets/images/icons/american-express.png" width="35" alt="" /></span>
																	</div>
																</div>
																<div className="row">
																	<div className="col-12 col-lg-8">
																		<div className="mb-3">
																			<label className="form-label">Expiration Date</label>
																			<div className="input-group">
																				<input type="text" className="form-control rounded-0" placeholder="MM" />
																				<input type="text" className="form-control rounded-0" placeholder="YY" />
																			</div>
																		</div>
																	</div>
																	<div className="col-12 col-lg-4">
																		<div className="mb-3">
																			<label className="form-label">CVV</label>
																			<input type="text" className="form-control rounded-0" placeholder="Three digit CCV number" />
																		</div>
																	</div>
																</div>
																<div className="row">
																	<div className="col-md-12">
																		<div className="d-grid">	<a href=";" className="btn btn-white btn-ecomm rounded-0">Confirm Payment</a>
																		</div>
																	</div>
																</div>
															</form>
														</div>
													</div>
													<div className="tab-pane fade" id="paypal-payment" role="tabpanel">
														<div className="p-3 border">
															<div className="mb-3">
																<p>Select your Paypal Account type</p>
																<div className="form-check form-check-inline">
																	<input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
																	<label className="form-check-label" htmlFor="inlineRadio1">Domestic</label>
																</div>
																<div className="form-check form-check-inline">
																	<input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
																	<label className="form-check-label" htmlFor="inlineRadio2">International</label>
																</div>
															</div>
															<div className="mb-3">
																<div className="d-block">	<a href=";" className="btn btn-light rounded-0"><i className="bx bxl-paypal"></i>Login to my Paypal</a>
																</div>
															</div>
															<div className="mb-3">
																<p className="mb-0">Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order.</p>
															</div>
														</div>
													</div>
													<div className="tab-pane fade" id="net-banking" role="tabpanel">
														<div className="p-3 border">
															<div className="mb-3">
																<p>Select your Bank</p>
																<select className="form-select rounded-0" aria-label="Default select example" value={selectedValue} onChange={handleChange}>
																	<option value="0">--Please Select Your Bank--</option>
																	<option value="1">Bank Name 1</option>
																	<option value="2">Bank Name 2</option>
																	<option value="3">Bank Name 3</option>
																</select>
															</div>
															<div className="mb-3">
																<div className="d-block"> <a href="" className="btn btn-light rounded-0"><i className="bx bxl-paypal"></i>Login to my Paypal</a>
																</div>
															</div>
															<div className="mb-3">
																<p className="mb-0">Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order.</p>
															</div>
														</div>
													</div>
												</div>
											</div> */}
											<div className="row">
													<div className="col-md-6">
														<div className="d-grid">	<div onClick={()=>handleNextClick()} className="btn btn-light btn-ecomm"><i className="bx bx-chevron-left"></i>Payment</div>
														</div>
												</div>
											</div>

										</div>
										<div className="card rounded-0 shadow-none">
											<div className="card-body">
												<div className="row">
													<div className="col-md-6">
														<div className="d-grid">	<Link href="/checkout-shipping" className="btn btn-light btn-ecomm"><i className="bx bx-chevron-left"></i>Back to Shipping</Link>
														</div>
													</div>
													<div className="col-md-6">
														<div className="d-grid">	<Link href="/checkout-review" className="btn btn-white btn-ecomm">Review Your Order<i className="bx bx-chevron-right"></i></Link>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-12 col-xl-4">
									<CheckoutSummary />
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
