import { Router } from 'express';

const router = Router();

const users = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', username: 'ada' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com', username: 'grace' },
];

const teams = [
  { id: 1, name: 'Velocity Squad', description: 'Fitness-focused team', members: ['ada', 'grace'] },
];

const activities = [
  { id: 1, userId: 1, type: 'run', durationMinutes: 30, caloriesBurned: 260 },
];

const leaderboard = [
  { id: 1, userId: 1, displayName: 'Ada Lovelace', score: 1200, rank: 1 },
];

const workouts = [
  { id: 1, name: 'HIIT Circuit', focus: 'cardio', durationMinutes: 20, difficulty: 'intermediate' },
];

const registerRoutes = (path: string, collection: any[]) => {
  router.get(path, (_req, res) => {
    res.json(collection);
  });

  router.post(path, (req, res) => {
    const item = { id: collection.length + 1, ...req.body };
    collection.push(item);
    res.status(201).json(item);
  });
};

registerRoutes('/api/users/', users);
registerRoutes('/api/teams/', teams);
registerRoutes('/api/activities/', activities);
registerRoutes('/api/leaderboard/', leaderboard);
registerRoutes('/api/workouts/', workouts);

export default router;
