'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { API_BASE_URL } from '../../../constants';


// Define schema using Zod
const reviewSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  rating: z
    .number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5'),
  reviewText: z.string().min(1, 'Review text is required'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const AddReview = ({ productId }: { productId: string }) => {

  const { data: session, status } = useSession();

      const { control, handleSubmit, formState: { errors } } = useForm<ReviewFormData>({
            resolver: zodResolver(reviewSchema),
        });
        
            const [isSubmitting, setIsSubmitting] = useState(false);
        
            const onSubmit = async (data: ReviewFormData) => {
              try {
                if (!status || !session?.user?._id) {
                  alert("Please login first to give a review.");
                  return; // Stop the execution if the user is not logged in
                }
            
                console.log("datttttttttta", data);
            
                const response = await axios.post(`${API_BASE_URL}/review`, {
                  productId,
                  review: {
                    userId: session.user._id, // Use the actual user ID
                    customerName: data.customerName,
                    reviewText: data.reviewText,
                    rating: data.rating,
                    createdAt: new Date(),
                  },
                });
            
                console.log(response.data.message || 'Review added successfully!');
                toast.success('Review added successfully!');
                setIsSubmitting(false);
              } catch (error) {
                console.error('Error adding review:', error);
                toast.error('Review Add Error');
              }
            };
            

  return (
    <div className="add-review bg-dark-1">
      <div className="form-body p-3">
        <h4 className="mb-4">Write a Review</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className={`form-control rounded-0 ${errors.customerName ? 'is-invalid' : ''}`}
              {...control.register('customerName')}
            />
            {errors.customerName && (
              <div className="invalid-feedback">{errors.customerName.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Your Email</label>
            <input
              type="email"
              className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`}
              {...control.register('email')}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Rating</label>
            <select
              className={`form-select rounded-0 ${errors.rating ? 'is-invalid' : ''}`}
              {...control.register('rating', { valueAsNumber: true })}
            >
              <option value="">Choose Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors.rating && <div className="invalid-feedback">{errors.rating.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Your Review</label>
            <textarea
              className={`form-control rounded-0 ${errors.reviewText ? 'is-invalid' : ''}`}
              rows={3}
              {...control.register('reviewText')}
            ></textarea>
            {errors.reviewText && (
              <div className="invalid-feedback">{errors.reviewText.message}</div>
            )}
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-light btn-ecomm"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit a Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
