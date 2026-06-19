import mongoose from 'mongoose';

export interface ILeaderboardEntry {
  userId: string;
  score: number;
  rank: number;
  updatedAt: Date;
}

const LeaderboardEntrySchema = new mongoose.Schema<ILeaderboardEntry>({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() }
});

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema);
