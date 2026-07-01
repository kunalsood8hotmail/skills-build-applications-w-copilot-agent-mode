import { Router } from 'express';
import User from '../models/userModel';
import Team from '../models/teamModel';
import Activity from '../models/activityModel';
import LeaderboardEntry from '../models/leaderboardModel';
import Workout from '../models/workoutModel';

const router = Router();

const registerCollectionRoutes = <T extends Record<string, unknown>>(
  path: string,
  model: { find: () => Promise<T[]>; create: (doc: Partial<T>) => Promise<T> },
) => {
  router.get(path, async (_req, res) => {
    try {
      const items = await model.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  });

  router.post(path, async (req, res) => {
    try {
      const item = await model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create item' });
    }
  });
};

registerCollectionRoutes('/api/users/', User);
registerCollectionRoutes('/api/teams/', Team);
registerCollectionRoutes('/api/activities/', Activity);
registerCollectionRoutes('/api/leaderboard/', LeaderboardEntry);
registerCollectionRoutes('/api/workouts/', Workout);

export default router;
