import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  fullName: string;
  email: string;
  mobileNumber: string;
  city: string;
  createdAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^\d{10}$/, 'Mobile number must be 10 digits'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      maxlength: [100, 'City name cannot exceed 100 characters'],
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>('Contact', contactSchema);
