import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  createdAt: Date;
}

const newsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
  },
  { timestamps: true }
);

export const Newsletter = mongoose.model<INewsletter>(
  'Newsletter',
  newsletterSchema
);
