import mongoose from "mongoose";
import ProductModel, { IReview } from "@/models/product.models";
import { ApiResponse } from "@/helpers/ApiResponse";
import dbConnect from "@/dbconfig/dbConnect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  dbConnect();

  // const { productId, review } = req.body;
  const { productId, review } = await req.json();

  console.log("oooooooooo", productId, review);

  if (!productId || !review) {
    return Response.json(
      new ApiResponse(false, 400, {}, "Product ID and review are required"),
      { status: 400 }
    );
  }

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return Response.json(
        new ApiResponse(false, 404, {}, "Product not found"),
        { status: 200 }
      );
    }

    const newReview: IReview = {
      userId: new mongoose.Types.ObjectId(review.userId),
      customerName: review.customerName,
      reviewText: review.reviewText,
      rating: review.rating,
      createdAt: new Date(),
    };

    product.reviews.push(newReview);
    await product.save();

    const totalReviews = product.reviews.length;
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    // Save the calculated rating in the product
    product.rating = averageRating.toFixed(1).toString(); // Convert to string
    await product.save();
    

    return Response.json(
      new ApiResponse(true, 200, {}, "Review added successfully!"),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding review:", error);
    return Response.json(
      new ApiResponse(
        false,
        500,
        {},
        "An error occurred while adding the review"
      ),
      { status: 500 }
    );
  }
}
