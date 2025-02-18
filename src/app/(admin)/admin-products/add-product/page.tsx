
// 'use client'

// import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { ApiResponse } from '@/helpers/ApiResponse'
// import axios, { AxiosError } from 'axios'
// import Head from 'next/head'
// import React, { useEffect, useState } from 'react'
// import { Controller, useForm } from 'react-hook-form'
// import { toast } from 'react-toastify'



// function Page() {
//     const [isCreated, setIsCreated] = useState(false)

//     // category and subcategory
//  const categories = [
//     { value: 'bags', label: 'Bags' },
//     { value: 'shirts', label: 'Shirts' },
//     { value: 'tshirts', label: 'T-Shirts' },
//     { value: 'pants', label: 'Pants' },
//     { value: 'jackets', label: 'Jackets' },
//     { value: 'shoes', label: 'Shoes' },
//     { value: 'accessories', label: 'Accessories' },
// ];

// const subCategories: Record<string, { value: string; label: string }[]> = {
//     bags: [],
//     shirts: [],
//     tshirts: [],
//     pants: [],
//     jackets: [],
//     shoes: [],
//     accessories: [],
// };


//     const [selectedCategory, setSelectedCategory] = useState<string>('');
//     const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

//     const handleCategoryChange = (value: string) => {
//         setSelectedCategory(value);
//         setSelectedSubCategory('');
//     };



//     interface ProductFormValues {
//         productName: string;
//         productDesc?: string;
//         price: string;
//         images: File[];
//         sellingPrice: string;
//         category: string;
//         subCategory: string;
//     }



//     const form = useForm<ProductFormValues>({
//         defaultValues: {
//             productName: '',
//             productDesc: '',
//             price: '',
//             images: [],
//             category: '',
//             subCategory: '',
//             sellingPrice: '',

//         }
//     })

//     // product form submit
//     const onSubmit = async (data: any) => {
//         setIsCreated(true)
//         try {
//             const formData = new FormData()
//             formData.append('productName', data.productName)
//             formData.append('productDesc', data.productDesc || '')
//             formData.append('price', data.price)
//             formData.append('sellingPrice', data.sellingPrice)
//             formData.append('category', selectedCategory)
//             formData.append('subCategory', selectedSubCategory)

//             data.images.forEach((file: File) => {
//                 formData.append('images', file)
//             })


//             const response = await axios.post<ApiResponse>('/api/admin/add-product', formData)
//             toast.success(response.data.message)
//             setIsCreated(false)
//             form.reset()
//         } catch (error) {
//             const axiosError = error as AxiosError<ApiResponse>
//             let errorMessage = axiosError.response?.data.message
//             toast(errorMessage || "Product add failed")
//             setIsCreated(false)
//         }
//     }



//     return (
//         <>
//             <Head>
//                 <title>Add Products - Ecommerce</title>
//                 <meta name="description" content="This is the product adding page of Ecommerce." />
//             </Head>
//             <div>


//                 <div className="container mx-auto px-6 py-10 mt-16">
//                     <h1 className="text-3xl font-bold leading-tight mb-4">Add Product</h1>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                             <FormField
//                                 control={form.control}
//                                 name="productName"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Product Name</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Product Name" {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />

//                             <FormField
//                                 control={form.control}
//                                 name="productDesc"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Product Desc</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Product Description" {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />



//                             <FormField
//                                 name="category"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Category</FormLabel>
//                                         <FormControl>
//                                             <Select
//                                                 value={selectedCategory}
//                                                 onValueChange={handleCategoryChange}
//                                             >
//                                                 <SelectTrigger>
//                                                     <SelectValue placeholder="Select a category" />
//                                                 </SelectTrigger>
//                                                 <SelectContent>

//                                                     {categories.map((category) => (
//                                                         <SelectItem key={category.value} value={category.value}>
//                                                             {category.label}
//                                                         </SelectItem>
//                                                     ))}
//                                                 </SelectContent>
//                                             </Select>
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />

//                             {selectedCategory && (
//                                 <FormField
//                                     name="subCategory"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Subcategory</FormLabel>
//                                             <FormControl>
//                                                 <Select
//                                                     value={selectedSubCategory}
//                                                     onValueChange={(value) => setSelectedSubCategory(value)}
//                                                 >
//                                                     <SelectTrigger>
//                                                         <SelectValue placeholder="Select a subcategory" />
//                                                     </SelectTrigger>
//                                                     <SelectContent>

//                                                         {subCategories[selectedCategory]?.map((subCategory) => (
//                                                             <SelectItem key={subCategory.value} value={subCategory.value}>
//                                                                 {subCategory.label}
//                                                             </SelectItem>
//                                                         ))}
//                                                     </SelectContent>
//                                                 </Select>
//                                             </FormControl>
//                                         </FormItem>
//                                     )}
//                                 />
//                             )}

//                             <FormField
//                                 control={form.control}
//                                 name="images"
//                                 render={({ field }) => (
//                                     <FormField
//                                         control={form.control}
//                                         name="images"
//                                         render={({ field }) => (
//                                             <FormItem>
//                                                 <FormLabel>Images</FormLabel>
//                                                 <FormControl>
//                                                     <div className="space-y-2">
//                                                         {[0, 1, 2, 3].map((index) => (
//                                                             <Input
//                                                                 key={index}
//                                                                 type="file"
//                                                                 onChange={(e) => {
//                                                                     const files = e.target.files;
//                                                                     if (files && files.length > 0) {
//                                                                         const updatedImages = [...(field.value || [])];
//                                                                         updatedImages[index] = files[0] || '';
//                                                                         form.setValue('images', updatedImages); // Update form state
//                                                                     }
//                                                                 }}
//                                                             />
//                                                         ))}
//                                                     </div>
//                                                 </FormControl>
//                                             </FormItem>
//                                         )}
//                                     />
//                                 )}
//                             />

//                             <FormField
//                                 control={form.control}
//                                 name="price"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Price</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Price" {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />

//                             <FormField
//                                 control={form.control}
//                                 name="sellingPrice"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Selling Price</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Selling Price" {...field} />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />

//                             <Button type="submit" disabled={isCreated} className="button-green button hover:bg-transparent">
//                                 {isCreated ? (
//                                     <>
//                                         Please Wait...
//                                     </>
//                                 ) : ('Add Product')}
//                             </Button>
//                         </form>
//                     </Form>
//                 </div>




//             </div>
//         </>

//     )
// }

// export default Page















'use client'

import axios, { AxiosError } from 'axios'
import Head from 'next/head'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function Page() {
    const [isCreated, setIsCreated] = useState(false)

    // category and subcategory
    const categories = [
        { value: 'bags', label: 'Bags' },
        { value: 'shirts', label: 'Shirts' },
        { value: 'tshirts', label: 'T-Shirts' },
        { value: 'pants', label: 'Pants' },
        { value: 'jackets', label: 'Jackets' },
        { value: 'shoes', label: 'Shoes' },
        { value: 'accessories', label: 'Accessories' },
    ];

    const subCategories: Record<string, { value: string; label: string }[]> = {
        bags: [],
        shirts: [],
        tshirts: [],
        pants: [],
        jackets: [],
        shoes: [],
        accessories: [],
    };

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        setSelectedSubCategory('');
    };

    const [formValues, setFormValues] = useState({
        productName: '',
        fullProductName: '',
        productDesc: '',
        price: '',
        images: [] as File[],
        sellingPrice: '',
        category: '',
        sizes: '',
        availableColors: '',
        moreProductInfo: '',
    });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormValues((prevValues) => ({
    //         ...prevValues,
    //         [name]: value,
    //     }));
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const updatedImages = [...formValues.images];
            updatedImages[index] = files[0];
            setFormValues((prevValues) => ({
                ...prevValues,
                images: updatedImages,
            }));
        }
    };

    // product form submit

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreated(true);

        try {
            const formData = new FormData();
            formData.append("productName", formValues.productName);
            formData.append("fullProductName", formValues.fullProductName);
            formData.append("productDesc", formValues.productDesc || "");
            formData.append("price", formValues.price);
            formData.append("sellingPrice", formValues.sellingPrice);
            formData.append("category", selectedCategory); // Make sure this comes from a valid state
            formData.append("sizes", formValues.sizes); // Make sure this comes from a valid state
            formData.append("availableColors", formValues.availableColors); // Make sure this comes from a valid state
            formData.append("moreProductInfo", formValues.moreProductInfo); // Make sure this comes from a valid state

            console.log("jjjjjjjjjj", formData, formData.get('price'))
            // Append images to formData
            formValues.images.forEach((file) => {
                formData.append("images", file);
            });

            // Make the API request with FormData
            const response = await axios.post("/api/admin/add-product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensure this header is set when sending form data
                },
            });

            toast.success("Product added Successfully");
            setIsCreated(false);

            //   Reset form values
            setFormValues({
                productName: "",
                fullProductName: "",
                productDesc: "",
                price: "",
                images: [] as File[],
                sellingPrice: "",
                category: "",
                sizes: "",
                availableColors: "",
                moreProductInfo: "",
            });
        } catch (error) {
            const axiosError = error as AxiosError;

            // Check if the error has a response and log it
            const errorMessage = "Product add Error";
            toast.error(errorMessage);

            setIsCreated(false);
        }
    };

    return (
        <>
            <Head>
                <title>Add Products - Ecommerce</title>
                <meta name="description" content="This is the product adding page of Ecommerce." />
            </Head>

            <div className="app-wrapper">
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl ecom-users">
                        <div className="row g-3 mb-4 align-items-center justify-content-between">
                            <div className="col-auto">
                                <h1 className="app-page-title mb-0">Add product</h1>
                            </div>
                        </div>

                        <div className="app-card app-card-settings shadow-sm p-4">
                            <div className="app-card-body">
                                <form onSubmit={onSubmit} >
                                    <div className="form-group mb-3">
                                        <label htmlFor="productName" className="form-label">Product Name</label>
                                        <input type="text" className="form-control" id="productName" name="productName" placeholder="Product Name" required
                                            value={formValues.productName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="fullProductName" className="form-label">Full Product Name</label>
                                        <input type="text" className="form-control" id="fullProductName" name="fullProductName" placeholder="Full Product Name" required
                                            value={formValues.fullProductName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="productDesc" className="form-label">Product Description</label>
                                        <input type="text" className="form-control" id="productDesc" name="productDesc" placeholder="Product Description" required
                                            value={formValues.productDesc}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select className="form-control" id="category" name="category"
                                            value={selectedCategory}
                                            onChange={(e) => handleCategoryChange(e.target.value)}
                                        >
                                            <option value="" disabled>Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.value} value={category.value}>
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label">Images</label>
                                        <div className="space-y-3">
                                            {[0, 1, 2, 3].map((index) => (
                                                <input
                                                    key={index}
                                                    type="file"
                                                    onChange={(e) => handleFileChange(e, index)}
                                                    className="form-control"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input type="text" className="form-control" id="price" name="price" placeholder="Price" required
                                            value={formValues.price}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="sellingPrice" className="form-label">Selling Price</label>
                                        <input type="text" className="form-control" id="sellingPrice" name="sellingPrice" placeholder="Selling Price" required
                                            value={formValues.sellingPrice}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="sizes" className="form-label">Sizes</label>
                                        <input type="text" className="form-control" id="sizes" required
                                            name="sizes"
                                            value={formValues.sizes}
                                            onChange={handleChange}
                                            placeholder="Sizes"
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="availableColors" className="form-label">Available Colors</label>
                                        <input type="text" className="form-control" id="availableColors" required
                                            name="availableColors"
                                            value={formValues.availableColors}
                                            onChange={handleChange}
                                            placeholder="Available Colors"
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="moreProductInfo" className="form-label">Additional Info</label>
                                        <input type="text" className="form-control" id="moreProductInfo" required
                                            name="moreProductInfo"
                                            value={formValues.moreProductInfo}
                                            onChange={handleChange}
                                            placeholder="Additional information about the product"
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary" disabled={isCreated}>
                                        {isCreated ? 'Please Wait...' : 'Add Product'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Page;
