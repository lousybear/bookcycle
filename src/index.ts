import { config } from "dotenv";
config(); // Load environment variables

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import indexRouter from "./routes/index.router";
import { connectDB } from "./db/connect";

const startServer = async () => {
  

  const port = process.env.PORT || 8080;

  try {
    await connectDB();

    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json()); // Same as bodyParser.json()
    app.use(bodyParser.urlencoded({ extended: false }));

    // Routes
    app.get("/app/test", (_req, res) => res.json({ message: "It Works!" }));
    app.use("/app", indexRouter);

    // Start server
    app.listen(port, () => {
      console.log(`✅ App running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();