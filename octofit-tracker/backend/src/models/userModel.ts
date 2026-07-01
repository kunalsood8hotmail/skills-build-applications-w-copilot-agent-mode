import mongoose, { Schema, model, type Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  username: string;
  fitnessGoal: string;
  experienceLevel: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  fitnessGoal: { type: String, required: true },
  experienceLevel: { type: String, required: true },
});

const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);

export default User;
