import { Router } from "express";
import {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "@src/controllers/movie-controller";

const MOVIES = "movies";
const MOVIES_ID = `${MOVIES}/:id`;

const movieRouter = Router();

movieRouter.get(`/${MOVIES}`, getMovies);
movieRouter.get(`/${MOVIES_ID}`, getMovie);
movieRouter.delete(`/${MOVIES_ID}`, deleteMovie);
movieRouter.post(`/${MOVIES}`, addMovie);
movieRouter.patch(`/${MOVIES_ID}`, updateMovie);

export { movieRouter };
