import { Schema, model } from "mongoose";

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
  reviews?: Review[];
}

const movieShema = new Schema<Movie>({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  duration: {
    type: {
      hours: Number,
      minutes: Number,
    },
    required: true,
  },
  reviews: [
    {
      name: String,
      text: String,
    },
  ],
});

export const Movie = model<Movie>("Movie", movieShema);
