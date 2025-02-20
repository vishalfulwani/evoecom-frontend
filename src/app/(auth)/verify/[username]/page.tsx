
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { ApiResponse } from "@/helpers/ApiResponse";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../../../constants";

const verifySchema = z.object({
  code: z.string().min(1, "Verification code is required").max(6, "Code cannot exceed 6 characters"),
});

type VerifyFormData = z.infer<typeof verifySchema>;

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: VerifyFormData) => {
    setIsSubmitting(true);
    try {
      // const response = await axios.post<ApiResponse>("/api/verify-code", {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/verify-code`, {
        userName: params?.username,
        code: data.code,
      });
      toast.success(response.data.message);
      router.replace("/signin");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Verification failed. Please try again.';
        toast.error(errorMessage);
    } else {
        toast.error('An unexpected error occurred.');
    }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper1">
      <div className="page-content">
        <section className="py-3 border-bottom d-none d-md-flex">
          <div className="container">
            <div className="page-breadcrumb d-flex align-items-center">
              <h3 className="breadcrumb-title pe-3">Verification</h3>
              <div className="ms-auto">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 p-0">
                    <li className="breadcrumb-item">
                      <a href=".">
                        <i className="bx bx-home-alt"></i> Home
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href=".">Authentication</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Verification
                    </li>
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
                  <div className="p-4 rounded border">
                    <div className="text-center">
                      <img src="/assets/images/icons/verify.png" width="120" alt="Verify Icon" />
                    </div>
                    <h4 className="mt-5 font-weight-bold">Verify Email</h4>
                    <p>Enter the verification code sent to your email</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="my-4">
                        <label htmlFor="code" className="form-label">
                          Verification Code
                        </label>
                        <input
                          type="text"
                          id="code"
                          className={`form-control form-control-lg ${
                            errors.code ? "is-invalid" : ""
                          }`}
                          placeholder="Enter code"
                          {...register("code")}
                        />
                        {errors.code && (
                          <div className="invalid-feedback">{errors.code.message}</div>
                        )}
                      </div>
                      <div className="d-grid gap-2">
                        <button
                          type="submit"
                          className="btn btn-light btn-lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Verifying..." : "Verify"}
                        </button>
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
