import "dotenv/config";
import express from "express";
import { Db } from "mongodb";
import { connetToDb, getDb } from "./src/db";

export interface Duration {
  hours: number;
  minutes: number;
}

export interface Review {
  name: string;
  text: string;
}

export interface Movie {
  title: string;
  director: string;
  year: number;
  genres: string[];
  rating: number;
  duration: Duration;
  reviews: Review[];
}

const PORT = process.env.PORT || "3000";
const MOVIES = "movies";
const app = express();
let db: Db;

connetToDb((error: Error) => {
  if (!error) {
    app.listen(PORT, () =>
      error ? console.log(error) : console.log(`Listen port ${PORT}`)
    );
    db = getDb();
  } else {
    console.log(`DB connection error: ${error}`);
  }
});

app.get(`/${MOVIES}`, async (req, res) => {
  try {
    const movies = await db.collection<Movie>(MOVIES).find().toArray();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error });
  }
});
