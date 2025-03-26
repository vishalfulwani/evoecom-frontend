import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import ProductModel from '@/models/product.models';

export async function GET() {

  await dbConnect();

    try {
      const products = await ProductModel.find({});
      return Response.json(
        new ApiResponse(true,200,products,"Products  data fetched"),
        {status:200}
      )

      }
     catch (error) {
      console.log(error)
      Response.json(
        new ApiResponse(false,500,{},"error while fetching products  data"),
        {status:500}
      )
    }
}
