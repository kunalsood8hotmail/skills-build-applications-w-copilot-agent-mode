"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const resources = {
    users: [
        { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin' },
        { id: 2, name: 'Grace Hopper', email: 'grace@example.com', role: 'member' },
    ],
    teams: [
        { id: 1, name: 'Alpha Squad', members: 2, goal: 'Build endurance' },
    ],
    activities: [
        { id: 1, type: 'run', duration: 30, calories: 250 },
    ],
    leaderboard: [
        { id: 1, name: 'Ada Lovelace', score: 1200 },
        { id: 2, name: 'Grace Hopper', score: 1100 },
    ],
    workouts: [
        { id: 1, name: 'HIIT Circuit', duration: 20, focus: 'cardio' },
    ],
};
const registerCollectionRoutes = (path, collection) => {
    router.get(path, (_req, res) => {
        res.json(collection);
    });
    router.post(path, (req, res) => {
        const item = { id: collection.length + 1, ...req.body };
        collection.push(item);
        res.status(201).json(item);
    });
};
registerCollectionRoutes('/api/users/', resources.users);
registerCollectionRoutes('/api/teams/', resources.teams);
registerCollectionRoutes('/api/activities/', resources.activities);
registerCollectionRoutes('/api/leaderboard/', resources.leaderboard);
registerCollectionRoutes('/api/workouts/', resources.workouts);
exports.default = router;
