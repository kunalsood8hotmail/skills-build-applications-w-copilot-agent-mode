import mongoose from 'mongoose';
import { connectDatabase } from '../database';
import User from '../models/userModel';
import Team from '../models/teamModel';
import Activity from '../models/activityModel';
import LeaderboardEntry from '../models/leaderboardModel';
import Workout from '../models/workoutModel';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Ada Lovelace',
      email: 'ada.lovelace@example.com',
      username: 'ada',
      fitnessGoal: 'Improve endurance',
      experienceLevel: 'intermediate',
    },
    {
      name: 'Grace Hopper',
      email: 'grace.hopper@example.com',
      username: 'grace',
      fitnessGoal: 'Build strength',
      experienceLevel: 'advanced',
    },
    {
      name: 'Katherine Johnson',
      email: 'katherine.johnson@example.com',
      username: 'katherine',
      fitnessGoal: 'Lose weight',
      experienceLevel: 'beginner',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Velocity Squad',
      description: 'A high-energy team focused on cardio and consistency.',
      members: users.slice(0, 2).map((user) => user.username),
      goal: 'Complete 10 weekly workouts',
    },
    {
      name: 'Strength Collective',
      description: 'A team building power and mobility together.',
      members: [users[2].username],
      goal: 'Increase bench press strength',
    },
  ]);

  const activities = await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      durationMinutes: 35,
      caloriesBurned: 320,
      date: new Date('2026-07-01T07:00:00.000Z'),
    },
    {
      userId: users[1]._id.toString(),
      type: 'strength',
      durationMinutes: 50,
      caloriesBurned: 410,
      date: new Date('2026-07-01T18:30:00.000Z'),
    },
  ]);

  const leaderboardEntries = await LeaderboardEntry.insertMany([
    {
      userId: users[0]._id.toString(),
      displayName: users[0].name,
      score: 1420,
      rank: 1,
    },
    {
      userId: users[1]._id.toString(),
      displayName: users[1].name,
      score: 1385,
      rank: 2,
    },
    {
      userId: users[2]._id.toString(),
      displayName: users[2].name,
      score: 1210,
      rank: 3,
    },
  ]);

  const workouts = await Workout.insertMany([
    {
      name: 'Tempo Run',
      focus: 'endurance',
      durationMinutes: 30,
      difficulty: 'intermediate',
      equipment: ['running shoes'],
    },
    {
      name: 'Full Body Strength',
      focus: 'strength',
      durationMinutes: 45,
      difficulty: 'advanced',
      equipment: ['dumbbells', 'bench'],
    },
  ]);

  console.log('Seeded users:', users.length);
  console.log('Seeded teams:', teams.length);
  console.log('Seeded activities:', activities.length);
  console.log('Seeded leaderboard entries:', leaderboardEntries.length);
  console.log('Seeded workouts:', workouts.length);

  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
