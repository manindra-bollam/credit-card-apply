import mongoose, { Document, Schema, Types } from 'mongoose';

export type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'cancelled' | 'dispatched' | 'delivered';

export interface IApplicationEntry {
  applicationId: Types.ObjectId;
  status: ApplicationStatus;
  timestamp: Date;
}

export interface IApplication extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  history: IApplicationEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const applicationEntrySchema = new Schema<IApplicationEntry>(
  {
    applicationId: { type: Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'approved', 'rejected', 'cancelled', 'dispatched', 'delivered'],
      default: 'pending',
      required: true,
    },
    timestamp: { type: Date, required: true, default: Date.now },
  },
  { _id: false }
);

const applicationSchema = new Schema<IApplication>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    history: { type: [applicationEntrySchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export const Application = mongoose.model<IApplication>('Application', applicationSchema);
