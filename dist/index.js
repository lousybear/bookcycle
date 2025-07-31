"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Load environment variables
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_router_1 = __importDefault(require("./routes/index.router"));
const connect_1 = require("./db/connect");
const startServer = async () => {
    const port = process.env.PORT || 8080;
    try {
        await (0, connect_1.connectDB)();
        const app = (0, express_1.default)();
        // Middleware
        app.use((0, cors_1.default)());
        app.use(express_1.default.json()); // Same as bodyParser.json()
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        // Routes
        app.get("/api/ping", (_req, res) => res.send('pong 🏓'));
        app.use("/api", index_router_1.default);
        // Start server
        app.listen(port, () => {
            console.log(`✅ App running at http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
