import mongoose, { Schema, model, type Model } from 'mongoose';

export interface IWorkout {
  name: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
  equipment: string[];
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true, unique: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  equipment: [{ type: String }],
});

const Workout: Model<IWorkout> = mongoose.models.Workout || model<IWorkout>('Workout', workoutSchema);

export default Workout;
