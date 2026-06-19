import mongoose from 'mongoose';

export interface IActivity {
  userId: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  timestamp: Date;
}

const ActivitySchema = new mongoose.Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  timestamp: { type: Date, required: true }
});

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
