import dbConnect from "@/dbconfig/dbConnect";
import { ApiResponse } from "@/helpers/ApiResponse";
import brandModel from "@/models/brands.models";
import { NextResponse } from "next/server";

// GET: Retrieve the banner data
export async function GET() {
    try {
      await dbConnect();
      const brands = await brandModel.find({}); // Get the most recent banner
      if (!brands) {
        return NextResponse.json({ error: "Brand not found" }, { status: 404 });
      }
      // return NextResponse.json(banner, { status: 200 });
      return Response.json(
        new ApiResponse(true, 200, brands, "Brand fetched "),
        { status: 200 }
    );
    } catch (error) {
      console.log(error)
      return Response.json(
        new ApiResponse(false, 500, {}, "Error while fetching"),
        { status: 500 }
    );
    }
  }