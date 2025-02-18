
'use client'

import { ApiResponse } from "@/helpers/ApiResponse"
import { IProduct } from "@/models/product.models"
import axios from "axios"
import { useEffect, useState } from "react"
import { APP_BASE_URL } from "../../../../constants"
import ProductCard from "@/components/ProductCard/page"
import Link from "next/link"


const Page = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
const [categoryCount, setCategoryCount] = useState<{ category: string; items: number }[]>([]);
const [sortCriteria, setSortCriteria] = useState<string>('default');
const [itemsPerPage, setItemsPerPage] = useState<number>(9);
const [currentPage, setCurrentPage] = useState<number>(1);
const [totalPages, setTotalPages] = useState<number>(1);

const [minPrice, setMinPrice] = useState<number>(200);
const [maxPrice, setMaxPrice] = useState<number>(900);
const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

useEffect(() => {
    const fetchProducts = async () => {
        try {
            const allProducts = await axios.get<ApiResponse>(`${APP_BASE_URL}/get-products`);
            const productData = allProducts.data.data as IProduct[];
            setProducts(productData);

            // Count products per category
            const categoryMap: { [key: string]: number } = {};
            productData.forEach((product: any) => {
                const category = product.category;
                if (categoryMap[category]) {
                    categoryMap[category] += 1;
                } else {
                    categoryMap[category] = 1;
                }
            });

            const categoryArray = Object.keys(categoryMap).map((category) => ({
                category,
                items: categoryMap[category],
            }));

            setCategoryCount(categoryArray);

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    fetchProducts();
}, []);

// Sorting function based on criteria
const sortProducts = (criteria: string, data: any[]) => {
    switch (criteria) {
        case 'default':
            return data.sort(() => Math.random() - 0.5);
        case 'priceHighToLow':
            return data.sort((a, b) => a.sellingPrice - b.sellingPrice);
        case 'priceLowToHigh':
            return data.sort((a, b) => b.sellingPrice - a.sellingPrice);
        case 'averageRating':
            return data.sort((a, b) => b.rating - a.rating);
        case 'popularity':
            return data.sort((a, b) => b.popularity - a.popularity);
        case 'newness':
            return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
    setCurrentPage(1); // Reset to first page when items per page is changed
};

// Handle pagination (change page)
const handlePageChange = (page: number) => {
    setCurrentPage(page);
};

// Filter products by price range
const handlePriceFilter = (products: IProduct[], minPrice: number, maxPrice: number) => {
    return products.filter(
        (product) => Number(product.sellingPrice) >= minPrice && Number(product.sellingPrice) <= maxPrice
    );
};

// Apply all filters (price filter + sorting + pagination)
const applyFilters = () => {
    let filtered = handlePriceFilter(products, minPrice, maxPrice);

    // Apply sorting
    filtered = sortProducts(sortCriteria, filtered);

    setFilteredProducts(filtered);
    setIsFilterApplied(true);
};

// Paginate products based on items per page and current page
const paginateProducts = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.slice(start, end);
};

// Calculate total pages
useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
}, [filteredProducts, itemsPerPage]);

useEffect(() => {
    applyFilters();
}, [products, minPrice, maxPrice, sortCriteria]);

// In your JSX, you would use `paginateProducts` to display the products on the current page
// Display the filtered and paginated products
const displayProducts = paginateProducts();

    return (
        <div className="page-wrapper1">
            <div className="page-content">
                <section className="py-3 border-bottom d-none d-md-flex">
                    <div className="container">
                        <div className="page-breadcrumb d-flex align-items-center">
                            <h3 className="breadcrumb-title pe-3">Shop Grid Left Sidebar</h3>
                            <div className="ms-auto">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0 p-0">
                                        <li className="breadcrumb-item"><a href="/"><i className="bx bx-home-alt"></i> Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/shop">Shop</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Shop Left Sidebar</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-xl-3">
                                <div className="btn-mobile-filter d-xl-none"><i className="bx bx-slider-alt"></i>
                                </div>
                                <div className="filter-sidebar d-none d-xl-flex">
                                    <div className="card rounded-0 w-100">
                                        <div className="card-body">
                                            <div className="align-items-center d-flex d-xl-none">
                                                <h6 className="text-uppercase mb-0">Filter</h6>
                                                <div className="btn-mobile-filter-close btn-close ms-auto cursor-pointer"></div>
                                            </div>
                                            <hr className="d-flex d-xl-none" />
                                            <div className="product-categories">
                                                <h6 className="text-uppercase mb-3">Categories</h6>
                                                <ul className="list-unstyled mb-0 categories-list">

                                                    {categoryCount.map((category) => (
                                                        <li key={category.category}>
                                                            <Link href={`/shop/${category.category}`} >  {category.category.charAt(0).toUpperCase() + category.category.slice(1)}<span className="float-end badge rounded-pill bg-light">{category.items}</span></Link>
                                                        </li>
                                                    ))}

                                                </ul>
                                            </div>
                                            <hr />
                                            <div className="price-range">
                                                <h6 className="text-uppercase mb-3">Price</h6>
                                                <div className="my-4 noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr" id="slider">
                                                    <div className="noUi-base">
                                                        <div className="noUi-connects">
                                                            <div className="noUi-connect" style={{ "transform": "translate(20%, 0px) scale(0.6, 1);" }}>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="noUi-origin"
                                                            style={{ transform: "translate(-800%, 0px)", zIndex: 5 }}
                                                        >
                                                            <div
                                                                className="noUi-handle noUi-handle-lower"
                                                                data-handle="0"
                                                                tabIndex={0}
                                                                role="slider"
                                                                aria-orientation="horizontal"
                                                                aria-valuemin={0.0} // Number is correct
                                                                aria-valuemax={80.0} // Number is correct
                                                                aria-valuenow={20.0} // Number is correct
                                                                aria-valuetext={"20.00"} // Changed to string
                                                            >
                                                                <div className="noUi-touch-area"></div>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="noUi-origin"
                                                            style={{ transform: "translate(-200%, 0px)", zIndex: 4 }}
                                                        >
                                                            <div
                                                                className="noUi-handle noUi-handle-upper"
                                                                data-handle="1"
                                                                tabIndex={0}
                                                                role="slider"
                                                                aria-orientation="horizontal"
                                                                aria-valuemin={20.0} // Corrected to number
                                                                aria-valuemax={100.0} // Corrected to number
                                                                aria-valuenow={80.0} // Corrected to number
                                                                aria-valuetext={"80.00"} // Corrected to string
                                                            >
                                                                <div className="noUi-touch-area"></div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    {/* <button type="button" className="btn btn-white btn-sm text-uppercase rounded-0 font-13 fw-500">Filter</button> */}
                                                    {/* <div className="ms-auto">
                                                        <p className="mb-0">Price: $200.00 - $900.00</p>
                                                    </div> */}
                                                    <div className="w-full ">
                                                        <div className="d-flex  ">
                                                            {/* Price Range Label */}
                                                            <div className="mb-4">
                                                                <p className="mb-0">Price: ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}</p>
                                                            </div>
                                                        </div>

                                                        {/* Price Range Filter */}
                                                        <div className="mb-4">
                                                            <div className="flex flex-col gap-4">
                                                                <div className="flex justify-between items-center">
                                                                    <label htmlFor="minPrice" className="text-sm font-medium ">
                                                                        Min Price
                                                                    </label>
                                                                    <span className="text-sm ">${minPrice.toFixed(2)}</span>
                                                                </div>
                                                                <input
                                                                    type="range"
                                                                    id="minPrice"
                                                                    min="0"
                                                                    max="1000"
                                                                    value={minPrice}
                                                                    onChange={(e) => setMinPrice(Number(e.target.value))}
                                                                    className="form-range w-full"
                                                                />
                                                            </div>

                                                            <div className="flex justify-between items-center my-4">
                                                                <label htmlFor="maxPrice" className="text-sm font-medium ">
                                                                    Max Price
                                                                </label>
                                                                <span className="text-sm ">${maxPrice.toFixed(2)}</span>
                                                            </div>
                                                            <input
                                                                type="range"
                                                                id="maxPrice"
                                                                min="0"
                                                                max="1000"
                                                                value={maxPrice}
                                                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                                                className="form-range w-full"
                                                            />
                                                        </div>

                                                        {/* Button */}
                                                        {/* <div className="flex justify-center mt-6">
                                                            <button
                                                                onClick={applyFilters}
                                                                className="btn btn-light btn-ecomm w-full"
                                                                disabled={minPrice >= maxPrice}
                                                            >
                                                                Apply Filter
                                                            </button>

                                                        </div> */}
                                                    </div>




                                                </div>
                                            </div>
                                            <hr />
                                            {/* <div className="size-range">
                                                <h6 className="text-uppercase mb-3">Size</h6>
                                                <ul className="list-unstyled mb-0 categories-list">
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="Small" />
                                                            <label className="form-check-label" htmlFor="Small">Small</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="Medium" />
                                                            <label className="form-check-label" htmlFor="Medium">Medium</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="Large" />
                                                            <label className="form-check-label" htmlFor="Large">Large</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="ExtraLarge" />
                                                            <label className="form-check-label" htmlFor="ExtraLarge">Extra Large</label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div> */}
                                            {/* <hr /> */}
                                            {/* <div className="product-brands">
                                                <h6 className="text-uppercase mb-3">Brands</h6>
                                                <ul className="list-unstyled mb-0 categories-list">
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="Adidas" />
                                                            <label className="form-check-label" htmlFor="Adidas">Adidas (15)</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="Armani" />
                                                            <label className="form-check-label" htmlFor="Armani">Armani (26)</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="CalvinKlein" />
                                                            <label className="form-check-label" htmlFor="CalvinKlein">Calvin Klein (24)</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="Columbia" />
                                                            <label className="form-check-label" htmlFor="Columbia">Columbia (38)</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="JhonPlayers" />
                                                            <label className="form-check-label" htmlFor="JhonPlayers">Jhon Players (48)</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="Diesel" />
                                                            <label className="form-check-label" htmlFor="Diesel">Diesel (64)</label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div> */}
                                            {/* <hr /> */}
                                            <div className="product-colors">
                                                <h6 className="text-uppercase mb-3">Colors</h6>
                                                <ul className="list-unstyled mb-0 categories-list">
                                                    <li>
                                                        <div className="d-flex align-items-center cursor-pointer">
                                                            <div className="color-indigator bg-black"></div>
                                                            <p className="mb-0 ms-3">Black</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center cursor-pointer">
                                                            <div className="color-indigator bg-warning"></div>
                                                            <p className="mb-0 ms-3">Yellow</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center cursor-pointer">
                                                            <div className="color-indigator bg-danger"></div>
                                                            <p className="mb-0 ms-3">Red</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center cursor-pointer">
                                                            <div className="color-indigator bg-primary"></div>
                                                            <p className="mb-0 ms-3">Blue</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center cursor-pointer">
                                                            <div className="color-indigator bg-white"></div>
                                                            <p className="mb-0 ms-3">White</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center cursor-pointer">
                                                            <div className="color-indigator bg-success"></div>
                                                            <p className="mb-0 ms-3">Green</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-flex align-items-center cursor-pointer">
                                                            <div className="color-indigator bg-info"></div>
                                                            <p className="mb-0 ms-3">Sky Blue</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-9">
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
                                    <nav className="d-flex justify-content-between" aria-label="Page navigation">
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
                    </div>
                </section>
            </div>
        </div>
    )
}
export default Page
