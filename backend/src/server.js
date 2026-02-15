import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import mainRoutes from "./routes/index.js";
import { PRODUCTION } from "./constants/common.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV == PRODUCTION
        ? `https://aggroso-meeting-action-tracker.vercel.app`
        : "*",
        allowedHeaders:['HEAD','GET', 'PUT', 'POST', 'DELETE', 'PATCH']
  }),
);

app.use(express.json());

app.use("/api/v1", mainRoutes);

app.get("/status", (_req, res) => {
  res.send("API is working");
});

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
