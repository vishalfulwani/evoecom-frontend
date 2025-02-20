
'use client'

import { ApiResponse } from "@/helpers/ApiResponse"
import { IProduct } from "@/models/product.models"
import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "@/components/ProductCard/page"
import Link from "next/link"
import { API_BASE_URL } from "../../../../../constants"
import { useParams, useSearchParams } from "next/navigation"


const Page = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [categoryCount, setCategoryCount] = useState<{ category: string; items: number }[]>([]);
    const [sortCriteria, setSortCriteria] = useState<string>('default');
    const [itemsPerPage, setItemsPerPage] = useState<number>(9);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    
    const {category} = useParams();
    const [categoryName,setCategoryName] = useState(category)
    console.log(category,"cattt")

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await axios.get<ApiResponse>(`${API_BASE_URL}/get-products`);
                const productData = allProducts.data.data as IProduct[];
    
                // Filter products based on category
                const categoryProducts = category
                    ? productData.filter((product) => product.category === category)
                    : productData;
    
                setProducts(categoryProducts);
                setCategoryName(category)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [category]);
    
    // Sorting function
    const sortProducts = (criteria: string, data: IProduct[]) => {
        switch (criteria) {
            case 'priceLowToHigh':
                return [...data].sort((a, b) => Number(a.sellingPrice) - Number(b.sellingPrice));
            case 'priceHighToLow':
                return [...data].sort((a, b) => Number(b.sellingPrice) - Number(a.sellingPrice));
            case 'averageRating':
                return [...data].sort((a, b) => Number(b.rating) - Number(a.rating));
            case 'popularity':
                return [...data].sort((a, b) => Number(b.rating) - Number(a.rating));
            // case 'newness':
                // return [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case 'default':
            default:
                return data;
        }
    };
    
    // Handle sorting change
    const handleSortChange = (criteria: string) => {
        setSortCriteria(criteria);
    };
    
    // Handle items per page change
    const handleItemsPerPageChange = (numItems: number) => {
        setItemsPerPage(numItems);
        setCurrentPage(1); // Reset to first page when changing items per page
    };
    
    // Handle pagination (change page)
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    // Apply sorting and pagination
    useEffect(() => {
        const sortedProducts = sortProducts(sortCriteria, products);
        setFilteredProducts(sortedProducts);
    }, [products, sortCriteria]);
    
    // Paginate products
    const paginateProducts = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredProducts.slice(start, end);
    };
    
    // Calculate total pages
    useEffect(() => {
        setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
    }, [filteredProducts, itemsPerPage]);
    
    // Display paginated products
    const displayProducts = paginateProducts();
    return (
        <div className="page-wrapper1">
            <div className="page-content">
                <section className="py-3 border-bottom d-none d-md-flex">
                    <div className="container">
                        <div className="page-breadcrumb d-flex align-items-center">
                            <h3 className="breadcrumb-title pe-3"> {category}</h3>
                            <div className="ms-auto">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0 p-0">
                                        <li className="breadcrumb-item"><a href="/"><i className="bx bx-home-alt"></i> Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/shop">Shop</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">{category}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-4">
                    <div className="container">
                        <div className="row">
                                <div className="product-wrapper">
                                    <div className="toolbox d-flex align-items-center mb-3 gap-2">
                                        <div className="d-flex flex-wrap flex-grow-1 gap-1">
                                            <div className="d-flex align-items-center flex-nowrap">
                                                <p className="mb-0 font-13 text-nowrap text-white">Sort By:</p>

                                                <select className="form-select ms-3 rounded-0" onChange={(e) => handleSortChange(e.target.value)} value={sortCriteria}>
                                                    <option value="default">Default</option>
                                                    <option value="priceLowToHigh">Price: Low to High</option>
                                                    <option value="priceHighToLow">Price: High to Low</option>
                                                    <option value="averageRating">Average Rating</option>
                                                    <option value="popularity">Popularity</option>
                                                    {/* <option value="newness">Newness</option> */}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-wrap">
                                            <div className="d-flex align-items-center flex-nowrap">
                                                <p className="mb-0 font-13 text-nowrap text-white">Show:</p>
                                                <select className="form-select ms-3 rounded-0" onChange={(e) => handleItemsPerPageChange(Number(e.target.value))} value={itemsPerPage}>
                                                    <option value={9}>9</option>
                                                    <option value={12}>12</option>
                                                    <option value={16}>16</option>
                                                    <option value={20}>20</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* <div>	<a href="shop-grid-left-sidebar.html" className="btn btn-white rounded-0"><i className="bx bxs-grid me-0"></i></a>
                                        </div>
                                        <div>	<a href="shop-list-left-sidebar.html" className="btn btn-light rounded-0"><i className="bx bx-list-ul me-0"></i></a>
                                        </div> */}
                                    </div>
                                    <div className="product-grid">
                                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
                                            {displayProducts.map((product) => (
                                                <div key={product._id.toString()} className="col">
                                                    <ProductCard product={product} />
                                                </div>
                                            ))}
                                      
                                        </div>
                                    </div>
                                    <hr />
                                    {/* <nav className="d-flex justify-content-between" aria-label="Page navigation">
                                        <ul className="pagination">
                                            <li className="page-item"><a className="page-link" href=""><i className="bx bx-chevron-left"></i> Prev</a>
                                            </li>
                                        </ul>
                                        <ul className="pagination">
                                            <li className="page-item active d-none d-sm-block" aria-current="page"><span className="page-link">1<span className="visually-hidden">(current)</span></span>
                                            </li>
                                            <li className="page-item d-none d-sm-block"><a className="page-link" href="">2</a>
                                            </li>
                                            <li className="page-item d-none d-sm-block"><a className="page-link" href="">3</a>
                                            </li>
                                            <li className="page-item d-none d-sm-block"><a className="page-link" href="">4</a>
                                            </li>
                                            <li className="page-item d-none d-sm-block"><a className="page-link" href="">5</a>
                                            </li>
                                        </ul>
                                        <ul className="pagination">
                                            <li className="page-item"><a className="page-link" href="" aria-label="Next">Next <i className="bx bx-chevron-right"></i></a>
                                            </li>
                                        </ul>
                                    </nav> */}
                                    <nav className="d-flex justify-content-center" aria-label="Page navigation">
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                                                    <i className="bx bx-chevron-left"></i> Prev
                                                </button>
                                            </li>
                                        </ul>
                                        <ul className="pagination">
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => handlePageChange(index + 1)}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    aria-label="Next"
                                                >
                                                    Next <i className="bx bx-chevron-right"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>

                                </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default Page
