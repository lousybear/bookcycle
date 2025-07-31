"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../utils/jwt");
const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer "))
        return res.sendStatus(401);
    try {
        const token = authHeader.split(" ")[1];
        const payload = (0, jwt_1.verifyToken)(token);
        const user = await user_model_1.User.findById(payload.id).select("-passwordHash");
        if (!user)
            return res.sendStatus(404);
        req.user = user;
        next();
    }
    catch {
        res.sendStatus(403);
    }
};
exports.requireAuth = requireAuth;
