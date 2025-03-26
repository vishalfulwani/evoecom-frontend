import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import OrderModel from '@/models/order.models';

export async function GET() {

  await dbConnect();

    try {
      const orders = await OrderModel.find({});
      return Response.json(
        new ApiResponse(true,200,orders,"Orders  data fetched"),
        {status:200}
      )

      }
     catch (error) {
      console.log(error)
      Response.json(
        new ApiResponse(false,500,{},"error while fetching orders  data"),
        {status:500}
      )
    }

}
