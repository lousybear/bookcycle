"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
router.post('/signUp', auth_controller_1.signUp);
router.post('/signIn', auth_controller_1.signIn);
router.get('/me', auth_middleware_1.requireAuth, auth_controller_1.me);
app.use('/', router);
exports.default = router;
