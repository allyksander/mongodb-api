import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { movieRouter } from "./src/routes/movie-routes";

const PORT = process.env.PORT || "3000";
const DB_URL = process.env.DB_URL || "";

const app = express();

app.use(express.json());
app.use(movieRouter);

mongoose
  .connect(DB_URL)
  .then(() => console.log(`Connected to ${DB_URL}`))
  .catch((error) => console.log(`DB connection error: ${error}`));

app.listen(PORT, () => console.log(`Listen port ${PORT}`));
