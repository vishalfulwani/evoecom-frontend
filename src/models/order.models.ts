// // import mongoose, { Document, Schema } from 'mongoose';
// // import { string } from 'zod';

// // export interface IOrderItem {
// //   product: mongoose.Schema.Types.ObjectId;
// //   quantity: number;
// //   // price: number;
// // }

// // export interface IOrder extends Document {
// //   userId: mongoose.Schema.Types.ObjectId;
// //   currency: string;
// //   totalAmount: number;
// //   razorpayOrderId: string;
// //   razorpayPaymentId?: string;
// //   razorpaySignature?: string;
// //   items: IOrderItem[];
// //   address: {
// //     street: string;
// //     city: string;
// //     state: string;
// //     postalCode: string;
// //   };
// //   phone:string;
// //   couponCode: string;
// //   paymentStatus: 'pending' | 'completed' | 'failed';
// //   createdAt: Date;
// // }

// // const OrderItemSchema: Schema = new Schema({
// //   product: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Product',
// //     required: true
// //   },
// //   quantity: {
// //     type: Number,
// //     required: true
// //   },
// //   // price: { 
// //   //   type: Number, 
// //   //   required: true 
// //   // },
// // }, { id: false });

// // const OrderSchema: Schema = new Schema({
// //   userId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true
// //   },
// //   currency: {
// //     type: String,
// //     required: true
// //   },
// //   totalAmount: {
// //     type: Number,
// //     required: true
// //   },
// //   razorpayOrderId: {
// //     type: String,
// //     required: true
// //   },
// //   razorpayPaymentId: {
// //     type: String
// //   },
// //   razorpaySignature: {
// //     type: String
// //   },
// //   items: [OrderItemSchema],
// //   address: {
// //     street: { type: String, required: true },
// //     city: { type: String, required: true },
// //     state: { type: String, required: true },
// //     postalCode: { type: String, required: true },
// //   },
// //   phone:{type:String,required:true},
// //   couponCode: { type: String, default: "" },
// //   paymentStatus: {
// //     type: String,
// //     enum: ['pending', 'completed', 'failed'],
// //     default: 'pending',
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now,
// //   },
// // });

// // const OrderModel = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

// // export default OrderModel;




// import mongoose, { Document, Schema } from 'mongoose';

// export interface IOrderItem {
//   product: mongoose.Schema.Types.ObjectId;
//   quantity: number;
// }

// export interface IOrder extends Document {
//   userId: mongoose.Schema.Types.ObjectId;
//   currency: string;
//   totalAmount: number;
//   razorpayOrderId: string;
//   razorpayPaymentId?: string;
//   razorpaySignature?: string;
//   items: IOrderItem[];
//   address: {
//     street: string;
//     city: string;
//     state: string;
//     postalCode: string;
//   };
//   phone: string;
//   couponCode: string;
//   paymentStatus: 'pending' | 'completed' | 'failed';
//   orderStatus: 'pending' | 'accepted' | 'rejected' | 'shipped' | 'delivered';
//   trackingInfo: {
//     status: string;
//     date: Date;
//     note?: string;
//   }[];
//   createdAt: Date;
// }

// const OrderItemSchema: Schema = new Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   }
// }, { id: false });

// const OrderSchema: Schema = new Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   currency: {
//     type: String,
//     required: true
//   },
//   totalAmount: {
//     type: Number,
//     required: true
//   },
//   razorpayOrderId: {
//     type: String,
//     required: true
//   },
//   razorpayPaymentId: {
//     type: String
//   },
//   razorpaySignature: {
//     type: String
//   },
//   items: [OrderItemSchema],
//   address: {
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     postalCode: { type: String, required: true },
//   },
//   phone: { type: String, required: true },
//   couponCode: { type: String, default: "" },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'completed', 'failed'],
//     default: 'pending',
//   },
//   orderStatus: {
//     type: String,
//     enum: ['pending', 'accepted', 'rejected', 'shipped', 'delivered'],
//     default: 'pending',
//   },
//   trackingInfo: [{
//     status: { type: String, required: true },
//     date: { type: Date, default: Date.now },
//     note: { type: String },
//   }],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const OrderModel = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

// export default OrderModel;











import mongoose, { Schema, Document } from 'mongoose';

interface ICartItem {
    product: mongoose.Schema.Types.ObjectId; // Reference to the Product model
    quantity: number;
    selectedSize?: string;  // Optional field
    selectedColor?: string; // Optional field
}

export interface IOrder extends Document {
    userId: mongoose.Schema.Types.ObjectId; // Reference to User model
    currency: string;
    totalAmount: number;
    razorpayOrderId: string;
    items: ICartItem[];
    address: string;
    phone: string;
    couponCode?: string;
    paymentStatus: 'pending' | 'paid' | 'failed';
    orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const OrderSchema = new Schema<IOrder>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        currency: {
            type: String,
            required: true,
            default: 'USD',
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        razorpayOrderId: {
            type: String,
            required: true,
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                selectedSize: {
                    type: String,
                    default: null, // Optional
                },
                selectedColor: {
                    type: String,
                    default: null, // Optional
                },
            },
        ],
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        couponCode: {
            type: String,
            default: null,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending',
        },
        orderStatus: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

const OrderModel = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;
