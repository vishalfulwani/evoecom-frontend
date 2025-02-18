import dbConnect from '@/dbconfig/dbConnect';
import OrderModel from '@/models/order.models';
import { ApiResponse } from '@/helpers/ApiResponse';

export async function GET(req: Request) {
  await dbConnect(); // Ensure DB connection

  try {
    const { orderId } = await req.json();

    if (!orderId) {
      throw new Error('Order ID is missing');
    }

    // Find the order
    const order = await OrderModel.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    // Return the order tracking information
    
      return Response.json(
            new ApiResponse(true, 200, order.trackingInfo, 'Order tracking information fetched'),
            { status: 200 }
          );
  } catch (error: any) {
    console.error('Error while fetching order tracking: ', error.message);
      return Response.json(
            new ApiResponse(false, 500, {}, 'Error while fetching order tracking'),
            { status: 500 }
          );
    
  }
}
