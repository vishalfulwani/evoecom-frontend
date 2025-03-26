

import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
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
