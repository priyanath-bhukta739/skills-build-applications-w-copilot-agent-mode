import mongoose from 'mongoose';

export interface ITeam {
  name: string;
  members: string[];
  createdAt: Date;
}

const TeamSchema = new mongoose.Schema<ITeam>({
  name: { type: String, required: true },
  members: { type: [String], default: [] },
  createdAt: { type: Date, default: () => new Date() }
});

export const Team = mongoose.model<ITeam>('Team', TeamSchema);
