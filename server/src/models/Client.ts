import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  designation: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const clientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      maxlength: [100, 'Client name cannot exceed 100 characters'],
    },
    designation: {
      type: String,
      required: [true, 'Client designation is required'],
      trim: true,
      maxlength: [100, 'Designation cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Client description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      type: String,
      required: [true, 'Client image is required'],
    },
  },
  { timestamps: true }
);

export const Client = mongoose.model<IClient>('Client', clientSchema);
