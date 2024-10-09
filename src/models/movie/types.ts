export type IDuration = {
  hours: number;
  minutes: number;
};

export type IReview = {
  name: string;
  text: string;
};

export type IMovie = {
  title: string;
  director: string;
  year: number;
  genres: string[];
  rating: number;
  duration: IDuration;
  reviews?: IReview[];
};
