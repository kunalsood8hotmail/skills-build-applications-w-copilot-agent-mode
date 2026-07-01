import { Router } from 'express';
import { Model } from 'mongoose';
import User, { IUser } from '../models/userModel';
import Team, { ITeam } from '../models/teamModel';
import Activity, { IActivity } from '../models/activityModel';
import LeaderboardEntry, { ILeaderboardEntry } from '../models/leaderboardModel';
import Workout, { IWorkout } from '../models/workoutModel';

const router = Router();

type CollectionModel = Model<any>;

const registerCollectionRoutes = (
  path: string,
  model: CollectionModel,
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
