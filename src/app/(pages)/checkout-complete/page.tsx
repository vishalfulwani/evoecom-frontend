'use client'

import CheckoutBreadCrumb from "@/components/Checkout/CheckoutBreadcrumb/page";
import Link from "next/link";
// import CheckoutSummary from "@/components/Checkout/CheckoutSummary/page";
// import { useState } from "react";

const Page = ()=>{

    return(
    	<div className="page-wrapper1">
			<div className="page-content">
            
                <CheckoutBreadCrumb/>
                <section className="py-4">
					<div className="container">
						<div className="card py-3 mt-sm-3">
							<div className="card-body text-center">
								<h2 className="h4 pb-3">Thank you for your order!</h2>
								<p className="fs-sm mb-2">Your order has been placed and will be processed as soon as possible.</p>
								<p className="fs-sm mb-2">Make sure you make note of your order number, which is <span className="fw-medium">34VB5540K83.</span>
								</p>
								<p className="fs-sm">You will be receiving an email shortly with confirmation of your order. <u>You can now:</u>
								</p>
								<Link className="btn btn-light rounded-0 mt-3 me-3" href="/">Go back shopping</Link>
								<a className="btn btn-white rounded-0 mt-3" href="/order-tracking">
									<i className="bx bx-map"></i>Track order
								</a>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
    )
}
export default Page
