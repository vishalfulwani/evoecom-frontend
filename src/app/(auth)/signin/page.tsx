
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import Link from "next/link";
import axios from "axios";

const signInSchema = z.object({
    email: z.string().email("Please enter a valid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const Page = () => {

    const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };
    const router = useRouter()

    const onSubmit = async (data: SignInFormData) => {
        setIsSubmitting(true)
        const platform = 'ecommerce';
        try {

        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
            platform
        })

        console.log("*************",data.email,data.password)

        console.log("resultt",result)

        if (result?.error) {
            if (result?.error == 'CredentialsSignin') {
                console.log("=********=")
                toast.error('Incorrect email or password');
                console.log("incorecttt")
                setIsSubmitting(false)
            }
            else {
                toast.error('Signin Failed');
                setIsSubmitting(false)
                console.log("incorecttfaileddt")
            }
        }
        if (result?.url) {
            toast.success('Signin Successfully');
            router.replace('/')
            setIsSubmitting(false)
        }
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'Signin failed. Please try again.';
            toast.error(errorMessage);
        } else {
            toast.error('An unexpected error occurred.');
        }
        setIsSubmitting(false);
    }
    }

    return (

        <div className="page-wrapper">
            <div className="page-content">
                <section className="py-3 border-bottom d-none d-md-flex">
                    <div className="container">
                        <div className="page-breadcrumb d-flex align-items-center">
                            <h3 className="breadcrumb-title pe-3">Sign in</h3>
                            <div className="ms-auto">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0 p-0">
                                        <li className="breadcrumb-item"><a href=";"><i className="bx bx-home-alt"></i> Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href=";">Authentication</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Sign In</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="">
                    <div className="container">
                        <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
                            <div className="row row-cols-1 row-cols-xl-2">
                                <div className="col mx-auto">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="border p-4 rounded">
                                                <div className="text-center">
                                                    <h3 className="">Sign in</h3>
                                                    <p>Don&apos;t have an account yet? <a href="/signup">Sign up here</a>
                                                    </p>
                                                </div>
                                                <div className="d-grid">
                                                    <a className="btn my-4 shadow-sm btn-light" href=";"> <span className="d-flex justify-content-center align-items-center">
                                                        <img className="me-2" src="assets/images/icons/search.svg" width="16" alt="Image Description" />
                                                        <span>Sign in with Google</span>
                                                    </span>
                                                    </a> <a href=";" className="btn btn-light"><i className="bx bxl-facebook"></i>Sign in with Facebook</a>
                                                </div>
                                                <div className="login-separater text-center mb-4"> <span>OR SIGN IN WITH EMAIL</span>
                                                    <hr />
                                                </div>
                                                <div className="form-body">
                                                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
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
                                                        <div className="col-md-6">
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                                                                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Remember Me</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 text-end">
                                                            <Link href="/forgot-password">
                                                                Forgot Password?
                                                            </Link>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="d-grid">
                                                                <button type="submit" className="btn btn-light" disabled={isSubmitting}>
                                                                    <i className="bx bxs-lock-open"></i>
                                                                    {isSubmitting ? 'Submitting...' : 'Sign In'}
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

    )
}
export default Page
