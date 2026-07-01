import mongoose, { Schema, model, type Model } from 'mongoose';

export interface ITeam {
  name: string;
  description: string;
  members: string[];
  goal: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  members: [{ type: String }],
  goal: { type: String, required: true },
});

const Team: Model<ITeam> = mongoose.models.Team || model<ITeam>('Team', teamSchema);

export default Team;
