import dbConnect from "@/dbconfig/dbConnect";
import { ApiResponse } from "@/helpers/ApiResponse";
import bannerModels from "@/models/banner.models";
import { NextResponse } from "next/server";

// GET: Retrieve the banner data
export async function GET() {
    try {
      await dbConnect();
      const banner = await bannerModels.find({}); // Get the most recent banner
      if (!banner) {
        return NextResponse.json({ error: "Banner not found" }, { status: 404 });
      }
      // return NextResponse.json(banner, { status: 200 });
      return Response.json(
        new ApiResponse(true, 200, banner, "Banner fetched "),
        { status: 200 }
    );
    } catch (error) {
      return Response.json(
        new ApiResponse(false, 500, {}, "Error while fetching"),
        { status: 500 }
    );
    }
  }