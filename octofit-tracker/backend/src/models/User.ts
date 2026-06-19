import mongoose from 'mongoose';

export interface IUser {
  email: string;
  passwordHash: string;
  displayName: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() }
});

export const User = mongoose.model<IUser>('User', UserSchema);
