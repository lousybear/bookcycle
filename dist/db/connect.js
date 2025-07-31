"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');
    }
    catch (err) {
        console.error('❌ Failed to connect to MongoDB');
        process.exit(1);
    }
};
exports.connectDB = connectDB;
