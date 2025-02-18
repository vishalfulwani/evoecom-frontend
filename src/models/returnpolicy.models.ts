import mongoose, { Schema, Document } from 'mongoose';

export interface IGlobalReturnPolicy extends Document {
  returnEligible: boolean;
  returnWindow: number; // Number of days
  createdAt: Date;
  updatedAt: Date;
}

const GlobalReturnPolicySchema = new Schema<IGlobalReturnPolicy>({
  returnEligible: {
    type: Boolean,
    default: true,
  },
  returnWindow: {
    type: Number,
    required: true,
    default: 30, // Default return window is 30 days
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const GlobalReturnPolicyModel =
  mongoose.models.GlobalReturnPolicy ||
  mongoose.model<IGlobalReturnPolicy>('GlobalReturnPolicy', GlobalReturnPolicySchema);

export default GlobalReturnPolicyModel;
