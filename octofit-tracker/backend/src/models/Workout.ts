import mongoose from 'mongoose';

export interface IWorkout {
  name: string;
  difficulty: string;
  durationMinutes: number;
  tags: string[];
  createdAt: Date;
}

const WorkoutSchema = new mongoose.Schema<IWorkout>({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: () => new Date() }
});

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
