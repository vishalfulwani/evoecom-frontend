// // // models/Banner.model.ts
// // import mongoose, { Schema, Document } from 'mongoose';

// // interface IBanner extends Document {
// //   heading: string;
// //   subheading: string;
// //   promotion: string;
// //   imageUrl: string; // Optional field for a banner image
// //   isActive: boolean;
// // }

// // const bannerSchema = new Schema<IBanner>({
// //   heading: { type: String, required: true },
// //   subheading: { type: String, required: true },
// //   promotion: { type: String, required: true },
// //   imageUrl: { type: String, default: '' }, // Optional banner image URL
// //   isActive: { type: Boolean, default: true },
// // });

// // const BannerModel = (mongoose.models.Banner as mongoose.Model<IBanner>)   ||  mongoose.model<IBanner>("Banner",bannerSchema)
// // export default BannerModel



// import mongoose, { Schema, Document } from "mongoose";

// export interface IBanner extends Document {
//   heading: string;
//   subheading: string;
//   subtext: string;
//   btnText: string;
//   btnLink: string;
//   bgImg: string;
//   createdAt: Date;
// }

// const BannerSchema = new Schema<IBanner>({
//   heading: { type: String, required: true },
//   subheading: { type: String, required: true },
//   subtext: { type: String, required: true },
//   btnText: { type: String, required: true },
//   btnLink: { type: String, required: true },
//   bgImg: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const bannerModels = mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);

// export default bannerModels;






import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  _id: mongoose.Types.ObjectId;
  heading: string;
  subheading: string;
  subtext: string;
  btnText: string;
  btnLink: string;
  bgImg: string;
  createdAt: Date;
}

const BannerSchema = new Schema<IBanner>({
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  subtext: { type: String, required: true },
  btnText: { type: String, required: true },
  btnLink: { type: String, required: true },
  bgImg: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const bannerModels = mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);

export default bannerModels;
