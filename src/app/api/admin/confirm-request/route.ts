import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import OrderModel from '@/models/order.models';
import { ApiResponse } from '@/helpers/ApiResponse';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/emailService';
import ReturnRequestToUser from '@/templates/return-request-email-to-user';
import UserModel from '@/models/user.models';
import ProductModel from '@/models/product.models';


const sendReturnRequestConfirmationEmailToUser = async (templateData : any) => {
    const emailResponse = await sendEmail({
        to: "john.doe@example.com",
        subject: "Return Request Confirmation",
        template: ReturnRequestToUser as any,
        templateData: templateData,
      });
      return emailResponse; 
};

export default async function PUT(req: NextApiRequest) {
  const { orderId, productId, returnStatus } = req.body;

  // Validate the returnStatus (either 'approved' or 'rejected')
  if (!['approved', 'rejected'].includes(returnStatus)) {
    return NextResponse.json(
      new ApiResponse(false, 400, {}, 'Invalid return status. Must be "approved" or "rejected"'),
      { status: 400 }
    );
  }

  if (!mongoose.isValidObjectId(orderId) || !mongoose.isValidObjectId(productId)) {
    return NextResponse.json(
      new ApiResponse(false, 400, {}, 'Invalid order ID or product ID'),
      { status: 400 }
    );
  }

  try {
    // Find the order by ID
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return NextResponse.json(
        new ApiResponse(false, 404, {}, 'Order not found'),
        { status: 404 }
      );
    }

    // Find the product in the order
    const product = order.items.find((item: any) => item.product.toString() === productId);

    if (!product) {
      return NextResponse.json(
        new ApiResponse(false, 404, {}, 'Product not found in the order'),
        { status: 404 }
      );
    }

    if (!product.returnRequested) {
      return NextResponse.json(
        new ApiResponse(false, 400, {}, 'No return request has been made for this product'),
        { status: 400 }
      );
    }

    // Update the return status of the product
    product.returnStatus = returnStatus;

    // Save the updated order
    await order.save();

    const templateData = {
         orderId,
         productName: product.productName,
         returnStatus,
         returnConfirmedDate: new Date(),
    }
    await sendReturnRequestConfirmationEmailToUser(templateData);

    return NextResponse.json(
      new ApiResponse(true, 200, { order }, `Return request ${returnStatus} successfully for the product`),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      new ApiResponse(false, 500, {}, 'Failed to update return status'),
      { status: 500 }
    );
  }
}
