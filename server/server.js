import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/test", (req, res) => {
  res.send("Backend Working");
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on 5000");
});