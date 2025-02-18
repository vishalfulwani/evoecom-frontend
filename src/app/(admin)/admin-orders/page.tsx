'use client'

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IOrder } from '@/models/order.models';
import { ApiResponse } from '@/helpers/ApiResponse';
import { IProduct } from '@/models/product.models';
import { IUser } from '@/models/user.models';

const Page = () => {

    const [ecommerceUser, setEcommerceUser] = useState("");
    const [ecommerceUserData, setEcommerceUserData] = useState<IUser[]>([]);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state for UX
    const [products, setProducts] = useState<IProduct[]>([])


    const { data: session, status } = useSession()
    let userName;
    if (session) {
        userName = session.user?.userName
    }

    //  orders 
    useEffect(() => {
        const fetchOrders = async () => {

            setIsLoading(true);
            try {
                const response = await axios.get<{ data: IOrder[] }>('/api/get-buy-order');
                const allOrders = response.data.data; // Set orders after fetching
                setOrders(allOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [status, session]);


    // fetching all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await axios.get<ApiResponse>('/api/get-products')
                const productData = allProducts.data.data as IProduct[]
                setProducts(productData)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts()
    }, [orders])

    // Ecommerce user
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await axios.get<ApiResponse>('/api/get-users')
                const userData = allUsers.data.data as []
                setEcommerceUser(userData.length.toString())
                setEcommerceUserData(userData)

            } catch (error) {
                console.error("Error fetching users:", error)
            }
        }
        fetchUsers()
    }, [])

    // getting username
    const fetchUsername = (id: any) => {
        const user = ecommerceUserData.find((data) => data._id === id);
        return user ? user.userName : 'User not found'; // Handle case if user is not found
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filtered users based on search term
    const filteredOrders = orders.filter(
        (order) =>
            order.razorpayOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fetchUsername(order.userId).toLowerCase().includes(searchTerm.toLowerCase())
    );

    //   pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

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
                <title>Admin </title>
                <meta name="description" content="This is the admin page." />
            </Head>


            <div className="app-wrapper">

                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl">
                        <div className="row g-3 mb-4 align-items-center justify-content-between">
                            <div className="col-auto">
                                <h1 className="app-page-title mb-0"> Recent Orders</h1>
                            </div>
                            <div className="col-auto">
                                <div className="page-utilities">
                                    <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                                        <div className="col-auto">
                                        </div>
                                        <div className="col-auto">
                                        </div>
                                        <div className="col-auto">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                    <>
                        Please Wait...
                    </>
                ) : (
                        <div className="app-card app-card-orders-table shadow-sm mb-5">
                            <div className="app-card-body">
                                <div className="table-responsive">
                                    <table className="table app-table-hover mb-0 text-left">
                                        <thead>
                                            <tr>
                                                <th className="cell">Order Id</th>
                                                <th className="cell">Razorpay Order Id</th>
                                                <th className="cell">Customer</th>
                                                <th className="cell">Date</th>
                                                <th className="cell">Status</th>
                                                <th className="cell">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentOrders.map((order, index) => (
                                                <tr
                                                    key={order._id?.toString()}
                                                >
                                                    <td className="cell">{order._id?.toString()}</td>
                                                    <td className="cell"><span className="truncate">{order.razorpayOrderId}</span></td>
                                                    <td className="cell">{fetchUsername(order.userId)}</td>
                                                    <td className="cell">  {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}</td>
                                                    <td className="cell">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${order.paymentStatus === 'completed'
                                                                ? 'bg-green-200 text-green-800'
                                                                : 'bg-red-200 text-red-800'
                                                                }`}
                                                        >
                                                            {order.paymentStatus}
                                                        </span>
                                                    </td>
                                                    <td className="cell">{order.totalAmount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
