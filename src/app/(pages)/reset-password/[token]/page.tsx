
'use client'
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from "next/link";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "../../../../../constants";

// Zod validation schema
const forgetPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email").min(1, "Email is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type ResetPasswordFormData = z.infer<typeof forgetPasswordSchema>;

const Page = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(forgetPasswordSchema),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const params = useParams<{ token: string }>();

    const onSubmit = async (data: ResetPasswordFormData) => {
        setIsSubmitting(true);
        try {
            // const response = await axios.post('/api/reset-password',{ 
            const response = await axios.post(`${API_BASE_URL}/reset-password`,{ 
                token:params?.token,
                email:data.email,
                newPassword : data.newPassword,
                confirmPassword : data.confirmPassword,
            });
            console.log(response);
            toast.success('New Password Modified');
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error submitting the form:', error);
            toast.error('Password Change Failed');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-wrapper1">
            <div className="page-content">
                <section className="py-3 border-bottom d-none d-md-flex">
                    <div className="container">
                        <div className="page-breadcrumb d-flex align-items-center">
                            <h3 className="breadcrumb-title pe-3">Reset Password</h3>
                            <div className="ms-auto">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0 p-0">
                                        <li className="breadcrumb-item">
                                            <Link href="/"><i className="bx bx-home-alt"></i> Home</Link>
                                        </li>
                                        <li className="breadcrumb-item">Authentication</li>
                                        <li className="breadcrumb-item active" aria-current="page">Forgot Password</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="authentication-forgot d-flex align-items-center justify-content-center">
                            <div className="card forgot-box">
                                <div className="card-body">
                                    <div className="p-4 rounded border">
                                        <div className="text-center">
                                            <img src="assets/images/icons/forgot-2.png" width="120" alt="" />
                                        </div>
                                        <h4 className="mt-5 font-weight-bold">Reset Password?</h4>
                                        <p>Enter your registered email ID to reset the password</p>

                                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                            <div className="my-4">
                                                <label className="form-label">Email id</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="example@user.com"
                                                    {...control.register("email")}
                                                />
                                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                            </div>

                                            <div className="my-4">
                                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter New Password"
                                                    {...control.register("newPassword")}
                                                />
                                                {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}
                                            </div>

                                            <div className="my-4">
                                                <label htmlFor="oldPassword" className="form-label">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    placeholder="Confirm Password"
                                                    {...control.register("confirmPassword")}
                                                />
                                                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                                            </div>


                                            <div className="d-grid gap-2">
                                                <button type="submit" className="btn btn-light btn-lg" disabled={isSubmitting}>
                                                    {isSubmitting ? "Submitting..." : "Send"}
                                                </button>
                                                <Link href="/signin" className="btn btn-light btn-lg">
                                                    <i className="bx bx-arrow-back me-1"></i> Back to Login
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Page;
