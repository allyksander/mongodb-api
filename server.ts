import "dotenv/config";
import express, { Response } from "express";
import { Db, ObjectId } from "mongodb";
import { connetToDb, getDb } from "./src/db";
import { error } from "console";

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
const MOVIES_ID = `${MOVIES}/:id`;
const app = express();
let db: Db;

const getMoviesCollection = async () => db.collection<Movie>(MOVIES);

const handleError = (res: Response, error: Error | string) => {
  res.status(500).json(error);
};

const isValidId = (id: string) => ObjectId.isValid(id);

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

app.use(express.json());

app.get(`/${MOVIES}`, (req, res) => {
  getMoviesCollection()
    .then((collection) => collection.find().toArray())
    .then((movies) => res.status(200).json(movies))
    .catch((error) => handleError(res, error));
});

app.get(`/${MOVIES_ID}`, async (req, res) => {
  const id = req.params.id;

  if (isValidId(id)) {
    getMoviesCollection()
      .then((collection) =>
        collection.findOne({
          _id: new ObjectId(id),
        })
      )
      .then((movie) => res.status(200).json(movie))
      .catch((error) => handleError(res, error));
  } else {
    handleError(res, "Incorrect movie's ID...");
  }
});

app.delete(`/${MOVIES_ID}`, async (req, res) => {
  const id = req.params.id;

  if (isValidId(id)) {
    getMoviesCollection()
      .then((collection) =>
        collection.deleteOne({
          _id: new ObjectId(id),
        })
      )
      .then((deleteResult) => res.status(200).json(deleteResult))
      .catch((error) => handleError(res, error));
  } else {
    handleError(res, "Incorrect movie's ID...");
  }
});

app.post(`/${MOVIES}`, (req, res) => {
  getMoviesCollection()
    .then((collection) => collection.insertOne(req.body as Movie))
    .then((inserResult) => res.status(200).json(inserResult))
    .catch((error) => handleError(res, error));
});

app.patch(`/${MOVIES_ID}`, (req, res) => {
  const id = req.params.id;

  if (isValidId(id)) {
    getMoviesCollection()
      .then((collection) =>
        collection.updateOne(
          {
            _id: new ObjectId(id),
          },
          {
            $set: req.body as Partial<Movie>,
          }
        )
      )
      .then((updateResult) => res.status(200).json(updateResult))
      .catch((error) => handleError(res, error));
  } else {
    handleError(res, "Incorrect movie's ID...");
  }
});
