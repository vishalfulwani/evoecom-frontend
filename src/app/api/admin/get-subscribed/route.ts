import dbConnect from "@/dbconfig/dbConnect";
import subscriptionModels from "@/models/subscription.models";
import { NextResponse } from "next/server";

// GET: Retrieve all subscribed emails
export async function GET() {
    try {
      await dbConnect();
      const subscribers = await subscriptionModels.find({});
      return NextResponse.json(subscribers, { status: 200 });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }