import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: [100, 'Project name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      type: String,
      required: [true, 'Project image is required'],
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>('Project', projectSchema);
