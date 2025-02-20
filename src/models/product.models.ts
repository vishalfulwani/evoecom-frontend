// // import mongoose , {Document,Schema} from 'mongoose'


// // export interface IProduct extends Document{
// //     _id:mongoose.Types.ObjectId;
// //     productName:string;
// //     productDesc:string;
// //     price:string;
// //     images:string[];
// //     sellingPrice:string;
// //     category:string;
// //     subCategory:string;
// //     rating:string;
// // }



// // const productSchema:Schema<IProduct> = new Schema({
// //     productName:{
// //         type:String,
// //         required:true,
// //     },
// //     productDesc:{
// //         type:String,
// //         required:true,
// //     },
// //     price:{
// //         type:String,
// //         required:true,
// //     },
// //     images:{
// //         type:[String],
// //         required:true,
// //     },
// //     sellingPrice:{
// //         type:String,
// //         required:true,
// //     },
// //     category:{
// //         type:String,
// //         required:true,
// //     },
// //     subCategory:{
// //         type:String,
// //         required:true,
// //     },
// //     rating:{
// //         type:String,
// //         required:true
// //     }
// // },{timestamps:true})




// // const ProductModel = (mongoose.models.Product as mongoose.Model<IProduct>)   ||  mongoose.model<IProduct>("Product",productSchema)
// // export default ProductModel



// import mongoose, { Document, Schema } from 'mongoose';

// export interface IProduct extends Document {
//   _id: mongoose.Types.ObjectId;
//   productName: string;
//   productDesc: string;
//   price: string;
//   images: string[];
//   sellingPrice: string;
//   category: string;
//   subCategory: string;
//   rating: string;
//   returnRequested?: boolean; // Tracks if a return request was made
//   returnReason?: string; // Reason for return request
//   returnStatus?: 'pending' | 'approved' | 'rejected'; // Status of the return
// }

// const productSchema: Schema<IProduct> = new Schema(
//   {
//     productName: {
//       type: String,
//       required: true,
//     },
//     productDesc: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: String,
//       required: true,
//     },
//     images: {
//       type: [String],
//       required: true,
//     },
//     sellingPrice: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     subCategory: {
//       type: String,
//       required: true,
//     },
//     rating: {
//       type: String,
//       required: true,
//     },
//     returnRequested: {
//       type: Boolean,
//       default: false,
//     },
//     returnReason: {
//       type: String,
//       default: '',
//     },
//     returnStatus: {
//       type: String,
//       enum: ['pending', 'approved', 'rejected'],
//       default: 'pending',
//     },
//   },
//   { timestamps: true }
// );

// const ProductModel =
//   (mongoose.models.Product as mongoose.Model<IProduct>) ||
//   mongoose.model<IProduct>('Product', productSchema);

// export default ProductModel;





// import mongoose, { Document, Schema } from 'mongoose';

// export interface IReview {
//   userId: mongoose.Types.ObjectId; // User ID reference
//   customerName: string;
//   reviewText: string;
//   rating: number; // Rating out of 5
//   createdAt: Date;
// }

// export interface IProduct extends Document {
//   _id: mongoose.Types.ObjectId;
//   productName: string;
//   productDesc: string;
//   price: string;
//   images: string[];
//   sellingPrice: string;
//   category: string;
//   subCategory: string;
//   rating: string;
//   reviews: IReview[]; // Array of reviews
//   returnRequested?: boolean; // Tracks if a return request was made
//   returnReason?: string; // Reason for return request
//   returnStatus?: 'pending' | 'approved' | 'rejected'; // Status of the return
// }

// const reviewSchema: Schema<IReview> = new Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User', // Assuming you have a User model
//       required: true,
//     },
//     customerName: {
//       type: String,
//       required: true,
//     },
//     reviewText: {
//       type: String,
//       required: true,
//     },
//     rating: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 5,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { _id: false } // No separate _id for each review, as it's embedded
// );

// const productSchema: Schema<IProduct> = new Schema(
//   {
//     productName: {
//       type: String,
//       required: true,
//     },
//     productDesc: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: String,
//       required: true,
//     },
//     images: {
//       type: [String],
//       required: true,
//     },
//     sellingPrice: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     subCategory: {
//       type: String,
//       required: true,
//     },
//     rating: {
//       type: String,
//       required: true,
//     },
//     reviews: {
//       type: [reviewSchema], // Embedding the review schema
//       default: [],
//     },
//     returnRequested: {
//       type: Boolean,
//       default: false,
//     },
//     returnReason: {
//       type: String,
//       default: '',
//     },
//     returnStatus: {
//       type: String,
//       enum: ['pending', 'approved', 'rejected'],
//       default: 'pending',
//     },
//   },
//   { timestamps: true }
// );

// const ProductModel =
//   (mongoose.models.Product as mongoose.Model<IProduct>) ||
//   mongoose.model<IProduct>('Product', productSchema);

// export default ProductModel;







import mongoose, { Document, Schema } from 'mongoose';

export interface IReview  {
  userId: mongoose.Types.ObjectId; // User ID reference
  customerName: string;
  reviewText: string;
  rating: number; // Rating out of 5
  createdAt: Date;
}

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  productName: string;
  fullProductName: string;
  productDesc: string;
  price: string;
  images: string[];
  sellingPrice: string;
  category: string;
  subCategory: string;
  rating: string;
  reviews: IReview[]; // Array of reviews
  sizes: string; // Array of available sizes
  availableColors: string; // Array of available colors
  moreProductInfo: string; // Additional product information
  returnRequested?: boolean; // Tracks if a return request was made
  returnReason?: string; // Reason for return request
  returnStatus?: 'pending' | 'approved' | 'rejected'; // Status of the return
}

const reviewSchema: Schema<IReview> = new Schema(
  {
    userId: {
      // type: mongoose.Schema.Types.ObjectId,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // No separate _id for each review, as it's embedded
);

const productSchema: Schema<IProduct> = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    fullProductName: {
      type: String,
      required: true,
      default: function () {
        // Default value combining productName, available colors, and sizes
        return `${this.productName} -  ${this.availableColors}`;
      },
    },
    productDesc: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    sellingPrice: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
    },
    rating: {
      type: String,
      default: '5',
    },
    reviews: {
      type: [reviewSchema], // Embedding the review schema
      default: [],
    },
    sizes: {
      // type: [String],
      type:String,
      required: true,
    },
    availableColors: {
      // type: [String],
      type:String,
      required: true,
    },
    moreProductInfo: {
      type: String,
      default: '',
    },
    returnRequested: {
      type: Boolean,
      default: false,
    },
    returnReason: {
      type: String,
      default: '',
    },
    returnStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const ProductModel =
  (mongoose.models.Product as mongoose.Model<IProduct>) ||
  mongoose.model<IProduct>('Product', productSchema);

export default ProductModel;
