'use client'

import { ApiResponse } from "@/helpers/ApiResponse";
import { IUser } from "@/models/user.models";
import { clearCart, removeFromCart, updateQuantity } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CheckoutSummary = () => {

    const cart = useSelector((state: RootState) => state.cart.cart);
    const dispatch = useDispatch();

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
            
        } catch (error) {
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


    return (

        <div className="order-summary">
            <div className="card rounded-0">
                <div className="card-body">
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
                            <p className="fs-5 text-white">Order summary</p>

                            {cart.map((item, index) => (
                                <div key={index}>
                                    <div className="my-3 border-top"></div>
                                    <div className="d-flex align-items-center gap-3">
                                        <a className="d-block flex-shrink-0" href=";">
                                            <img src={item?.product?.images[0]} width="75" alt="Product" />
                                        </a>
                                        <div className="ps-2">
                                            <h6 className="mb-1"><a href=";">{item?.product?.productName}</a></h6>
                                            <div className="widget-product-meta"><span className="me-2">${item.product.sellingPrice}.<small>00</small></span><span className="">x {item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card rounded-0 border bg-transparent mb-0 shadow-none">
                        <div className="card-body">
                            <p className="mb-2">Subtotal: <span className="float-end">{subtotal || "--"}</span>
                            </p>
                            <p className="mb-2">Shipping: <span className="float-end">{shipping || "--"}</span>
                            </p>
                            <p className="mb-2">Taxes: <span className="float-end">{taxes || "--"}</span>
                            </p>
                            <p className="mb-0">Discount: <span className="float-end">{discount ? `-${discount}%` : '--'}</span>
                            </p>
                            <div className="my-3 border-top"></div>
                            <h5 className="mb-0">Order Total: <span className="float-end">${orderTotal || ''}</span></h5>
                            <div className="my-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default CheckoutSummary



// *****************************************************************************************************************


// 'use client'

// import { ApiResponse } from "@/helpers/ApiResponse";
// import { IUser } from "@/models/user.models";
// import { clearCart, removeFromCart, updateQuantity } from "@/redux/cartSlice";
// import { RootState } from "@/redux/store";
// import axios, { AxiosError } from "axios";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const CheckoutSummary = () => {

//     const cart = useSelector((state: RootState) => state.cart.cart);
//     const dispatch = useDispatch();

//     const [discount, setDiscount] = useState<number>(0);
//     const [code, setCode] = useState<string>("");
//     const [codeMsg, setCodeMsg] = useState<string>("");

//     const [subtotal, setSubtotal] = useState<number>(0);
//     const [shipping, setShipping] = useState<number>(50); // Example flat rate for shipping
//     const [taxes, setTaxes] = useState<number>(0);
//     const [orderTotal, setOrderTotal] = useState<number>(0);

//     const [check,setCheck] = useState(1)

 
    

//     const [userId, setUserId] = useState<string>('');
//     const [updateDetail, setUpdateDetail] = useState(0);

//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }, [cart]);

 
//     // session
//     // const [userSession, setUserSession] = useState(false)
//     const { data: session, status } = useSession();
//     console.log(session?.platform)
//     useEffect(() => {
//         console.log(session)
//     }, [session]);

//     // apply coupon
//     const applyCoupon = async () => {
//         if (check == 1){
//             setCheck(2)
//         }
//         else{
//             setCheck(1)
//         }
//         try {
//             console.log("userrrrr", userId)
//             const response = await axios.post('/api/admin/apply-coupon', {
//                 code,
//                 userId
//             })
//             const disc = response.data.data?.discount
//             setDiscount(disc)
//             console.log("-----", disc)
//             calculateTotal()
//             const msg = response.data.message
//             setCodeMsg(msg)
//             setCode(code)
//             calculateCartDetails()
//         } catch (error) {
//             console.error("Error applying coupon", error)
//             const axiosError = error as AxiosError<ApiResponse>
//             let errorMessage = axiosError.response?.data.message
//             console.log(`${code} ${errorMessage}`)
//             setDiscount(0)
//             setCode("")
//             setCodeMsg(errorMessage || "Invalid or expired coupon code")
//             // setCodeMsg(`${code} ${errorMessage}` || "Invalid or expired coupon code")
//         }
//     }

//     useEffect(() => {
//         const cartDetails = localStorage.getItem("cartDetails");
//         if (cartDetails) {
//             const parsedCartDetails = JSON.parse(cartDetails);

//             // Update states with parsed values
//             setDiscount(parsedCartDetails.discount);
//             setCode(parsedCartDetails.code);
//             setCodeMsg(parsedCartDetails.codeMsg);
//             setTaxes(parsedCartDetails.taxes);
//             setShipping(parsedCartDetails.shipping);
//             setOrderTotal(parsedCartDetails.orderTotal);
//             setSubtotal(parsedCartDetails.subtotal);
//         }
//     }, [check]);

//     // calculate total amount to pay
//     const calculateTotal = () => {
//         const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.product.sellingPrice) * item.quantity, 0);
//         const total = subtotal - (subtotal * discount / 100);
//         return total.toFixed(2);
//     };

//     const [address, setAddress] = useState<{ street?: string; city?: string; state?: string; postalCode?: string }>({});
//     // get user
//     const [users, setUsers] = useState<IUser[]>([])

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const allUsers = await axios.get<ApiResponse>('/api/get-users')
//                 const userData = allUsers.data.data as []
//                 setUsers(userData)

//                 const you = userData.filter((data: any) => {
//                     return data?._id.toString() === userId
//                 })

//             } catch (error) {
//                 console.error("Error fetching users:", error)
//             }
//         }
//         fetchUsers()
//         console.log(address, "00000")
//     }, [userId, updateDetail])

//     useEffect(() => {
//         const id = session?.user?._id as string
//         setUserId(id)
//     }, [])


//     // Dynamically load Razorpay script
//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.async = true;
//         document.body.appendChild(script);

//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);



//     // Update the cart in local storage with these details
 

//     const calculateCartDetails = () => {
//         // Calculate subtotal
//         const sub = cart.reduce((acc, item) => acc + parseFloat(item.product.sellingPrice) * item.quantity, 0);
//         setSubtotal(sub);

//         // Calculate taxes (assuming 10% of subtotal as tax for example)
//         const tax = sub * 0.1;
//         setTaxes(tax);

//         // Calculate total after applying discount
//         console.log("disssssssss",discount)
//         const total = sub + tax + shipping - (sub * discount / 100);
//         console.log("disssssssss",total)
//         setOrderTotal(total);

//         // Save to localStorage
//         const updatedCartDetails = {
//             cart,
//             subtotal: sub,
//             shipping,
//             taxes: tax,
//             discount,
//             orderTotal: total,
//             code,
//             codeMsg,
//         };
//         localStorage.setItem('cartDetails', JSON.stringify(updatedCartDetails));
//     };

//     useEffect(()=>{
//         calculateCartDetails()
//     },[cart])

//     useEffect(() => {
//         const savedCartDetails = localStorage.getItem('cartDetails');
//         if (savedCartDetails) {
//             const { subtotal, shipping, taxes, discount, orderTotal, couponCode, couponMsg } = JSON.parse(savedCartDetails);
//             console.log("Cart Detaaaaails:", { subtotal, shipping, taxes, discount, orderTotal, couponCode, couponMsg });
//         }
//     }, []);


//     return (

//         <div className="order-summary">
//             <div className="card rounded-0">
//                 <div className="card-body">
//                     <div className="card rounded-0 border bg-transparent shadow-none">
//                         <div className="card-body">
//                             <p className="fs-5 text-white">Apply Discount Code</p>
//                             <div className="input-group">
//                                 <input type="text" className="form-control rounded-0" placeholder="Enter discount code"
//                                     value={code ||""}
//                                     onChange={(e) => setCode(e.target.value)}
//                                />
//                                 <button className="btn btn-light btn-ecomm" type="button" onClick={() => applyCoupon()}>Apply Discount</button>
//                             </div>
//                             <p className='text-xs  mt-2 py-1'>{codeMsg}</p>
//                         </div>
//                     </div>
//                     <div className="card rounded-0 border bg-transparent shadow-none">
//                         <div className="card-body">
//                             <p className="fs-5 text-white">Order summary</p>

//                             {cart.map((item, index) => (
//                                 <div key={item?.product?._id}>
//                                     <div className="my-3 border-top"></div>
//                                     <div className="d-flex align-items-center gap-3">
//                                         <a className="d-block flex-shrink-0" href=";">
//                                             <img src={item?.product?.images[0]} width="75" alt="Product" />
//                                         </a>
//                                         <div className="ps-2">
//                                             <h6 className="mb-1"><a href=";">{item?.product?.productName}</a></h6>
//                                             <div className="widget-product-meta"><span className="me-2">${item.product.sellingPrice}.<small>00</small></span><span className="">x {item.quantity}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="card rounded-0 border bg-transparent mb-0 shadow-none">
//                         <div className="card-body">
//                             <p className="mb-2">Subtotal: <span className="float-end">{subtotal || "--"}</span>
//                             </p>
//                             <p className="mb-2">Shipping: <span className="float-end">{shipping || "--"}</span>
//                             </p>
//                             <p className="mb-2">Taxes: <span className="float-end">{taxes || "--"}</span>
//                             </p>
//                             <p className="mb-0">Discount: <span className="float-end">{discount ? `-${discount}%` : '--'}</span>
//                             </p>
//                             <div className="my-3 border-top"></div>
//                             <h5 className="mb-0">Order Total: <span className="float-end">${orderTotal || ''}</span></h5>
//                             <div className="my-4"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }
// export default CheckoutSummary
