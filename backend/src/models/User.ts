import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  ssn: string; // Stored hashed
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true, default: 'USA' },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    ssn: { type: String, required: true }, // Store hashed only
    address: { type: addressSchema, required: true },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
userSchema.index({ email: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
