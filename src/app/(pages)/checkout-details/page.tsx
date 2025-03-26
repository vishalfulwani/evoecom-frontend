'use client'

import CheckoutBreadCrumb from "@/components/Checkout/CheckoutBreadcrumb/page";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary/page";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CheckoutDetailsPage = () => {

	// const { data: session} = useSession();
	// const router = useRouter();

	// useEffect(() => {
	// 	console.log(session);
	// }, [session]);

	// // Set initial state values with empty strings or fallback to the session data
	// const [street, setStreet] = useState<string>(session?.address?.street || "");
	// const [city, setCity] = useState<string>(session?.address?.city || "");
	// const [state, setState] = useState<string>(session?.address?.state || "");
	// const [postalCode, setPostalCode] = useState<string>(session?.address?.postalCode || "");
	// const [phone, setPhone] = useState<string>(session?.phone || "");

	// const handleProceedToCheckout = (e: React.FormEvent) => {
	// 	e.preventDefault();

	// 	const addressData = {
	// 		userName: session?.user?.userName,
	// 		email: session?.user?.email,
	// 		street,
	// 		city,
	// 		state,
	// 		postalCode,
	// 		phone,
	// 	};

	// 	// Store address in local storage
	// 	localStorage.setItem("address", JSON.stringify(addressData));
	// 	// Redirect to the shipping page
	// 	router.push("/checkout-shipping");
	// };


	const { data: session } = useSession();
const router = useRouter();

// State initialized as undefined to avoid switching between controlled & uncontrolled
const [street, setStreet] = useState<string | undefined>(undefined);
const [city, setCity] = useState<string | undefined>(undefined);
const [state, setState] = useState<string | undefined>(undefined);
const [postalCode, setPostalCode] = useState<string | undefined>(undefined);
const [phone, setPhone] = useState<string | undefined>(undefined);

// Update state when session data is available
useEffect(() => {
  if (session) {
    setStreet(session?.address?.street || "");
    setCity(session?.address?.city || "");
    setState(session?.address?.state || "");
    setPostalCode(session?.address?.postalCode || "");
    setPhone(session?.phone || "");
  }
  console.log(session)
}, [session]);

const handleProceedToCheckout = (e: React.FormEvent) => {
  e.preventDefault();

  const addressData = {
    userName: session?.user?.userName,
    email: session?.user?.email,
    street,
    city,
    state,
    postalCode,
    phone,
  };

  localStorage.setItem("address", JSON.stringify(addressData));
  router.push("/checkout-shipping");
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
									<div className="checkout-details">
										<div className="card bg-transparent rounded-0 shadow-none">
											<div className="card-body">
												<div className="steps steps-light">
													<Link className="step-item active" href="/shop">
														<div className="step-progress"><span className="step-count">1</span>
														</div>
														<div className="step-label"><i className="bx bx-cart"></i>Cart</div>
													</Link>
													<a className="step-item active current" href="/checkout-details">
														<div className="step-progress"><span className="step-count">2</span>
														</div>
														<div className="step-label"><i className="bx bx-user-circle"></i>Details</div>
													</a>
													<a className="step-item" href="/checkout-shipping">
														<div className="step-progress"><span className="step-count">3</span>
														</div>
														<div className="step-label"><i className="bx bx-cube"></i>Shipping</div>
													</a>
													<a className="step-item" href="/checkout-payment">
														<div className="step-progress"><span className="step-count">4</span>
														</div>
														<div className="step-label"><i className="bx bx-credit-card"></i>Payment</div>
													</a>
													<a className="step-item" href="/checkout-review">
														<div className="step-progress"><span className="step-count">5</span>
														</div>
														<div className="step-label"><i className="bx bx-check-circle"></i>Review</div>
													</a>
												</div>
											</div>
										</div>
										<div className="card rounded-0">
											<div className="card-body">
												<div className="d-flex align-items-center">
													<div className="">
														<img src="assets/images/avatars/avatar-1.png" width="90" alt="" className="rounded-circle p-1 border" />
													</div>
													<div className="ms-2">
														<h6 className="mb-0">{session?.user?.userName}</h6>
														<p className="mb-0">{session?.user?.email}</p>
													</div>
													<div className="ms-auto">	<Link href="/user-details" className="btn btn-light btn-ecomm"><i className="bx bx-edit"></i> Edit Profile</Link>
													</div>
												</div>
											</div>
										</div>
										<div className="card rounded-0">
											<div className="card-body">
												<div className="border p-3">
													<h2 className="h5 mb-0">Shipping Address</h2>
													<div className="my-3 border-bottom"></div>
													<div className="form-body">
														<form className="row g-3" onSubmit={handleProceedToCheckout}>
															<div className="col-md-6">
																<label className="form-label">First Name</label>
																<input type="text" className="form-control rounded-0" value={session?.user?.firstName} readOnly />
															</div>
															<div className="col-md-6">
																<label className="form-label">Last Name</label>
																<input type="text" className="form-control rounded-0" value={session?.user?.lastName} readOnly/>
															</div>
															<div className="col-md-6">
																<label className="form-label">E-mail id</label>
																<input type="text" className="form-control rounded-0" value={session?.user?.email || ''} // Fallback to an empty string if email is null or undefined
																	readOnly />
															</div>
															<div className="col-md-6">
																<label className="form-label">Phone Number</label>
																<input  className="form-control rounded-0" 
																 type="tel"
																 id="phone"
																 placeholder="phone"
																 value={phone}
																 onChange={(e) => setPhone(e.target.value)}
																 required
																/>
															</div>
															<div className="col-md-6">
																<label className="form-label">Street</label>
																<input type="text" className="form-control rounded-0" 
																	   id="street"
																	   value={street}
																	   onChange={(e) => setStreet(e.target.value)}
																	   required
																	   placeholder="street name"
																	    />
															</div>
															<div className="col-md-6">
																<label className="form-label">City/District</label>
																<input type="text" className="form-control rounded-0"
																	id="city"
																	value={city}
																	onChange={(e) => setCity(e.target.value)}
																	placeholder="city name"
																	required />

															</div>
															<div className="col-md-6">
																<label className="form-label">State/Province</label>
																<input type="text" className="form-control rounded-0"
																	id="state"
																	placeholder="state name"
																	value={state}
																	onChange={(e) => setState(e.target.value)}
																	required />

															</div>
															<div className="col-md-6">
																<label className="form-label">Zip/Postal Code</label>
																<input type="text" className="form-control rounded-0"
																	id="postalCode"
																	placeholder="postal code"
																	value={postalCode}
																	onChange={(e) => setPostalCode(e.target.value)}
																	required
																/>
															</div>
														
															<div className="col-md-12">
																<h6 className="mb-0 h5">Billing Address</h6>
																<div className="my-3 border-bottom"></div>
																<div className="form-check">
																	<input className="form-check-input" type="checkbox" id="gridCheck" />
																	<label className="form-check-label" htmlFor="gridCheck">Same as shipping address</label>
																</div>
															</div>
															<div className="col-md-6">
																<div className="d-grid">	<Link href="/cart" className="btn btn-light btn-ecomm"><i className="bx bx-chevron-left"></i>Back to Cart</Link>
																</div>
															</div>
															<div className="col-md-6">
																<div className="d-grid">	<button type='submit' className="btn btn-white btn-ecomm">Proceed to Checkout<i className="bx bx-chevron-right"></i></button>
																</div>
															</div>
														</form>
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
export default CheckoutDetailsPage
