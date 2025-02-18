// import Razorpay from 'razorpay';
// import dbConnect from '@/dbconfig/dbConnect';
// import { ApiResponse } from '@/helpers/ApiResponse';
// import OrderModel from '@/models/order.models';
// import crypto from 'crypto';
// import OrderEmailToAdmin from '@/templates/order-email-to-admin';
// import { sendEmail } from '@/lib/emailService';
// import UserModel from '@/models/user.models';
// import OrderEmailToUser from '@/templates/order-email-to-user';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// const sendOrderEmailToAdmin = async (templateData : any) => {
//     const emailResponse = await sendEmail({
//         to: "john.doe@example.com",
//         subject: "Your Verification Code",
//         template: OrderEmailToAdmin as any,
//         templateData: templateData,
//       });
//       return emailResponse; 
// };
// const sendOrderEmailToUser = async (templateData: any) => {
//   const emailResponse = await sendEmail({
//     to: "john.doe@example.com",
//     subject: "Your Verification Code",
//     template: OrderEmailToUser as any,
//     templateData: templateData,
//   });
//   return emailResponse;
// };


// // Webhook endpoint for Razorpay payment success
// export async function POST(req: Request) {
//   await dbConnect(); // Ensure DB connection
  
//   try {
//     // Parse the raw body (this is necessary for signature verification)
//     const body = await req.text();
//     const signature = req.headers.get('x-razorpay-signature')!;

//     const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

//     // Generate the expected signature based on the request data
//     const generatedSignature = crypto
//       .createHmac('sha256', webhookSecret)
//       .update(body)
//       .digest('hex');

//     // Compare the signatures to verify the payment
//     if (generatedSignature !== signature) {
//       throw new Error('Signature verification failed');
//     }

//     const payload = JSON.parse(body);

//     // Check if the payment was successful
//     if (payload.event === 'payment.captured') {
//       const paymentDetails = payload.payload.payment.entity;
//       const orderId = paymentDetails.order_id;
//       const paymentId = paymentDetails.id;

//       // Retrieve the original order from the database using Razorpay's order ID
//       const order = await OrderModel.findOne({ razorpayOrderId: orderId });

//       if (!order) {
//         throw new Error('Order not found');
//       }

//       // Update the order status to 'paid' and save the payment ID
//       order.status = 'paid';
//       order.paymentId = paymentId;

//       // Save the updated order details
//       await order.save();

//       // Log the successful payment
//       console.log('Payment successful for order ID:', orderId);

//       const user = await UserModel.findOne({ id:order.userId  });
//       const templateData = {
//         orderId,
//         customerName : user.email,
//         customerEmail : user.userName,
//         totalAmount : order.totalAmount,
//         orderDate : new Date(),
//       };
//       await sendOrderEmailToAdmin(templateData);
//       await sendOrderEmailToUser(templateData);

//       return new Response(
//         JSON.stringify(new ApiResponse(true, 200, {}, 'Payment successful and order updated')),
//         { status: 200 }
//       );
//     } else {
//       throw new Error('Payment was not successful');
//     }
//   } catch (error: any) {
//     console.error('Error while processing payment webhook:', error.message);
//     console.error(error.stack);

//     return new Response(
//       JSON.stringify(new ApiResponse(false, 500, {}, 'Error while processing payment')),
//       { status: 500 }
//     );
//   }
// }




import Razorpay from 'razorpay';
import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import OrderModel from '@/models/order.models';
import UserModel from '@/models/user.models';
import CouponModel from '@/models/coupon.models';
import crypto from 'crypto';
import OrderEmailToAdmin from '@/templates/order-email-to-admin';
import OrderEmailToUser from '@/templates/order-email-to-user';
import { sendEmail } from '@/lib/emailService';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const sendOrderEmailToAdmin = async (templateData: any) => {
  return await sendEmail({
    to: 'admin@example.com',
    subject: 'New Order Received',
    template: OrderEmailToAdmin as any,
    templateData: templateData,
  });
};

const sendOrderEmailToUser = async (templateData: any) => {
  return await sendEmail({
    to: templateData.customerEmail,
    subject: 'Order Confirmation',
    template: OrderEmailToUser as any,
    templateData: templateData,
  });
};

// Webhook endpoint for Razorpay payment success
export async function POST(req: Request) {
  await dbConnect(); // Ensure DB connection

  try {
    // Parse the raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    if (!signature || !webhookSecret) {
      throw new Error('Missing Razorpay signature or webhook secret');
    }

    // Generate the expected signature
    const generatedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    // Verify the signature
    if (generatedSignature !== signature) {
      throw new Error('Signature verification failed');
    }

    const payload = JSON.parse(body);

    // Process the payment success event
    if (payload.event === 'payment.captured') {
      const paymentDetails = payload.payload.payment.entity;
      const orderId = paymentDetails.order_id;
      const paymentId = paymentDetails.id;

      // Find the associated order
      const order = await OrderModel.findOne({ razorpayOrderId: orderId });

      if (!order) {
        throw new Error('Order not found');
      }

      // Update order status and payment details
      order.status = 'paid';
      order.paymentId = paymentId;
      await order.save();

      console.log(`Payment successful for order ID: ${orderId}`);

      // Fetch the user associated with the order
      const user = await UserModel.findById(order.userId);

      if (!user) {
        throw new Error('User not found for the order');
      }

      // Update the coupon (if used) to mark the user as "appliedBy"
      if (order.couponId) {
        const coupon = await CouponModel.findById(order.couponId);

        if (coupon) {
          if (!coupon.appliedBy.includes(order.userId)) {
            coupon.appliedBy.push(order.userId);
            await coupon.save();
            console.log(`User ID ${order.userId} added to appliedBy array of coupon ID ${order.couponId}`);
          }
        } else {
          console.warn(`Coupon ID ${order.couponId} not found`);
        }
      }

      // Prepare email data
      const templateData = {
        orderId,
        customerName: user.userName,
        customerEmail: user.email,
        totalAmount: order.totalAmount,
        orderDate: new Date(),
      };

      // Send order confirmation emails
      await sendOrderEmailToAdmin(templateData);
      await sendOrderEmailToUser(templateData);

      return new Response(
        JSON.stringify(new ApiResponse(true, 200, {}, 'Payment successful and order updated')),
        { status: 200 }
      );
    } else {
      console.warn('Unhandled Razorpay event:', payload.event);
      return new Response(
        JSON.stringify(new ApiResponse(false, 400, {}, 'Unhandled Razorpay event')),
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error processing Razorpay webhook:', error.message, error.stack);

    return new Response(
      JSON.stringify(new ApiResponse(false, 500, {}, 'Error while processing payment')),
      { status: 500 }
    );
  }
}
