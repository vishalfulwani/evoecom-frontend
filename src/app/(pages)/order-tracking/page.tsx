'use client'


const Page = ()=>{

    return(
        <div className="page-wrapper1">
        <div className="page-content">
            <section className="py-3 border-bottom d-none d-md-flex">
                <div className="container">
                    <div className="page-breadcrumb d-flex align-items-center">
                        <h3 className="breadcrumb-title pe-3">Tracking</h3>
                        <div className="ms-auto">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item"><a href="/"><i className="bx bx-home-alt"></i> Home</a>
                                    </li>
                                    <li className="breadcrumb-item"><a href="/shop">Shop</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Order Tracking</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-4">
                <div className="container">
                    <h6 className="mb-0">Order ID: OD45345345435</h6>
                    <hr/>
                    <div className="row row-cols-1 row-cols-lg-4 rounded-4 bg-dark-1 gx-3 m-0">
                        <div className="col p-4 text-center border-end">
                            <h6 className="mb-1">Estimated Delivery time:</h6>
                            <p className="mb-0">24 Apr 2021</p>
                        </div>
                        <div className="col p-4 text-center border-end">
                            <h6 className="mb-1">Shipping BY:</h6>
                            <p className="mb-0">BLUEDART | +91-9910XXXX</p>
                        </div>
                        <div className="col p-4 text-center border-end">
                            <h6 className="mb-1">Status:</h6>
                            <p className="mb-0">Picked by the courier</p>
                        </div>
                        <div className="col p-4 text-center">
                            <h6 className="mb-1">Tracking #:</h6>
                            <p className="mb-0">BD045903594059</p>
                        </div>
                    </div>
                    <div className="mt-3"></div>
                    <div className="checkout-payment">
                        <div className="card bg-transparent rounded-0 shadow-none">
                            <div className="card-body">
                                <div className="steps steps-light">
                                    <a className="step-item active" href=";">
                                        <div className="step-progress"><span className="step-count"><i className="bx bx-check"></i></span>
                                        </div>
                                        <div className="step-label">Order Placed</div>
                                    </a>
                                    <a className="step-item active" href=";">
                                        <div className="step-progress"><span className="step-count"><i className="bx bx-user-circle"></i></span>
                                        </div>
                                        {/* confirmed */}
                                        <div className="step-label">Order Confirmed</div>
                                    </a>
                                    <a className="step-item" href=";">
                                        <div className="step-progress"><span className="step-count"><i className="bx bx-car"></i></span>
                                        </div>
                                        {/* shipped */}
                                        <div className="step-label">On the way</div>
                                    </a>
                                    <a className="step-item" href=";">
                                        <div className="step-progress"><span className="step-count"><i className="bx bx-planet"></i></span>
                                        </div>
                                        {/* delivered */}
                                        <div className="step-label">Ready for pickup</div>
                                    </a>
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



// import React from "react";

// interface OrderTrackingProps {
//   paymentStatus: "pending" | "paid" | "failed";
//   orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
//   trackingNumber?: string;
//   estimatedDelivery?: string;
//   shippingBy?: string;
// }

// const OrderTracking: React.FC<OrderTrackingProps> = ({
//   paymentStatus,
//   orderStatus,
//   trackingNumber,
//   estimatedDelivery,
//   shippingBy,
// }) => {
//   const getStatusClass = (status: string) => {
//     return orderStatus === status ? "active" : "";
//   };

//   return (
//     <div>
//       {/* Order Details */}
//       <div className="grid grid-cols-1 md:grid-cols-4 bg-gray-800 text-white rounded-lg p-4 gap-2">
//         <div className="text-center border-r border-gray-600 p-4">
//           <h6 className="mb-1">Estimated Delivery:</h6>
//           <p className="mb-0">{estimatedDelivery || "N/A"}</p>
//         </div>
//         <div className="text-center border-r border-gray-600 p-4">
//           <h6 className="mb-1">Shipping By:</h6>
//           <p className="mb-0">{shippingBy || "Unknown"}</p>
//         </div>
//         <div className="text-center border-r border-gray-600 p-4">
//           <h6 className="mb-1">Order Status:</h6>
//           <p className="mb-0">{orderStatus}</p>
//         </div>
//         <div className="text-center p-4">
//           <h6 className="mb-1">Tracking #:</h6>
//           <p className="mb-0">{trackingNumber || "N/A"}</p>
//         </div>
//       </div>

//       {/* Order Progress */}
//       <div className="mt-4">
//         <div className="bg-gray-800 rounded-lg p-6 shadow-md">
//           <div className="flex justify-between text-white">
//             <div className={`step-item ${getStatusClass("pending")}`}>
//               <div className="step-progress"><i className="bx bx-time" /></div>
//               <div className="step-label">Order Placed</div>
//             </div>
//             <div className={`step-item ${getStatusClass("processing")}`}>
//               <div className="step-progress"><i className="bx bx-cog" /></div>
//               <div className="step-label">Processing</div>
//             </div>
//             <div className={`step-item ${getStatusClass("shipped")}`}>
//               <div className="step-progress"><i className="bx bx-car" /></div>
//               <div className="step-label">Shipped</div>
//             </div>
//             <div className={`step-item ${getStatusClass("delivered")}`}>
//               <div className="step-progress"><i className="bx bx-check-circle" /></div>
//               <div className="step-label">Delivered</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Payment Status */}
//       <div className="mt-4 text-center text-white">
//         <h6 className="text-lg font-semibold">Payment Status: {paymentStatus}</h6>
//       </div>
//     </div>
//   );
// };

// export default OrderTracking;
