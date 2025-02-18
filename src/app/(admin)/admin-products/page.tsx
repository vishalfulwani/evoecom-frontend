
'use client'

import { ApiResponse } from '@/helpers/ApiResponse'
import { IProduct } from '@/models/product.models'
import axios, { AxiosError } from 'axios'
import mongoose from 'mongoose'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'



function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])


    // product delete
    const onDelete = async (productId: mongoose.Types.ObjectId) => {
        try {
            setIsDeleting(true)
            console.log(productId)
            const response = await axios.post<ApiResponse>('/api/admin/delete-product', {
                productId: productId
            })
            toast.success(response.data.message)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast.success(errorMessage)

        }
        finally {
            setIsDeleting(false)
        }
    }


    // Api data fetch
    useEffect(() => {
        const fetchProducts = async () => {
            setIsSubmitting(true)
            try {
                const allProducts = await axios.get<ApiResponse>('/api/get-products')
                const productData = allProducts.data.data as IProduct[]
                setProducts(productData)
            } catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                setIsSubmitting(false)
            }
        }

        fetchProducts()
    }, [])

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5; // Change the number based on your needs
    const filteredProducts = products.filter((product) => {
        const searchTermLower = searchTerm.toLowerCase();
        
        return (
          (product.productName && product.productName.toLowerCase().includes(searchTermLower)) ||
          (product.category && product.category.toLowerCase().includes(searchTermLower)) ||
          (product.subCategory && product.subCategory.toLowerCase().includes(searchTermLower))
        );
      });      

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



    return (
        <>
            <Head>
                <title>Admin Products - Ecommerce</title>
                <meta name="description" content="This is the product data page of Ecommerce." />
            </Head>

            <div className="app-wrapper">
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl ecom-users">
                        <div className="row g-3 mb-4 align-items-center justify-content-between">
                            <div className="col-auto">
                                <h1 className="app-page-title mb-0">Products</h1>
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
                                                        <th className="cell">Product Name</th>
                                                        <th className="cell">Product Description</th>
                                                        <th className="cell">Product Category</th>
                                                        <th className="cell">Images</th>
                                                        <th className="cell">Price</th>
                                                        <th className="cell">Selling Price</th>
                                                        <th className="cell">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                     {paginatedProducts.map((product, index) => (
                                            <tr
                                                key={product._id.toString()}
                                            >
                                                <td className="py-4 px-6">{product.productName}</td>
                                                <td className="py-4 px-6">{product.productDesc}</td>
                                                <td className="py-4 px-6">{product.category}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex gap-3 items-center">
                                                        {product.images.map((image, index) => (
                                                            <img src={image} alt={`Product image ${index}`} key={index} className="h-8 w-12 rounded shadow-md" />
                                                        ))}
                                                    </div>
                                                </td>
                                                        <td className="cell"><span className="truncate">{product.price}</span></td>
                                                        <td className="cell"><span className="truncate">{product.sellingPrice}</span></td>
                                                        <td className="cell delete">
                                                        <button
                                                        type="button"
                                                        disabled={isDeleting}
                                                        onClick={() => onDelete(product._id)}
                                                        className={`px-4 py-2 rounded-full shadow-md font-semibold text-sm transition duration-300 ease-in-out ${isDeleting
                                                            ? 'bg-gray-300 text-gray-600'
                                                            : 'bg-red-600 text-white hover:bg-red-400 hover:scale-105'
                                                            }`}
                                                    >Delete
                                                        
                                                    </button>
                                                        </td>

                                              
                                                   
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
                                            <button className="page-link" 
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            >Previous</button>
                                        </li>
                                        <li className="page-item "><a className="page-link" >{currentPage}</a></li>
                                        <li className="page-item">
                                            <button className="page-link" 
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                disabled={currentPage === Number(totalPages)}
                                            >Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                )}
                    </div>
                </div>
                <div className='container mb-6 flex justify-center'>
                    <Link href="/admin-products/add-product" className='px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-green-500 hover:scale-105'>
                        Add Product
                    </Link>
                </div>
            </div>



        </>
    )
}
export default Page

