
import Razorpay from 'razorpay';
import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import OrderModel from '@/models/order.models';
import { sendEmail } from '@/lib/emailService';
import { ADMIN_EMAIL } from '../../../../constants';
// import RegistrationEmailToAdmin from '@/templates/registration-email-to-admin';
import OrderEmailToAdmin from '@/templates/order-email-to-admin';
import OrderEmailToUser from '@/templates/order-email-to-user';
import UserModel from '@/models/user.models';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});


const sendOrderEmailToAdmin = async (templateData: any) => {
    const emailResponse = await sendEmail({
      to: ADMIN_EMAIL,
      subject: "New Order",
      template: OrderEmailToAdmin as any,
      templateData: templateData,
    });
    return emailResponse;
  };
  const sendOrderEmailToUser = async (templateData: any,to:string) => {
    const emailResponse = await sendEmail({
      to: to,
      subject: "Order Created",
      template: OrderEmailToUser as any,
      templateData: templateData,
    });
    return emailResponse;
  };


export async function POST(req: Request) {
    await dbConnect(); // Ensure the DB connection

    console.log(process.env.RAZORPAY_KEY_ID,"IDDD")
    console.log(process.env.RAZORPAY_KEY_SECRET,"IDDD22")


    try {
        const { userId, cartItems, address, totalAmount, phone, couponCode } = await req.json();
         
        // Log received data
        console.log("Received Request Data: ", { userId, cartItems, address, totalAmount, phone, couponCode });

        if (!userId) {
            return new Response(
                JSON.stringify(new ApiResponse(false, 400, {}, "User ID is required")),
                { status: 400 }
            );
        }
        const user = await UserModel.findOne({ _id : userId });


        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return new Response(
                JSON.stringify(new ApiResponse(false, 400, {}, "Cart cannot be empty")),
                { status: 400 }
            );
        }

        const options = {
            amount: totalAmount * 100, // Convert to cents
            currency: 'USD',
            receipt: `receipt_order_${new Date().getTime()}`,
        };

        console.log("Razorpay Order Options: ", options);



           // Convert cart items to match the expected format
           const formattedCartItems = cartItems.map((item: any) => ({
            productId: item.product._id, // Extract the ObjectId
            productName: item.product.productName, // Extract the ObjectId
            quantity: item.quantity,
            image: item.product.images[0],
            selectedSize: item.selectedSize || null,  // Ensure size is stored correctly
            selectedColor: item.selectedColor || null, // Ensure color is stored correctly
            price:item.product.sellingPrice,
            category:item.product.category,
        }));

         
        const templateData = {
            orderId: "id1234556",
            customerName: user.userName,
            customerEmail:user.email,
            totalAmount:totalAmount || 900,
            orderDate: new Date().toISOString(),
            products:formattedCartItems,
          };
          await sendOrderEmailToAdmin(templateData);
          await sendOrderEmailToUser(templateData,user.email);
  



        // Create Razorpay Order
        console.log("razorrr",razorpay)
        const order = await razorpay.orders.create(options);
        console.log("orderrr",order)

        if (!order || !order.id) {
            throw new Error("Razorpay order creation failed");
        }

        console.log("Razorpay Order Created: ", order);

        // Create and Save Order in Database
        const purchaseOrder = new OrderModel({
            userId,
            currency: options.currency,
            totalAmount,
            razorpayOrderId: order.id,
            items: formattedCartItems, // Now includes selected color and size
            address,
            phone,
            couponCode,
            paymentStatus: 'pending',
            orderStatus: 'pending',
        });

        console.log("Saving Order to Database: ", purchaseOrder);

        await purchaseOrder.save();

        
        // const templateData = {
        //   orderId: order.id || "id1234556",
        //   customerName: user.userName,
        //   customerEmail:user.email,
        //   totalAmount:totalAmount || 900,
        //   orderDate: new Date().toISOString(),
        //   products:formattedCartItems,
        // };
        // await sendOrderEmailToAdmin(templateData);
        // await sendOrderEmailToUser(templateData,user.email);

        return new Response(
            JSON.stringify(new ApiResponse(true, 200, order, "Purchase order created")),
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error while creating purchase order: ", error);

        return new Response(
            JSON.stringify(new ApiResponse(false, 500, {}, error.message || "Error while creating purchase order")),
            { status: 500 }
        );
    }
}
