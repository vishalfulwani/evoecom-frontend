'use client'

import { ApiResponse } from '@/helpers/ApiResponse'
import { IUser } from '@/models/user.models'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'


function page() {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            setIsSubmitting(true)
            try {
                const allUsers = await axios.get<ApiResponse>('/api/get-users')
                const userData = allUsers.data.data as []
                setUsers(userData)
            } catch (error) {
                console.error("Error fetching users:", error)
            } finally {
                setIsSubmitting(false)
            }
        }

        fetchUsers()
    }, [])



    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filtered users based on search term
    const filteredUsers = users.filter(
        (user) =>
            user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );



    //   pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
                <title>Admin users </title>
                <meta name="description" content="This is the users data of ecommerce." />
            </Head>

            <div className="app-wrapper">
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl ecom-users">
                        <div className="row g-3 mb-4 align-items-center justify-content-between">
                            <div className="col-auto">
                                <h1 className="app-page-title mb-0">Ecommerce Users</h1>
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
                                                    <button type="submit" className="btn ">Search</button>
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
                                                        <th className="cell">User Name</th>
                                                        <th className="cell">Email</th>
                                                        <th className="cell">Varified</th>
                                                        <th className="cell">Role</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentUsers.map((user, index) => (
                                                        <tr
                                                            key={user._id.toString()}

                                                        >

                                                            <td className="cell">{user.userName}</td>
                                                            <td className="cell"><span className="truncate">{user.email}</span></td>
                                                            <td className="cell">
                                                                <span
                                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isVerified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                                                        }`}
                                                                >
                                                                    {user.isVerified ? 'True' : 'False'}
                                                                </span>

                                                            </td>
                                                            <td className="cell">{user.role}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <nav className="app-pagination">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item disabled">
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
                                                    <tr>
                                                        <td className="cell">#15344</td>
                                                        <td className="cell"><span className="truncate">Pellentesque diam imperdiet</span></td>
                                                        <td className="cell">Teresa Holland</td>
                                                        <td className="cell"><span className="cell-data">16 Oct</span><span className="note">01:16 AM</span></td>
                                                        <td className="cell"><span className="badge bg-success">Paid</span></td>
                                                        <td className="cell">$123.00</td>
                                                        <td className="cell"><a className="btn-sm bg-success" href="#">View</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="cell">#15343</td>
                                                        <td className="cell"><span className="truncate">Vestibulum a accumsan lectus sed mollis ipsum</span></td>
                                                        <td className="cell">Jayden Massey</td>
                                                        <td className="cell"><span className="cell-data">15 Oct</span><span className="note">8:07 PM</span></td>
                                                        <td className="cell"><span className="badge bg-success">Paid</span></td>
                                                        <td className="cell">$199.00</td>
                                                        <td className="cell"><a className="btn-sm bg-success" href="#">View</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="cell">#15341</td>
                                                        <td className="cell"><span className="truncate">Morbi vulputate lacinia neque et sollicitudin</span></td>
                                                        <td className="cell">Raymond Atkins</td>
                                                        <td className="cell"><span className="cell-data">11 Oct</span><span className="note">11:18 AM</span></td>
                                                        <td className="cell"><span className="badge bg-success">Paid</span></td>
                                                        <td className="cell">$678.26</td>
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
                                                        <td className="cell">#15342</td>
                                                        <td className="cell"><span className="truncate">Cras euismod faucibus sapien sit amet lacinia ante</span></td>
                                                        <td className="cell">Mason Lane</td>
                                                        <td className="cell"><span className="cell-data">11 Oct</span><span className="note">12:35 PM</span></td>
                                                        <td className="cell"><span className="badge bg-warning">Pending</span></td>
                                                        <td className="cell">$399.00</td>
                                                        <td className="cell"><a className="btn-sm bg-success" href="#">View</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                )}
                    </div>
                </div>
            </div>


        </>

    )
}

export default page
