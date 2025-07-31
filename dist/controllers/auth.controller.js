"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../utils/jwt");
const signUp = async (req, res) => {
    const { name, username, email, phone, password } = req.body;
    if (!username || !password || !(email || phone)) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const existing = await user_model_1.User.findOne({
        $or: [{ username }, { email }, { phone }],
    });
    if (existing)
        return res.status(409).json({ error: "User already exists" });
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const user = await user_model_1.User.create({
        name,
        username,
        email,
        phone,
        passwordHash,
    });
    const token = (0, jwt_1.generateToken)(user._id.toString());
    res.json({ user: { name: user.name, username: user.username }, token });
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    const { identifier, password } = req.body;
    const user = await user_model_1.User.findOne({
        $or: [
            { username: identifier },
            { email: identifier },
            { phone: identifier },
        ],
    });
    if (!user)
        return res.status(404).json({ error: "User not found" });
    const valid = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!valid)
        return res.status(401).json({ error: "Invalid credentials" });
    const token = (0, jwt_1.generateToken)(user._id.toString());
    res.json({ user: { name: user.name, username: user.username }, token });
};
exports.signIn = signIn;
const me = async (req, res) => {
    res.json({ user: req.user });
};
exports.me = me;
