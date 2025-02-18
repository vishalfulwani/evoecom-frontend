'use client'

import { ApiResponse } from '@/helpers/ApiResponse'
import { ICoupon } from '@/models/coupon.models'
import axios, { AxiosError } from 'axios'
import mongoose from 'mongoose'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [coupons, setCoupons] = useState<ICoupon[]>([])


    // api data fetch
    useEffect(() => {
        const fetchCoupons = async () => {
            setIsSubmitting(true)
            try {
                const allCoupons = await axios.get<ApiResponse>('/api/get-coupon')
                const couponData = allCoupons.data.data as []
                setCoupons(couponData)
            } catch (error) {
                console.error("Error fetching coupons:", error)
            } finally {
                setIsSubmitting(false)
            }
        }

        fetchCoupons()
    }, [])



    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filtered users based on search term
    const filteredCoupons = coupons.filter((coupon) => {
        const searchTermLower = searchTerm.toLowerCase();
        
        return (
          (coupon.code && coupon.code.toLowerCase().includes(searchTermLower)) ||
          (coupon.discountPercentage && coupon.discountPercentage.toString().toLowerCase().includes(searchTermLower))
        );
      });
      


    //   pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCoupons = filteredCoupons.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };


    return (
        <>
            <Head>
                <title>Admin Coupons</title>
                <meta name="description" content="This is the coupons data page." />
            </Head>

            <div className="app-wrapper">
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl ecom-users">
                        <div className="row g-3 mb-4 align-items-center justify-content-between">
                            <div className="col-auto">
                                <h1 className="app-page-title mb-0">Coupon</h1>
                            </div>
                            <div className="col-auto">
                                <div className="page-utilities">
                                    <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                                        <div className="col-auto">
                                            <form className="table-search-form row gx-1 align-items-center">
                                                <div className="col-auto">
                                                    <input type="text" id="search-orders" name="searchorders" className="form-control search-orders" placeholder="Search"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-auto">
                                                    <button type="submit" className="btn">Search</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isSubmitting ? (
                    <>
                        Please Wait...
                    </>
                ) : (
                        <div className="tab-content" id="orders-table-tab-content">
                            <div className="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
                                <div className="app-card app-card-orders-table shadow-sm mb-5">
                                    <div className="app-card-body">
                                        <div className="table-responsive">
                                            <table className="table app-table-hover mb-0 text-left">
                                                <thead>
                                                    <tr>
                                                        <th className="cell">Code</th>
                                                        <th className="cell">Discount percentage</th>
                                                        <th className="cell">Limit</th>
                                                        <th className="cell">Applied by</th>
                                                        <th className="cell">Created At</th>
                                                        <th className="cell">Expiry Date</th>
                                                        <th className="cell">Active</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                            currentCoupons.map((coupon, index) => (
                                                    <tr key={coupon._id.toString()}>
                                                        <td className="cell">{coupon.code}</td>
                                                        <td className="cell"><span className="truncate">{coupon.discountPercentage}</span></td>
                                                        <td className="cell">{coupon.limit}</td>
                                                        <td className="cell">{coupon.appliedBy.length}</td>
                                                        <td className="cell">{new Date(coupon.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}</td>
                                                        <td className="cell">{new Date(coupon.expirationDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}</td>
                                                        <td className="cell">{coupon.isActive ? 'Active' : 'Inactive'}</td>
                                                    </tr>
                                            ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <nav className="app-pagination">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item ">
                                            <button className="page-link" aria-disabled="true"
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            >Previous</button>
                                        </li>
                                        <li className="page-item "><a className="page-link" >{currentPage}</a></li>
                                        <li className="page-item">
                                            <button className="page-link" 
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="tab-pane fade" id="orders-paid" role="tabpanel" aria-labelledby="orders-paid-tab">
                                <div className="app-card app-card-orders-table mb-5">
                                    <div className="app-card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0 text-left">
                                                <thead>
                                                    <tr>
                                                        <th className="cell">Order</th>
                                                        <th className="cell">Product</th>
                                                        <th className="cell">Customer</th>
                                                        <th className="cell">Date</th>
                                                        <th className="cell">Status</th>
                                                        <th className="cell">Total</th>
                                                        <th className="cell"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="cell">#15346</td>
                                                        <td className="cell"><span className="truncate">Lorem ipsum dolor sit amet eget volutpat erat</span></td>
                                                        <td className="cell">John Sanders</td>
                                                        <td className="cell"><span>17 Oct</span><span className="note">2:16 PM</span></td>
                                                        <td className="cell"><span className="badge bg-success">Paid</span></td>
                                                        <td className="cell">$259.35</td>
                                                        <td className="cell"><a className="btn-sm bg-success" href="#">View</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="orders-pending" role="tabpanel" aria-labelledby="orders-pending-tab">
                                <div className="app-card app-card-orders-table mb-5">
                                    <div className="app-card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0 text-left">
                                                <thead>
                                                    <tr>
                                                        <th className="cell">Order</th>
                                                        <th className="cell">Product</th>
                                                        <th className="cell">Customer</th>
                                                        <th className="cell">Date</th>
                                                        <th className="cell">Status</th>
                                                        <th className="cell">Total</th>
                                                        <th className="cell"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="cell">#15345</td>
                                                        <td className="cell"><span className="truncate">Consectetur adipiscing elit</span></td>
                                                        <td className="cell">Dylan Ambrose</td>
                                                        <td className="cell"><span className="cell-data">16 Oct</span><span className="note">03:16 AM</span></td>
                                                        <td className="cell"><span className="badge bg-warning">Pending</span></td>
                                                        <td className="cell">$200.00</td>
                                                        <td className="cell"><a className="btn-sm bg-warning" href="#">View</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                )}
                        <div className='container mb-6 flex justify-center'>
                    <Link href="/admin-coupons/add-coupon" className='px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-green-500 hover:scale-105'>
                        Add Coupon
                    </Link>
                </div>
                    </div>
                </div>
            </div>


        </>

    )
}

export default Page
