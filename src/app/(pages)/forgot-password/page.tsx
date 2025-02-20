'use client' 
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from "next/link";
import { API_BASE_URL } from "../../../../constants";

const forgetPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email").min(1, "Email is required"),
    // oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    // newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type ForgotPasswordFormData = z.infer<typeof forgetPasswordSchema>;

const Page = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgetPasswordSchema),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsSubmitting(true);
        try {
            // const response = await axios.post('/api/forgot-password', data, {
            const response = await axios.post(`${API_BASE_URL}/forgot-password`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            toast.success('Check Your Email');
            setIsSubmitting(false);
        } catch (error) {
            toast.error('Incorrect Error');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-wrapper1">
            <div className="page-content">
                <section className="py-3 border-bottom d-none d-md-flex">
                    <div className="container">
                        <div className="page-breadcrumb d-flex align-items-center">
                            <h3 className="breadcrumb-title pe-3">Forgot Password</h3>
                            <div className="ms-auto">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0 p-0">
                                        <li className="breadcrumb-item"><a href="/"><i className="bx bx-home-alt"></i> Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/signin">Authentication</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Forgot Password</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="">
                    <div className="container">
                        <div className="authentication-forgot d-flex align-items-center justify-content-center">
                            <div className="card forgot-box">
                                <div className="card-body">
                                    <div className="p-4 rounded  border">
                                        <div className="text-center">
                                            <img src="assets/images/icons/forgot-2.png" width="120" alt="" />
                                        </div>
                                        <h4 className="mt-5 font-weight-bold">Forgot Password?</h4>
                                        <p className="">Enter your registered email ID to reset the password</p>
                                        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="col-12">
                                                <label htmlFor="inputEmailAddress" className="form-label">Email Id</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="inputEmailAddress"
                                                    placeholder="Enter Email"
                                                    {...control.register("email")}
                                                />
                                                {errors.email && <span>{errors.email.message}</span>}
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <button type="submit" className="btn btn-light" disabled={isSubmitting}>
                                                        <i className="bx bx-user"></i>
                                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                                    </button>
                                                    <Link href="signin" className="btn mt-3 btn-light ">
                                                        <i className="bx bx-arrow-back me-1"></i>Back to Login
                                                    </Link>
                                                </div>
                                            </div>
                                        </form>

                                        {/* <div className="my-4">
                                        <label className="form-label">Email id</label>
                                        <input type="text" className="form-control form-control-lg" placeholder="example@user.com"/>
                                    </div> */}
                                    
                                    </div>
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
