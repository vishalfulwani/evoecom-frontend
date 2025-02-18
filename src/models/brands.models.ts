import mongoose, { Schema, Document } from "mongoose";

export interface IBrand extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  logo: string;  // URL or path to the logo image
  description: string;
  website: string;  // Website URL
  createdAt: Date;
}

const BrandSchema = new Schema<IBrand>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const brandModel = mongoose.models.Brand || mongoose.model<IBrand>("Brand", BrandSchema);

export default brandModel;
