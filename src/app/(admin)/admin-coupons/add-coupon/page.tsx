'use client'

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CreateCoupon = () => {
    const [formValues, setFormValues] = useState({
        code: '',
        discountPercentage: '',
        expirationDate: '',
        limit: '',
        // appliedBy: '', // Assuming this is a string, adjust accordingly based on actual input
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors and success messages
        setError('');
        setSuccessMessage('');

        try {
            const formData = new FormData();
            formData.append("code", formValues.code);
            formData.append("discountPercentage", formValues.discountPercentage);
            formData.append("expirationDate", formValues.expirationDate);
            formData.append("limit", formValues.limit);


            const response = await axios.post('/api/admin/add-coupon',
                formData
            );


            console.log(response)
            if (response) {
                setSuccessMessage('Coupon created successfully!');
                toast.success("Coupon created Successfully");
                setFormValues({
                    code: '',
                    discountPercentage: '',
                    expirationDate: '',
                    limit: '0',
                    //   appliedBy: '',
                });
            } else {
                toast.error('Failed to create coupon');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <>
         
            <div className="app-wrapper">
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl ecom-users">
                        <div className="row g-3 mb-4 align-items-center justify-content-between">
                            <div className="col-auto">
                                <h1 className="app-page-title mb-0">Add coupons</h1>
                            </div>

                        </div>

                        <div className="app-card app-card-settings shadow-sm p-4">
                            <div className="app-card-body">
                                <form onSubmit={handleSubmit} >
                                    <div className="form-group mb-3">
                                        <label htmlFor="code" className="form-label">Coupon Code</label>
                                        <input type="text" className="form-control" id="code" name="code" placeholder="Enter coupon code" 
                                         value={formValues.code}
                                         onChange={handleChange}
                                         required
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="discountPercentage" className="form-label">Discount Percentage</label>
                                        <input type="text" className="form-control" id="discountPercentage" name="discountPercentage" placeholder="Enter discount percentage"
                                         value={formValues.discountPercentage}
                                         onChange={handleChange}
                                         required />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="limit" className="form-label">Coupon Limit</label>
                                        <input type="text" className="form-control" id="limit" name="limit" placeholder="Enter coupon limit"
                                         value={formValues.limit}
                                         onChange={handleChange}
                                         required
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="expirationDate" className="form-label">Expiry Date</label>
                                        <input type="date" className="form-control" id="expirationDate" name="expirationDate" 
                                         value={formValues.expirationDate}
                                         onChange={handleChange}
                                         required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Create Coupon</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default CreateCoupon;
