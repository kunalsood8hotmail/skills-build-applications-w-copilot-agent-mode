"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = __importDefault(require("../models/userModel"));
const teamModel_1 = __importDefault(require("../models/teamModel"));
const activityModel_1 = __importDefault(require("../models/activityModel"));
const leaderboardModel_1 = __importDefault(require("../models/leaderboardModel"));
const workoutModel_1 = __importDefault(require("../models/workoutModel"));
const router = (0, express_1.Router)();
const registerCollectionRoutes = (path, model) => {
    router.get(path, async (_req, res) => {
        try {
            const items = await model.find();
            res.json(items);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch items' });
        }
    });
    router.post(path, async (req, res) => {
        try {
            const item = await model.create(req.body);
            res.status(201).json(item);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create item' });
        }
    });
};
registerCollectionRoutes('/api/users/', userModel_1.default);
registerCollectionRoutes('/api/teams/', teamModel_1.default);
registerCollectionRoutes('/api/activities/', activityModel_1.default);
registerCollectionRoutes('/api/leaderboard/', leaderboardModel_1.default);
registerCollectionRoutes('/api/workouts/', workoutModel_1.default);
exports.default = router;
