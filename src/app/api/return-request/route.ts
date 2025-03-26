import { NextApiRequest } from 'next';
import mongoose from 'mongoose';
import OrderModel from '@/models/order.models';
import { ApiResponse } from '@/helpers/ApiResponse';
import { NextResponse } from 'next/server';
import ReturnRequestToAdmin from '@/templates/return-request-email-to-admin';
import { sendEmail } from '@/lib/emailService';
import ReturnRequestToUser from '@/templates/return-request-email-to-user';
import UserModel from '@/models/user.models';
import { ADMIN_EMAIL } from '../../../../constants';



const sendReturnRequestEmailToAdmin = async (templateData : any) => {
    const emailResponse = await sendEmail({
        to: ADMIN_EMAIL,
        subject: "Return Request from user",
        template: ReturnRequestToAdmin as any,
        templateData: templateData,
      });
      return emailResponse; 
};
const sendReturnRequestEmailToUser = async (templateData : any,to:string) => {
    const emailResponse = await sendEmail({
        to: to,
        subject: "Return Request",
        template: ReturnRequestToUser as any,
        templateData: templateData,
      });
      return emailResponse; 
};



export default async function POST(req: NextApiRequest) {

  const { orderId, productId, reason } = req.body;

  if (!mongoose.isValidObjectId(orderId) || !mongoose.isValidObjectId(productId)) {
    // return res.status(400).json({ error: 'Invalid order ID or product ID' });
    return NextResponse.json(
        new ApiResponse(false, 400, {}, 'Invalid order ID or product ID'),
        { status: 400 }
      );
  }

  try {
    const order = await OrderModel.findById(orderId);

    if (!order) {
    //   return res.status(404).json({ error: 'Order not found' });
    return NextResponse.json(
        new ApiResponse(false, 400, {}, 'Order not found'),
        { status: 400 }
      );
    }

    if (order.orderStatus !== 'delivered') {
    //   return res.status(400).json({ error: 'Order is not delivered yet' });
    return NextResponse.json(
        new ApiResponse(false, 400, {}, 'Order is not delivered yet'),
        { status: 400 }
      );
    }

    if (!order.returnEligible) {
    //   return res.status(400).json({ error: 'Return not allowed for this order' });
    return NextResponse.json(
        new ApiResponse(false, 400, {}, 'Return not allowed for this order'),
        { status: 400 }
      );
    }

    const returnDeadline = new Date(order.createdAt);
    returnDeadline.setDate(returnDeadline.getDate() + order.returnWindow);

    if (new Date() > returnDeadline) {
    //   return res.status(400).json({ error: 'Return window has expired' });
    return NextResponse.json(
        new ApiResponse(false, 400, {}, 'Return window has expired'),
        { status: 400 }
      );
    }

    // Check if the product exists in the order
    const product = order.items.find((item:any) => item.product.toString() === productId);

    if (!product) {
    //   return res.status(404).json({ error: 'Product not found in the order' });
    return NextResponse.json(
        new ApiResponse(false, 404, {}, 'Product not found in the order'),
        { status: 404 }
      );
    }

    if (product.returnRequested) {
    return NextResponse.json(
        new ApiResponse(false, 400, {}, 'Return already requested for this product'),
        { status: 400 }
      );
      
    }

    // Mark the product as requested for return
    product.returnRequested = true;
    product.returnReason = reason;
    product.returnStatus = 'pending';

    await order.save();

    const user = await UserModel.findOne({ id:order.userId  });
    const templateData = {
         orderId,
         productId,
         customerName: user.userName,
         returnReason: reason,
         returnRequestedDate: new Date(),
    }

    await sendReturnRequestEmailToAdmin(templateData);
    await sendReturnRequestEmailToUser(templateData,user.email);

    return NextResponse.json(
        new ApiResponse(true, 200, {order}, 'Return request submitted successfully for the product'),
        { status: 200 }
      );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
        new ApiResponse(false, 500, {}, 'Request return fail error'),
        { status: 500 }
      );
  }
}
