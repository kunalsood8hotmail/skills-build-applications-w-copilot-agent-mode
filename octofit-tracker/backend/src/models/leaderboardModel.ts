import mongoose, { Schema, model, type Model } from 'mongoose';

export interface ILeaderboardEntry {
  userId: string;
  displayName: string;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.models.LeaderboardEntry || model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);

export default LeaderboardEntry;
