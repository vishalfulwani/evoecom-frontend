import dbConnect from "@/dbconfig/dbConnect";
import subscriptionModels from "@/models/subscription.models";
import { NextResponse } from "next/server";

// POST: Add an email to subscriptions
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    console.log(email,"eeeee")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();
    const existingSubscription = await subscriptionModels.findOne({ email });

    if (existingSubscription) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 400 });
    }

    const newSubscription = new subscriptionModels({ email });
    await newSubscription.save();

    return NextResponse.json({ message: "Subscribed successfully!" }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
