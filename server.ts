import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { Movie } from "./src/models/movie";
import { handleError } from "./src/utils";

const PORT = process.env.PORT || "3000";
const DB_URL = process.env.DB_URL || "";
const MOVIES = "movies";
const MOVIES_ID = `${MOVIES}/:id`;

const app = express();

app.use(express.json());

mongoose
  .connect(DB_URL)
  .then(() => console.log(`Connected to ${DB_URL}`))
  .catch((error) => console.log(`DB connection error: ${error}`));

app.listen(PORT, () => console.log(`Listen port ${PORT}`));

app.get(`/${MOVIES}`, async (req, res) => {
  try {
    res.status(200).json(await Movie.find());
  } catch (error) {
    handleError(res, error);
  }
});

app.get(`/${MOVIES_ID}`, async (req, res) => {
  try {
    res.status(200).json(await Movie.findById(req.params.id));
  } catch (error) {
    handleError(res, error);
  }
});

app.delete(`/${MOVIES_ID}`, async (req, res) => {
  try {
    res.status(200).json(await Movie.findByIdAndDelete(req.params.id));
  } catch (error) {
    handleError(res, error);
  }
});

app.post(`/${MOVIES}`, async (req, res) => {
  try {
    res.status(201).json(await new Movie(req.body).save());
  } catch (error) {
    handleError(res, error);
  }
});

app.patch(`/${MOVIES_ID}`, async (req, res) => {
  try {
    res
      .status(201)
      .json(await Movie.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    handleError(res, error);
  }
});
