import { Movie } from "@src/models/movie/movie";
import { handleError } from "@src/utils";
import { Request, Response } from "express";

export const getMovies = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await Movie.find().sort({ _id: -1 }));
  } catch (error) {
    handleError(res, error);
  }
};

export const getMovie = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await Movie.findById(req.params.id));
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await Movie.findByIdAndDelete(req.params.id));
  } catch (error) {
    handleError(res, error);
  }
};

export const addMovie = async (req: Request, res: Response) => {
  try {
    res.status(201).json(await new Movie(req.body).save());
  } catch (error) {
    handleError(res, error);
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    res
      .status(201)
      .json(await Movie.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    handleError(res, error);
  }
};
