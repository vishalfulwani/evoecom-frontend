import dbConnect from "@/dbconfig/dbConnect";
import OrderModel from "@/models/order.models";
import { ApiResponse } from "@/helpers/ApiResponse";
// import OrderEmailToUser from "@/templates/order-email-to-user";
import { sendEmail } from "@/lib/emailService";
import UserModel from "@/models/user.models";
import FinalOrderConfirmationEmailToUser from "@/templates/final-order-confirmation-email-to-user";

const sendOrderEmailToUser = async (templateData: any) => {
  const emailResponse = await sendEmail({
    to: "john.doe@example.com",
    subject: "Your Verification Code",
    template: FinalOrderConfirmationEmailToUser as any,
    templateData: templateData,
  });
  return emailResponse;
};

export async function POST(req: Request) {
  await dbConnect(); // Ensure DB connection

  try {
    const { orderId, action } = await req.json();

    if (!orderId || !action) {
      throw new Error("Order ID or action is missing");
    }

    // Validate the action (either 'accept' or 'reject')
    if (!["accept", "reject"].includes(action)) {
      throw new Error("Invalid action");
    }

    // Find the order
    const order = await OrderModel.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    // Handle the acceptance/rejection
    if (action === "accept") {
      order.orderStatus = "accepted";
      order.trackingInfo.push({
        status: "Order Accepted",
        date: new Date(),
        note: "Admin accepted the order.",
      });
    } else {
      order.orderStatus = "rejected";
      order.trackingInfo.push({
        status: "Order Rejected",
        date: new Date(),
        note: "Admin rejected the order.",
      });
    }

    // Save the order
    await order.save();

    const user = await UserModel.findOne({ id: order.userId });
    const templateData = {
      orderId,
      customerName: user.email,
      customerEmail: user.userName,
      totalAmount: order.totalAmount,
      orderDate: new Date(),
      status: order.orderStatus
    };
    const emailResponse = await sendOrderEmailToUser(templateData);

    return new Response(
      JSON.stringify(new ApiResponse(true, 200, order, "Order status updated")),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error while processing admin action: ", error.message);

    return new Response(
      JSON.stringify(
        new ApiResponse(false, 500, {}, "Error while processing admin action")
      ),
      { status: 500 }
    );
  }
}
