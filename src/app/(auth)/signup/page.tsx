
'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from "next/link";
import { signIn } from "next-auth/react";
import { APP_BASE_URL } from "../../../../constants";

// Zod validation schema
const signUpSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Please enter a valid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    country: z.string().min(1, "Please select a country"),
    agree: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const Page = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    // Handle form submission
    const onSubmit = async (data: SignUpFormData) => {
        setIsSubmitting(true);
        try {
            // const response = await axios.post(`${APP_BASE_URL}/signup`, data, {
            const response = await axios.post(`/api/signup`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            // const name = response.data.data.firstName.toLowerCase();
            const name = response.data.data.email;
            router.replace(`/verify/${name}`);
            toast.success('Check Email for Verify Code');
            setIsSubmitting(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
                toast.error(errorMessage);
            } else {
                toast.error('An unexpected error occurred.');
            }
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-wrapper1">
            <div className="page-content">
                <section className="py-3 border-bottom d-none d-md-flex">
                    <div className="container">
                        <div className="page-breadcrumb d-flex align-items-center">
                            <h3 className="breadcrumb-title pe-3">Sign Up</h3>
                            <div className="ms-auto">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0 p-0">
                                        <li className="breadcrumb-item"><a href=";"><i className="bx bx-home-alt"></i> Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href=";">Authentication</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Sign Up</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                {/* The rest of the layout */}
                <section className="py-0 py-lg-5">
                    <div className="container">
                        <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
                            <div className="row row-cols-1 row-cols-lg-1 row-cols-xl-2">
                                <div className="col mx-auto">
                                    <div className="card mb-0">
                                        <div className="card-body">
                                            <div className="border p-4 rounded">
                                                <div className="text-center">
                                                    <h3 className="">Sign Up</h3>
                                                    <p>Already have an account? <Link href="/signin">Sign in here</Link></p>
                                                </div>
                                                <div className="d-grid">
                                                    <div className="btn my-4 shadow-sm btn-light" onClick={() => signIn("google")}> <span className="d-flex justify-content-center align-items-center">
                                                        <img className="me-2" src="assets/images/icons/search.svg" width="16" alt="Image Description" />
                                                        <span>Sign Up with Google</span>
                                                    </span>
                                                    </div>
                                                    <div onClick={() => signIn("facebook")} className="btn btn-light">
                                                        <i className="bx bxl-facebook"></i>
                                                        Sign Up with Facebook
                                                    </div>
                                                </div>
                                                <div className="login-separater text-center mb-4">
                                                    <span>OR SIGN UP WITH EMAIL</span>
                                                    <hr />
                                                </div>
                                                <div className="form-body">
                                                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="col-sm-6">
                                                            <label htmlFor="inputFirstName" className="form-label">First Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="inputFirstName"
                                                                {...control.register("firstName")}
                                                            />
                                                            {errors.firstName && <span>{errors.firstName.message}</span>}
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label htmlFor="inputLastName" className="form-label">Last Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="inputLastName"
                                                                {...control.register("lastName")}
                                                            />
                                                            {errors.lastName && <span>{errors.lastName.message}</span>}
                                                        </div>
                                                        <div className="col-12">
                                                            <label htmlFor="inputEmailAddress" className="form-label">Email Address</label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                id="inputEmailAddress"
                                                                {...control.register("email")}
                                                            />
                                                            {errors.email && <span>{errors.email.message}</span>}
                                                        </div>
                                                        <div className="col-12">
                                                            <label htmlFor="inputChoosePassword" className="form-label">Password</label>
                                                            <div className="input-group" id="show_hide_password">
                                                                <input
                                                                    type={isPasswordVisible ? "text" : "password"}
                                                                    className="form-control border-end-0"
                                                                    id="inputChoosePassword"
                                                                    {...control.register("password")}
                                                                />
                                                                <div

                                                                    className="input-group-text bg-transparent"
                                                                    onClick={togglePasswordVisibility}
                                                                >
                                                                    <i className={`bx ${isPasswordVisible ? "bx-show" : "bx-hide"}`}></i>
                                                                </div>
                                                            </div>
                                                            {errors.password && <span>{errors.password.message}</span>}
                                                        </div>
                                                        <div className="col-12">
                                                            <label htmlFor="inputSelectCountry" className="form-label">Country</label>
                                                            <select
                                                                className="form-select"
                                                                id="inputSelectCountry"
                                                                {...control.register("country")}
                                                            >
                                                                <option value="India">India</option>
                                                                <option value="1">United Kingdom</option>
                                                                <option value="2">America</option>
                                                                <option value="3">Dubai</option>
                                                            </select>
                                                            {errors.country && <span>{errors.country.message}</span>}
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="flexSwitchCheckChecked"
                                                                    {...control.register("agree")}
                                                                />
                                                                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                                                    I read and agree to Terms &amp; Conditions &nbsp;
                                                                </label>
                                                                {errors.agree && <span>{errors.agree.message}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="d-grid">
                                                                <button type="submit" className="btn btn-light" disabled={isSubmitting}>
                                                                    <i className="bx bx-user"></i> 
                                                                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Page;

