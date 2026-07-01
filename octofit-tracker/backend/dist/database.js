"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUri = void 0;
exports.connectDatabase = connectDatabase;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
exports.mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function connectDatabase() {
    await mongoose_1.default.connect(exports.mongoUri);
    console.log(`Connected to MongoDB at ${exports.mongoUri}`);
}
exports.default = mongoose_1.default;
