import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import CouponModel from '@/models/coupon.models';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { code, userId } = await request.json();

    // Validate input
    if (!code) {
      return NextResponse.json(
        new ApiResponse(false, 400, {}, "Coupon Code is Required"),
        { status: 400 }
      );
    }

    // Find the coupon
    const coupon = await CouponModel.findOne({ code });
    if (!coupon || !coupon.isActive || coupon.expirationDate < new Date()) {
      return NextResponse.json(
        new ApiResponse(false, 400, {}, `${code} is invalid or expired`),
        { status: 400 }
      );
    }

    // Check coupon limit
    const appliedCount = coupon.appliedBy?.length || 0;
    const limit = Number(coupon.limit);

    if (limit > 0 && appliedCount >= limit) {
      return NextResponse.json(
        new ApiResponse(false, 400, {}, `${code} limit reached`),
        { status: 400 }
      );
    }

    // Ensure the user hasn't already applied the coupon
    if (!coupon.appliedBy) {
      coupon.appliedBy = [];
    }
    if (coupon.appliedBy.includes(userId)) {
      return NextResponse.json(
        new ApiResponse(false, 400, {}, `${code} is already applied by this user`),
        { status: 400 }
      );
    }

    return NextResponse.json(
      new ApiResponse(true, 200, { discount: coupon.discountPercentage }, "Coupon is ready to apply and updated successfully"),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing coupon:', error);
    return NextResponse.json(
      new ApiResponse(false, 500, {}, "Failed to process coupon"),
      { status: 500 }
    );
  }
}
