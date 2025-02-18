'use client'

import { ApiResponse } from "@/helpers/ApiResponse";
import { IOrder } from "@/models/order.models";
// import { IOrder } from "@/models/order.models";
import { IProduct } from "@/models/product.models";
import { IUser } from "@/models/user.models";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { APP_BASE_URL } from "../../../../../constants";


const Page = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState<IOrder[]>([]);

    const [orderedProductsWithQuantity, setOrderedProductsWithQuantity] = useState<{ product: any; quantity: number }[]>([]);
    // const { data: session, status } = useSession();
    const [products, setProducts] = useState<IProduct[]>([])


    const { data: session, status, update } = useSession();

    useEffect(() => {
        // Example: Trigger session update whenever needed
        const refreshSession = async () => {
            await update();
        };

        refreshSession(); // Call this when you expect session data to change
    }, []);


    useEffect(() => {
        // Fetch orders only if authenticated and user ID is available
        const fetchOrders = async () => {
            if (status !== "authenticated" || !session?.user?._id) return;

            setIsLoading(true);
            try {
                // const response = await axios.get<{ data: IOrder[] }>('/api/get-buy-order', {
                const response = await axios.get<{ data: IOrder[] }>(`${APP_BASE_URL}/get-buy-order`, {
                    params: {
                        userId: session?.user?._id, // Pass userId from session
                    },
                });
                setUserId(session?.user?._id)
                const allOrders = response.data.data; // Set orders after fetching
                const userOrders = allOrders.filter(order => order.userId.toString() === session.user._id);
                setOrders(userOrders);

            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (status === "authenticated") {
            fetchOrders();
            console.log(orders)
        }
    }, [status, session]);


    // fetching all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const allProducts = await axios.get<ApiResponse>('/api/get-products')
                const allProducts = await axios.get<ApiResponse>(`${APP_BASE_URL}/get-products`)
                const productData = allProducts.data.data as IProduct[]
                setProducts(productData)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts()
    }, [orders])

    useEffect(() => {
        if (orders && products) {
            // Initialize matchedProductsWithQuantity array within the effect
            const matchedProductsWithQuantity = [] as any;

            orders.forEach((order) => {
                order.items.forEach((item: any) => {
                    // Find the matching product for each ordered item
                    const product = products.find((p) => String(p._id) === String(item.product));

                    if (product) {
                        // Push product along with its quantity to the matched array
                        matchedProductsWithQuantity.push({ product, quantity: item.quantity });
                    }
                });
            });

            // Update the state with the matched products and their quantities
            setOrderedProductsWithQuantity(matchedProductsWithQuantity);
        }
    }, [orders, products]); // Re-run when orders or products change
    // Re-run when orders or products change






    // user data
    const [user, setUser] = useState<IUser[]>([])
    const [userId, setUserId] = useState("")

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // const allUsers = await axios.get<ApiResponse>('/api/get-all-users')
                const allUsers = await axios.get<ApiResponse>(`${APP_BASE_URL}/get-users`)
                const userData = allUsers.data.data as []

                const data = userData.filter((data: any) => data._id === session?.user?._id)

                setUser(data)
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        }

        fetchUsers()
        console.log("ussser", user)
    }, [])


    return (
        <div className="card shadow-none mb-0">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {orderedProductsWithQuantity?.map((item, index) => (
                                    <tr key={index}>
                                        <td>#800</td>
                                        <td>Novermber 15, 2021</td>
                                        <td>
                                            <div className="badge rounded-pill bg-light w-100">Completed</div>
                                        </td>
                                        <td>$100.00 for 1 item</td>
                                        <td>
                                            <div className="d-flex gap-2">	<a href=";" className="btn btn-light btn-sm rounded-0">View</a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                    </tbody>
                                </table>
                        </div>
                </div>
            </div>
            )
}
            export default Page
