
'use client';

import CheckoutBreadCrumb from "@/components/Checkout/CheckoutBreadcrumb/page";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary/page";
import { useSession } from "next-auth/react";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Page = () => {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   // Set to true after the client-side rendering is complete
  //   setIsClient(true);
  // }, []);

  // // Ensure the component only renders once the client-side JavaScript is ready
  // if (!isClient) {
  //   return null; // Or a loading spinner, depending on your preference
  // }
  

  return (
    <div className="page-wrapper1">
      <div className="page-content">
        <CheckoutBreadCrumb />
        <section className="py-4">
          <div className="container">
            <div className="shop-cart">
              <div className="row">
                <div className="col-12 col-xl-8">
                  <div className="checkout-shipping">
                    <div className="card bg-transparent rounded-0 shadow-none">
                      <div className="card-body">
                        <div className="steps steps-light">
                          <a className="step-item active" href="shop-cart.html">
                            <div className="step-progress">
                              <span className="step-count">1</span>
                            </div>
                            <div className="step-label">
                              <i className="bx bx-cart"></i>Cart
                            </div>
                          </a>
                          <a className="step-item active" href="checkout-details.html">
                            <div className="step-progress">
                              <span className="step-count">2</span>
                            </div>
                            <div className="step-label">
                              <i className="bx bx-user-circle"></i>Details
                            </div>
                          </a>
                          <a className="step-item active current" href="checkout-shipping.html">
                            <div className="step-progress">
                              <span className="step-count">3</span>
                            </div>
                            <div className="step-label">
                              <i className="bx bx-cube"></i>Shipping
                            </div>
                          </a>
                          <a className="step-item" href="checkout-payment.html">
                            <div className="step-progress">
                              <span className="step-count">4</span>
                            </div>
                            <div className="step-label">
                              <i className="bx bx-credit-card"></i>Payment
                            </div>
                          </a>
                          <a className="step-item" href="checkout-review.html">
                            <div className="step-progress">
                              <span className="step-count">5</span>
                            </div>
                            <div className="step-label">
                              <i className="bx bx-check-circle"></i>Review
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card rounded-0 shadow-none">
                      <div className="card-body">
                        <h2 className="h5 mb-0">Choose Shipping Method</h2>
                        <div className="my-3 border-bottom"></div>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className="table-light">
                              <tr>
                                <th>Method</th>
                                <th>Time</th>
                                <th>Fee</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Flat Rate</td>
                                <td>2 days</td>
                                <td>$10.00</td>
                              </tr>
                              <tr>
                                <td>International shipping</td>
                                <td>12 days</td>
                                <td>$12.00</td>
                              </tr>
                              <tr>
                                <td>Same day delivery</td>
                                <td>1 day</td>
                                <td>$22.00</td>
                              </tr>
                              <tr>
                                <td>Expedited shipping</td>
                                <td>--</td>
                                <td>$15.00</td>
                              </tr>
                              <tr>
                                <td>Local Pickup</td>
                                <td>--</td>
                                <td>$0.00</td>
                              </tr>
                              <tr>
                                <td>UPS Ground</td>
                                <td>2-5 days</td>
                                <td>$16.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="card rounded-0 shadow-none">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="d-grid">
                              <Link href="/checkout-details" className="btn btn-light btn-ecomm">
                                <i className="bx bx-chevron-left"></i>Back to Details
                              </Link>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-grid">
                              <Link href="/checkout-payment" className="btn btn-white btn-ecomm">
                                Proceed to Payment
                                <i className="bx bx-chevron-right"></i>
                              </Link>
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
  );
};

export default Page;
