import { Schema, model } from "mongoose";
import { IDuration, IMovie, IReview } from "./types";

const DurationShema = new Schema<IDuration>(
  {
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const ReviewsShema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const MovieShema = new Schema<IMovie>({
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
    type: DurationShema,
    required: true,
  },
  reviews: {
    type: [ReviewsShema],
  },
});

export const Movie = model<IMovie>("Movie", MovieShema);
