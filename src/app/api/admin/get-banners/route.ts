import dbConnect from "@/dbconfig/dbConnect";
import bannerModels from "@/models/banner.models";
import { NextResponse } from "next/server";

// GET: Retrieve the banner data
export async function GET() {
    try {
      await dbConnect();
      const banner = await bannerModels.findOne().sort({ createdAt: -1 }); // Get the most recent banner
      if (!banner) {
        return NextResponse.json({ error: "Banner not found" }, { status: 404 });
      }
      return NextResponse.json(banner, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }